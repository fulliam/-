<template>
  <div class="color-picker-card">
    <div class="picker-container">
      <!-- Переключатель режимов -->
      <div class="modes-toggle">
        <button
          v-for="item in modes"
          :key="item.value"
          :class="['mode-btn', { active: mode === item.value }]"
          @click="setMode(item.value)"
        >
          <span :class="item.iconClass">·</span>
        </button>
      </div>

      <!-- Область выбора цвета и яркости -->
      <div class="color-brightness-picker">
        <div
          class="color-dot"
          :style="{ backgroundColor: selectedColor, left: `${colorPosition.x}%`, top: `${colorPosition.y}%` }"
        ></div>
      </div>

      <!-- Ползунок яркости -->
      <input v-model="brightness" type="range" min="0" max="100" @input="updateColor" />

      <!-- Ползунок прозрачности -->
      <input v-model="alpha" type="range" min="0" max="1" step="0.01" @input="updateColor" />

      <!-- Цветовая палитра -->
      <div class="color-palette">
        <button
          v-for="(color, index) in palette"
          :key="index"
          :style="{ backgroundColor: color }"
          class="color-button"
          @click="setColor(color)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mode = ref('effect');
const selectedColor = ref('#ff0000');
const brightness = ref(50);
const alpha = ref(1); // Добавляем переменную для прозрачности
const colorPosition = ref({ x: 50, y: 50 });

const palette = [
  '#ffffff', '#ffcccc', '#cc99ff', '#ff6666',
  '#ffcc66', '#ffff66', '#99ff99', '#6699ff', '#6666cc'
];

const modes = [
  { value: 'effect', iconClass: 'mdi mdi-stars' },
  { value: 'day', iconClass: 'mdi mdi-weather-sunny' },
  { value: 'night', iconClass: 'mdi mdi-weather-night' }
];

const setColor = (color: string) => {
  selectedColor.value = color;
  updateColor();
};

const setMode = (selectedMode: string) => {
  mode.value = selectedMode;
};

const updateColor = () => {
  const color = selectedColor.value;
  const brightnessFactor = brightness.value / 100;
  const rgbaColor = `rgba(${parseInt(color.slice(1, 3), 16) * brightnessFactor}, 
                          ${parseInt(color.slice(3, 5), 16) * brightnessFactor}, 
                          ${parseInt(color.slice(5, 7), 16) * brightnessFactor}, 
                          ${alpha.value})`; // Используем значение альфа для прозрачности
  document.documentElement.style.setProperty('--section-bg-color', rgbaColor);
};
</script>

<style scoped>
.color-picker-card {
  max-width: 300px;
  padding: 16px;
  background-color: #2e2e2e;
  border-radius: 16px;
  color: white;
}

.picker-container {
  position: relative;
}

.modes-toggle {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
}

.mode-btn {
  background: white;
  border: none;
  color: #f39c12;
  cursor: pointer;
  font-size: 24px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.mode-btn.active {
  color: white;
  background: #f39c12;
}

.color-brightness-picker {
  position: relative;
  height: 200px;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  margin-bottom: 16px;
}

.color-dot {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

input[type="range"] {
  width: 100%;
  margin-bottom: 16px;
}

.color-palette {
  display: flex;
  justify-content: space-around;
}

.color-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #333;
  cursor: pointer;
}
</style>
