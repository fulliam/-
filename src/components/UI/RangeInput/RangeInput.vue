<template>
  <div class="round-slider">
    <div class="selection" :style="{ clipPath: clipPathStyle }">
      <div class="holder" @mousedown="startDrag" @touchstart="startDrag">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
// const radius = 70; // radius of the circle
let dragging = false;

const startDrag = (event: MouseEvent | TouchEvent) => {
  dragging = true;
  event.preventDefault();
  window.addEventListener('mousemove', moveHandler);
  window.addEventListener('touchmove', moveHandler);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);
};

const moveHandler = (event: MouseEvent | TouchEvent) => {
  if (dragging) {
    const { offsetX, offsetY } = getOffset(event);
    const angle = Math.atan2(offsetY, offsetX) * (180 / Math.PI);
    const newValue = Math.round((angle + 180) / 360 * 100);
    value.value = newValue;
  }
};

const stopDrag = () => {
  dragging = false;
  window.removeEventListener('mousemove', moveHandler);
  window.removeEventListener('touchmove', moveHandler);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchend', stopDrag);
};

const getOffset = (event: MouseEvent | TouchEvent) => {
  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();
  let offsetX = 0;
  let offsetY = 0;

  if (event instanceof MouseEvent) {
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
  } else if (event instanceof TouchEvent) {
    offsetX = event.touches[0].clientX - rect.left;
    offsetY = event.touches[0].clientY - rect.top;
  }

  return { offsetX, offsetY };
};

// Dynamic clip-path based on the value
const clipPathStyle = ref('');

// Watch value changes to update clip-path
watchEffect(() => {
  const angle = (value.value / 100) * 360;
  //   const clipPath = `polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)`;
  clipPathStyle.value = `polygon(${angle}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)`;
});
</script>

<style scoped lang="scss">
.round-slider {
  display: grid;
  position: relative;
  width: 150px;
  height: 150px;
  justify-self: center;
  align-self: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;

  .selection {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: #00ccf8;
    box-shadow: 0px 0px 3px 0px #00ccf8;
    grid-row: 1;
    grid-column: 1;
    justify-self: center;
    align-self: center;
    pointer-events: none;
    clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);
  }

  .selection::after {
    content: "";
    display: block;
    width: 3px;
    height: calc(50% - 5px);
    background-color: red;
    position: absolute;
    left: calc(50% - 1px);
    transform-origin: 1px 100%;
    transform: rotate(0deg);
  }

  .holder {
    width: 110px;
    height: 110px;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    grid-row: 1;
    grid-column: 1;
    justify-self: center;
    align-self: center;
    pointer-events: none;
    z-index: 2;
    text-align: center;
    line-height: 110px;
    font-size: 2em;
    box-shadow: 0px 0px 4px 2px #00ccf8;
  }
}
</style>