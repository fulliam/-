<template>
  <article>
    <h1 class="untouch">
      {{ props.text }}
    </h1>
  </article>
</template>

<script setup lang="ts">
const props = defineProps(['text']);
</script>

<style scoped lang="scss">
article {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  background-color: #cecece;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 30px black;
  background-image: url('/images/wall.jpg');
  // background-image: url('/images/walltexture.jpeg');
  // background-image: url('/images/concretewall.png');
}

@keyframes changeFontAndImage {
  0%, 100% {
    font-family: $Cwisdom;
    background-image: url('/images/6.jpg');
  }
  10% {
    font-family: $AngryFont;
    background-image: url('/images/17.jpg');
  }
  20% {
    font-family: $Blowbrush;
    background-image: url('/images/8.jpg');
  }
  30% {
    font-family: $Halvar-Breit;
    background-image: url('/images/9.jpg');
  }
  40% {
    font-family: $HoaxVandal;
    background-image: url('/images/10.jpg');
  }
  50% {
    font-family: $HiveheadHandwriting;
    background-image: url('/images/11.jpg');
  }
  60% {
    font-family: $PermanentMarker;
    background-image: url('/images/12.jpg');
  }
  70% {
    font-family: $SAIBA45;
    background-image: url('/images/13.jpg');
  }
  80% {
    font-family: $SantaChild;
    background-image: url('/images/14.jpg');
  }
  90% {
    font-family: $MixBit;
    background-image: url('/images/17.jpg');
    background-blend-mode: darken;
  }
}

h1 {
  animation: changeFontAndImage 7s infinite;
  width: auto;
  font-size: 250px;
  color: white;
  text-align: center;
  background-size: contain;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
  transition: all .3s;
  // filter: drop-shadow(10px 20px black);
  filter: blur(0.3px);

  &:before,
  &:after {
    content: "";
    background-size: cover;
    transform: rotate(-90deg);
  }
}
</style>