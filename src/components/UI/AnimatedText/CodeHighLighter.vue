<template>
  <pre ref="codeContainer" :class="`language-${language}`">
    <code class="language-{{ language }}">{{ code }}</code>
  </pre>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/themes/prism-tomorrow.css'; // Можете выбрать другую тему

interface Props {
  code: string;
  language: string;
}

const props = defineProps<Props>();

const codeContainer = ref<HTMLElement | null>(null);

const highlightCode = () => {
  if (codeContainer.value) {
    Prism.highlightElement(codeContainer.value);
  }
};

onMounted(() => {
  highlightCode();
});

watch(() => props.code, () => {
  highlightCode();
});
</script>

<style lang="scss" scoped>
pre {
  overflow: auto;
  background: transparent;
}

code {
  font-family: 'Fira Code', 'Courier New', monospace;
}
</style>
