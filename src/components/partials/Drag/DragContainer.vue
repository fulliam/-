<template>
  <div
    class="drag-container"
    :class="{ move: isDragging, resizing: isResizing }"
    :style="{
      top: dragY + 'px',
      left: dragX + 'px',
      zIndex: zIndex,
      width: containerWidth + 'px',
      height: containerHeight + 'px'
    }"
    @mousedown="startDrag"
    @mouseup="stopDrag"
  >
    <div class="inner-container">
      <slot></slot>
      <div class="resize-handle bottom" @mousedown="startResize('bottom', $event)"></div>
      <div class="resize-handle right" @mousedown="startResize('right', $event)"></div>
      <div class="resize-handle bottom-right" @mousedown="startResize('bottom-right', $event)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps } from 'vue';

const props = defineProps({
  initialX: Number,
  initialY: Number,
  zIndex: Number,
  width: Number,
  height: Number
});

const state = reactive({
  dragX: props.initialX || 0,
  dragY: props.initialY || 0,
  isDragging: false,
  isResizing: false,
  containerWidth: props.width || 100,
  containerHeight: props.height || 100,
  initialDragX: 0,
  initialDragY: 0,
  initialMouseX: 0,
  initialMouseY: 0,
  resizeDirection: ''
});

const maxDragX = ref(state.containerWidth - 50);
const maxDragY = ref(state.containerHeight - 50);

function startDrag(event: MouseEvent) {
  state.isDragging = true;
  state.initialDragX = state.dragX;
  state.initialDragY = state.dragY;
  state.initialMouseX = event.pageX;
  state.initialMouseY = event.pageY;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(event: MouseEvent) {
  if (state.isDragging) {
    const offsetX = event.pageX - state.initialMouseX;
    const offsetY = event.pageY - state.initialMouseY;
    state.dragX = Math.max(Math.min(state.initialDragX + offsetX, maxDragX.value), 0);
    state.dragY = Math.max(Math.min(state.initialDragY + offsetY, maxDragY.value), 0);
  }
}

function stopDrag() {
  state.isDragging = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
}

function startResize(direction: string, event: MouseEvent) {
  event.stopPropagation();
  state.isResizing = true;
  state.resizeDirection = direction;
  state.initialMouseX = event.pageX;
  state.initialMouseY = event.pageY;
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
}

function resize(event: MouseEvent) {
  if (state.isResizing) {
    const offsetX = event.pageX - state.initialMouseX;
    const offsetY = event.pageY - state.initialMouseY;
    let newWidth = Math.max(state.containerWidth + offsetX, 50);
    let newHeight = Math.max(state.containerHeight + offsetY, 50);
    state.containerWidth = Math.min(newWidth, maxDragX.value);
    state.containerHeight = Math.min(newHeight, maxDragY.value);
  }
}

function stopResize() {
  state.isResizing = false;
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
}

const { dragX, dragY, isDragging, isResizing, containerWidth, containerHeight } = toRefs(state);
</script>

<style lang="scss" scoped>
.drag-container {
  opacity: 0.7;
  resize: both;
  position: absolute;
  // background-color: var(--bg);
  background-image: url('../../../assets/map.png');
  background-size: cover;
  border: 2px solid var(--color-text);
  cursor: grab;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
}

.drag-container.move {
  cursor: move;
}

.inner-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.resize-handle {
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: rgba(0,0,0,0);

  &.top {
    cursor: n-resize;
    top: -5px;
    left: calc(50% - 9px);
  }

  &.right {
    cursor: e-resize;
    right: -5px;
    height: 100%;
  }

  &.bottom {
    cursor: s-resize;
    bottom: -5px;
    width: 100%;
  }

  &.left {
    cursor: w-resize;
    left: -5px;
    top: calc(50% - 9px);
  }

  &.top-right {
    cursor: ne-resize;
    top: -5px;
    right: -5px;
  }

  &.top-left {
    cursor: nw-resize;
    top: -5px;
    left: -5px;
  }

  &.bottom-right {
    cursor: se-resize;
    bottom: -5px;
    right: -5px;
  }

  &.bottom-left {
    cursor: sw-resize;
    bottom: -5px;
    left: -5px;
  }
}
</style>
