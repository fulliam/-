<template>
  <div class="spectrograph">
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
    <div class="spectrograph__bar"></div>
  </div>
</template>

<style scoped lang="scss">
$spectrograph-bars-count: 20;
$spectrograph-bar-width: 6px;

$spectrograph-bar-cells-count: 5;
$spectrograph-bar-cell-height: 2px;

$spectrograph-gap-height: 2px;
$spectrograph-gap-width: 1px;

$spectrograph-height: $spectrograph-bar-cells-count * ($spectrograph-bar-cell-height + $spectrograph-gap-height);
$spectrograph-width: ($spectrograph-bar-width * $spectrograph-bars-count) + ($spectrograph-gap-width * ($spectrograph-bars-count - 1));

.spectrograph {
    color: $green;
    display: flex;
    align-items: flex-end;
    width: $spectrograph-width;
    height: $spectrograph-height;
    overflow: hidden;
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='spectrograph' x='0' y='0' width='#{$spectrograph-bar-width}' height='#{$spectrograph-bar-cell-height + $spectrograph-gap-height}' patternUnits='userSpaceOnUse'%3E%3Crect x='0' y='#{$spectrograph-gap-height}' width='#{$spectrograph-bar-width}' height='#{$spectrograph-bar-cell-height}' fill='%23000'/%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23spectrograph)'%3E%3C/rect%3E%3C/svg%3E");

    &__bar {
        margin: 0 $spectrograph-gap-width 0 0;
        flex: 0 0 $spectrograph-bar-width;
        height: 100%;
        background: currentColor;
        transform: translateY(100%);
        transform-origin: center bottom;
        animation: animation 1.5s steps($spectrograph-bar-cells-count, start) infinite alternate;
        will-change: transform;

        @for $i from 1 through 20 {
            &:nth-child(#{$i}) {
                animation-name: animation#{random(3)};
                animation-delay: #{$i * 50}ms;
                animation-duration: #{random(3) * 100 + 1500}ms;
            }
        }

        &:last-child {
            margin: 0;
        }
    }
}

@keyframes animation1 {
    0%, 5% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes animation2 {
    0%, 66% {
        transform: translateY(100%);
    }

    33%, 100% {
        transform: translateY(0);
    }
}

@keyframes animation3 {
    33%, 66% {
        transform: translateY(100%);
    }

    0%, 45%, 100% {
        transform: translateY(0);
    }
}
</style>