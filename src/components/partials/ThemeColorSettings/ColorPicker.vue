<template>
  <div class="color-settings-menu">
    <h3>Настройки цветовой схемы</h3>
    <div class="color-picker">
      <label for="nav-menu-color">Цвет меню:</label>
      <input id="nav-menu-color" v-model="navMenuColor" type="color" @input="updateNavMenuColor" />
      <input v-model="navMenuAlpha" type="range" min="0" max="1" step="0.01" @input="updateNavMenuColor" />
    </div>
    <div class="color-picker">
      <label for="section-bg-color">Цвет фона секций:</label>
      <input id="section-bg-color" v-model="sectionBgColor" type="color" @input="updateSectionBgColor" />
      <input v-model="sectionBgAlpha" type="range" min="0" max="1" step="0.01" @input="updateSectionBgColor" />
    </div>
    <div class="color-picker">
      <label for="font-color">Цвет шрифта:</label>
      <input id="font-color" v-model="fontColor" type="color" @input="updateFontColor" />
      <input v-model="fontAlpha" type="range" min="0" max="1" step="0.01" @input="updateFontColor" />
    </div>
    <button @click="applyColors">Применить</button>
  </div>
  <RangeInput />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RangeInput from '@/components/UI/RangeInput/RangeInput.vue';

const navMenuColor = ref('#ffffff');
const navMenuAlpha = ref(1);
const sectionBgColor = ref('#ffffff');
const sectionBgAlpha = ref(1);
const fontColor = ref('#000000');
const fontAlpha = ref(1);

const rgbaValue = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const updateNavMenuColor = () => {
  document.documentElement.style.setProperty('--nav-menu-color', rgbaValue(navMenuColor.value, navMenuAlpha.value));
};

const updateSectionBgColor = () => {
  document.documentElement.style.setProperty('--section-bg-color', rgbaValue(sectionBgColor.value, sectionBgAlpha.value));
};

const updateFontColor = () => {
  document.documentElement.style.setProperty('--font-color', rgbaValue(fontColor.value, fontAlpha.value));
};

const applyColors = () => {
  updateNavMenuColor();
  updateSectionBgColor();
  updateFontColor();
};
</script>

<style scoped>
.color-settings-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
}

.color-picker {
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }

  input[type="color"] {
    border: none;
    background: transparent;
    cursor: pointer;
  }
}

button {
  padding: 8px 16px;
  border: none;
  background-color: #5c6bc0;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3f51b5;
  }
}
</style>
