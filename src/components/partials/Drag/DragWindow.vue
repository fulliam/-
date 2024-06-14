<template>
  <div
    ref="draggable"
    class="drag-window untouch"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mousemove="dragging"
    @mouseleave="stopDrag"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const position = reactive({ x: 300, y: 300 });
const isDragging = ref(false);
let initialPosition = { x: 0, y: 0 };

const startDrag = (event: MouseEvent) => {
  event.preventDefault();
  isDragging.value = true;
  initialPosition.x = event.clientX - position.x;
  initialPosition.y = event.clientY - position.y;
};

const stopDrag = () => {
  if (isDragging.value) {
    isDragging.value = false;
  }
};

const dragging = (event: MouseEvent) => {
  if (isDragging.value) {
    position.x = event.clientX - initialPosition.x;
    position.y = event.clientY - initialPosition.y;
  }
};
</script>

<style scoped lang="scss">
.drag-window {
  position: absolute;
  z-index: 9999;
}
</style>