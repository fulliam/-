<template>
  <div
    ref="container"
    class="draggable"
    :style="{
      top: `${initialY}px`,
      left: `${initialX}px`,
      maxHeight: `${maxHeight}`,
      maxWidth: `${maxWidth}`
    }"
    @mousedown="startDrag"
    @mousemove="onMouseMove"
    @mouseup="endDrag"
  >
    <div class="content untouch focus">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Position {
  x: number;
  y: number;
}

defineProps({
  initialX: {
    type: Number,
    default: 0
  },
  initialY: {
    type: Number,
    default: 0
  },
  maxHeight: {
    type: String,
    default: 'auto'
  },
  maxWidth: {
    type: String,
    default: 'auto'
  }
});

const container = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const dragStartPos = ref<Position>({ x: 0, y: 0 });

const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  dragStartPos.value = {
    x: event.clientX - (container.value?.offsetLeft || 0),
    y: event.clientY - (container.value?.offsetTop || 0)
  };
};

const onMouseMove = (event: MouseEvent) => {
  if (isDragging.value && container.value) {
    container.value.style.left = `${event.clientX - dragStartPos.value.x}px`;
    container.value.style.top = `${event.clientY - dragStartPos.value.y}px`;
  }
};

const endDrag = () => {
  isDragging.value = false;
};

onMounted(() => {
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('mousemove', onMouseMove);
});
</script>

<style lang="scss">
.draggable {
  position: absolute;
  z-index: 120;
  // border-radius: 16px;

  // .content {
  //   padding: 10px;
  //   margin: 10px;
  // }
}
</style>
