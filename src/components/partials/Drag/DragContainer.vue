<template>
  <div
    :id="containerId"
    ref="container"
    class="draggable"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`,
      maxHeight: `${maxHeight}`,
      maxWidth: `${maxWidth}`
    }"
    @mousedown="startDrag"
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

const props = defineProps({
  id: {
    type: String,
    required: true
  },
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

const containerId = ref<string>(props.id);
const container = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const dragStartPos = ref<Position>({ x: 0, y: 0 });
const position = reactive<Position>({
  x: props.initialX,
  y: props.initialY
});

const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  dragStartPos.value = {
    x: event.clientX - (container.value?.offsetLeft || 0),
    y: event.clientY - (container.value?.offsetTop || 0)
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', endDrag);
};

const onMouseMove = (event: MouseEvent) => {
  if (isDragging.value && container.value) {
    position.x = event.clientX - dragStartPos.value.x;
    position.y = event.clientY - dragStartPos.value.y;
  }
};

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', endDrag);
};
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
