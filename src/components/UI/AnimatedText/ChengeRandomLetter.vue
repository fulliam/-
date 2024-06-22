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

const elementColors: Record<string, string> = {
  'H': 'rgba(255, 69, 0, 0.8)', // Оранжевый красный
  'He': 'rgba(255, 215, 0, 0.8)', // Золотой
  'Li': 'rgba(0, 191, 255, 0.8)', // Глубокий небесно-голубой
  'Be': 'rgba(124, 252, 0, 0.8)', // Луговой зеленый
  'B': 'rgba(138, 43, 226, 0.8)', // Синий аметист
  'C': 'rgba(255, 20, 147, 0.8)', // Розовый
  'N': 'rgba(0, 255, 127, 0.8)', // Весенний зеленый
  'O': 'rgba(255, 105, 180, 0.8)' // Горячий розовый
};

const getRandomElementColor = () => {
  const elements = Object.keys(elementColors);
  const randomElement = elements[Math.floor(Math.random() * elements.length)];
  return elementColors[randomElement];
};

const dictionary = '﷼≭＄∅⊓〄εζωのG.CM,d:?nce!TyB)TYBZ!r}0DBxZb(V{?//kJ#+8Wdt=*;c04q([{%:BeT*2';

const getRandomChar = () => {
  const randomIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[randomIndex];
};

onMounted(() => {
  const textArray = props.text.split('');
  textArray.forEach(() => {
    characters.value.push({
      value: getRandomChar(),
      isNbr: true,
      dataNumber: 0,
      dataChange: Math.round(Math.random() * 15),
      backgroundColor: ''
    });
  });

  const randomIndex = () => Math.floor(Math.random() * characters.value.length);

  const setValue = () => {
    const randomCharIndex = randomIndex();
    characters.value[randomCharIndex].value = getRandomChar();
    characters.value[randomCharIndex].dataNumber += 1;

    characters.value.forEach((char, index) => {
      if (char.dataNumber > char.dataChange) {
        char.value = textArray[index];
        char.isNbr = false;
      }
    });

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
