<template>
  <nav>
    <h1>
      <ChangeRandomLetter :text="'FULLIAM'" />
    </h1>

    <ul>
      <li
        v-for="(icon, index) in icons"
        :key="icon"
        class="glassIco"
        @click="handleEmit(index)"
      >
        <GlitchText>
          {{ icon }}
        </GlitchText>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import GlitchText from '@/components/UI/AnimatedText/GlitchText.vue';
import ChangeRandomLetter from '@/components/UI/AnimatedText/ChengeRandomLetter.vue';

const icons = ref([
  '␥',
  '᭡',
  'の',
  'ᝰ.ᐟ',
  'ᝰ.ᐟ',
  'ᝰ.ᐟ'
]);

const emit = defineEmits<{
  changeAction: [value: number];
}>();

const handleEmit = (index: number) => {
  emit('changeAction', index);
};
</script>

<style scoped lang="scss">
nav {
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, .4);
  left: 0;
  position: fixed;
  top: 0;
  transition: background-color 0.2s, box-shadow 0.2s;
  width: 100%;
  z-index: 100;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    @include MixBit(500, 16px, $white)
  }

  ul {
    list-style: none;
    @include flex-center;
    gap: 20px;
  }
}

.glassIco {
  --height: 72px;
  --width: 72px;
  &, & * { box-sizing: border-box; transition: 200ms; }
  width: var(--width);
  height: var(--height);
  white-space: nowrap;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-right-color: rgba(255, 255, 255, 0.1);
  border-bottom-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  @include flex-center;
  @include AngryFont(400, 42, $green);

  &:before {
    content: "";
    position: absolute;
    display: block;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    filter: blur(0px);
    transition: 400ms;
    transform: skewX(45deg) translateX(calc(var(--width) + 50%));
  }
  &:hover {
    transform: translateY(-10px);
    &:before {
      transform: skewX(45deg) translateX(calc(var(--width) * -1 - 50%))
    }
  }
  & > * { opacity: 0.8; }
}
</style>