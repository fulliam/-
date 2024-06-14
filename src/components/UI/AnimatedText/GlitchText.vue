<template>
  <span class="icon-3d untouch">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
$redColor: rgba(244,67,54,1);
$blueColor:rgba(33,150,243,1);

.icon-3d {
    width: 100%;
    height: 100%;
    @include flex-center;
  -webkit-animation: icon3d 200ms 10;
  animation: icon3d 200ms 10;
  color: #fff;
  &:hover {
    -webkit-animation: icon3d 200ms infinite;
          animation: icon3d 200ms infinite;
  }
}

@keyframes icon3d {
  0% {
    text-shadow: 5px 4px $redColor, -5px -6px $blueColor;
  }
  25% {
    text-shadow: -5px -6px $redColor, 5px 4px $blueColor;
  }
  50% {
    text-shadow: 5px -4px $redColor, -8px 4px $blueColor;
  }
  75% {
    text-shadow: -8px -4px $redColor, -5px -4px $blueColor;
  }
  100% {
    text-shadow: -5px 0 $redColor, 5px -4px $blueColor;
  }
}
</style>