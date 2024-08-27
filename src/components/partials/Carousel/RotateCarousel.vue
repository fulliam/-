<template>
  <div class="container">
    <div id="carousel">
      <div v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const images = ref<string[]>([
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDd4ajZzM2ptdGc5OWIyMG90eGw4cHllZXRzdmNudnQ5dGtzemhwbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FlyYYzgd0GNj8B7quA/giphy.webp',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExczNlcnE4OHUwNGRxdGVteWJjcWxhcXlkMHJqeGM2amI3YXp4dG9xMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CzDBwKa5DBDppHCb6m/giphy.webp',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXZvbXBvM3N0bWR0ZGI3YXdyeW9wY2xtdXludXh1N25kdno3cDF6MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0oYBxMzAFU3iHhsPk6/giphy.webp',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTA1Z2liMGdhamR6eTNtNjczcXNvMGxxeWMwaWN5czhzMWdpNG1yNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9EdzfOSgfyueLm/giphy.webp',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGtwbTZmMjUwc2dyMzE3cnl1aHd4YWltNGF5dnBteDdhcHA2dGV2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7aKACOczZ8VSZLa/giphy.webp',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTJudHZ4M3Q4OWw5ZmRtM2JhNHVjeDZybGV0MXZocDlkbjRyaG5vNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1aTUTJOn3aavLVC6G1/giphy.webp',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnlucTNpemxiOGh2d3liODdjM2ZhbWJzb3U4ODFnaHE5aWo2engwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bpmNf92LmkoMw/giphy.webp',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWp6amUzNWEwd3JwNWFjMm51YndnZmtjNzdlNWk3YjdrbTQ5dnNqdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UDXM9DS5SBXCr2gsUi/giphy.webp',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXpnYXF4cmt6ZThsOTJnczJwNHpmOW12c3F6Y3d4MTU4aGY1aXM2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LNVXScru4FxARYCRXP/giphy.webp'
]);
</script>

<style scoped lang="scss">
@mixin transform($deg) {
  -webkit-transform: rotateY($deg) translateZ(288px);
     -moz-transform: rotateY($deg) translateZ(288px);
      -ms-transform: rotateY($deg) translateZ(288px);
       -o-transform: rotateY($deg) translateZ(288px);
          transform: rotateY($deg) translateZ(288px);
}

@mixin transform-origin() {
  -webkit-transform-origin: 60% 50%;
     -moz-transform-origin: 60% 50%;
       -o-transform-origin: 60% 50%;
      -ms-transform-origin: 60% 50%;
          transform-origin: 60% 50%;
}

@mixin transform_($deg) {
  -webkit-transform: rotateY($deg);
     -moz-transform: rotateY($deg);
       -o-transform: rotateY($deg);
      -ms-transform: rotateY($deg);
          transform: rotateY($deg);
}

@mixin rotating(){
  from {
    @include transform-origin;
    @include transform_(0deg);
  }

  to {
    @include transform-origin;
    @include transform_(-360deg);
  }
}

.container {
  width: 210px;
  height: 140px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -webkit-perspective: 1100px;
  -moz-perspective: 1100px;
  -ms-perspective: 1100px;
  perspective: 1100px;
}

#carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: -webkit-transform 1s;
  -moz-transition: -moz-transform 1s;
  -o-transition: -o-transform 1s;
  -ms-transition: -ms-transform 1s;
  transition: transform 1s;
  -webkit-animation: rotating 20s linear infinite;
  -moz-animation: rotating 20s linear infinite;
  -o-animation: rotating 20s linear infinite;
  -ms-animation: rotating 20s linear infinite;
  animation: rotating 20s linear infinite;

  // &:hover {
  //   animation-play-state:paused;
  //   -o-animation-play-state:paused;
  //   -moz-animation-play-state:paused;
  //   -webkit-animation-play-state:paused;
  // }

  div {
    display: block;
    position: absolute;
    width: 180px;
    height: 120px;
    border: 2px solid #000;
    border-radius: 8px;

    img {
      width:100%;
      height:100%;
      object-fit: cover;
    }
    &:nth-child(1) {
      @include transform(0deg);
    }
    &:nth-child(2) {
      @include transform(40deg);
    }
    &:nth-child(3) {
      @include transform(80deg);
    }
    &:nth-child(4) {
      @include transform(120deg);
    }
    &:nth-child(5) {
      @include transform(160deg);
    }
    &:nth-child(6) {
      @include transform(200deg);
    }
    &:nth-child(7) {
      @include transform(240deg);
    }
    &:nth-child(8) {
      @include transform(280deg);
    }
    &:nth-child(9) {
      @include transform(320deg);
    }
  }
}

@-moz-keyframes rotating {
  @include rotating;
}

@-webkit-keyframes rotating {
  @include rotating;
}

@-o-keyframes rotating {
  @include rotating;
}

@keyframes rotating {
  @include rotating;
}
</style>