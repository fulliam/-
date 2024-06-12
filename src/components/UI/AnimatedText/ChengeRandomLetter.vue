<template>
  <div class="content">
    <div class="random">
      <span
        v-for="(char, index) in characters"
        :key="index"
        :class="[char.isNbr ? 'nbr' : '']"
        :style="{ background: char.backgroundColor }"
      >
        {{ char.value }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

interface Char {
  value: string;
  isNbr: boolean;
  dataNumber: number;
  dataChange: number;
  backgroundColor: string;
}

const props = defineProps<{
  text: string;
}>();

const characters = ref<Char[]>([]);

// Создаем объект цветов для элементов таблицы Менделеева
const elementColors: Record<string, string> = {
  'H': 'rgba(255, 102, 99, 0.4)',
  'He': 'rgba(255, 222, 0, 0.3)',
  'Li': 'rgba(204, 121, 167, 0.4)',
  'Be': 'rgba(183, 159, 0, 0.3)',
  'B': 'rgba(51, 204, 204, 0.4)',
  'C': 'rgba(128, 128, 128, 0.3)',
  'N': 'rgba(75, 0, 130, 0.4)',
  'O': 'rgba(255, 165, 0, 0.3)'
};

const getRandomElementColor = () => {
  const elements = Object.keys(elementColors);
  const randomElement = elements[Math.floor(Math.random() * elements.length)];
  return elementColors[randomElement];
};

onMounted(() => {
  const textArray = props.text.split('');
  textArray.forEach(() => {
    characters.value.push({
      value: '0',
      isNbr: true,
      dataNumber: 0,
      dataChange: Math.round(Math.random() * 60),
      backgroundColor: ''
    });
  });

  const randomNbr = () => Math.round(Math.random() * 9);
  const randomIndex = () => Math.floor(Math.random() * characters.value.length);

  const setValue = () => {
    const randomCharIndex = randomIndex();
    characters.value[randomCharIndex].value = randomNbr().toString();
    characters.value[randomCharIndex].dataNumber += 1;

    characters.value.forEach((char, index) => {
      if (char.dataNumber > char.dataChange) {
        char.value = textArray[index];
        char.isNbr = false;
      }
    });

    // Применяем случайные цвета к фону
    characters.value.forEach((char) => {
      if (!char.isNbr && !char.backgroundColor) {
        char.backgroundColor = getRandomElementColor();
      }
    });
  };

  setInterval(setValue, 1);
});
</script>

<style scoped lang="scss">
html, body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 100;
  background-color: #222;
  color: #eee;
  width: 100%;
  height: 100%;
}

.content {
  /* text-align: center; */
  position: relative;
  /* top: 50%;
  transform: translateY(-50%); */
}

span {
  width: 30px;
  display: inline-block;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #cecece45;
  text-align: center;
}
</style>
