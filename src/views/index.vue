<template>
  <NavMenu @change-action="handleChangeAction" />

  <div
    class="music-widget glass-wrapper"
    :class="showMusic ? 'slide-in-right' : 'slide-out-right'"
  >
    <p><i class="earphones"></i>CURRENT TRACK:</p>
    <span>743h9f 93 e3d 92 32nd932d32c m04fhf h439f4 93n9f h9 43...</span>
    <div style="display: flex; flex-direction: row;">
      <MusicSpectogramm />
      <MusicSpectogramm />
      <MusicSpectogramm />
    </div>
  </div>

  <div
    class="code glass-wrapper"
    :class="showCode ? 'slide-in-right' : 'slide-out-right'"
  >
    <CodeHighlighter :code="samplePythonCode" language="python" />
  </div>

  <div
    class="calendar glass-wrapper"
    :class="showCalendar ? 'slide-in-left' : 'slide-out-left'"
  >
    <ColorPicker />
  </div>

  <div style="position: relative;">
    <section id="section1">
      <ChangeFontAndImage :text="'fu11i@m'" />

      <div class="carousel">
        <RotateCarousel />
      </div>

      <DragContainer
        v-if="showDragWindow"
        id="calendar-container"
        :initial-x="dragContainerX"
        :initial-y="dragContainerY"
        :max-width="dragContainerMaxWidth"
        :max-height="dragContainerMaxHeight"
      >
        <div
          class="drag-window glass-wrapper"
          :style="{
            width: `${dragWindowWidth}`,
            height: `${dragWindowHeight}`,
            maxHeight: `${dragContainerMaxHeight}`,
            maxWidth: `${dragContainerMaxWidth}`,
            borderRadius: dragWindowIsFullscreen ? '0' : '16px'
          }"
        >
          <!-- TODO: move traffic lights to drag container (decompose) -->
          <div class="traffic-lights">
            <button
              class="traffic-light traffic-light-close"
              @click="showDragWindow = false"
            ></button>
            <button
              class="traffic-light traffic-light-minimize"
              @click="handleResizeDragWindow('min')"
            ></button>
            <button
              class="traffic-light traffic-light-maximize"
              @click="handleResizeDragWindow('max')"
            ></button>
          </div>

          <Calendar />
        </div>
      </DragContainer>

      <DragContainer
        v-if="showGameWindow"
        id="game-container"
        :initial-x="dragContainerX"
        :initial-y="dragContainerY"
        :max-width="dragContainerMaxWidth"
        :max-height="dragContainerMaxHeight"
      >
        <div
          class="drag-window glass-wrapper game-viewer"
          :style="{
            width: `${dragWindowWidth}`,
            height: `${dragWindowHeight}`,
            maxHeight: `${dragContainerMaxHeight}`,
            maxWidth: `${dragContainerMaxWidth}`,
            borderRadius: dragWindowIsFullscreen ? '0' : '16px'
          }"
        >
          <!-- TODO: move traffic lights to drag container (decompose) -->
          <div class="traffic-lights">
            <button
              class="traffic-light traffic-light-close"
              @click="showGameWindow = false"
            ></button>
            <button
              class="traffic-light traffic-light-minimize"
              @click="handleResizeDragWindow('min')"
            ></button>
            <button
              class="traffic-light traffic-light-maximize"
              @click="handleResizeDragWindow('max')"
            ></button>
          </div>

          <iframe
            id="tapocheck"
            title="Betha test"
            width="100%"
            height="100%"
            src="https://fulliam.github.io/tapocheck"
          >
          </iframe>
        </div>
      </DragContainer>

      <DragContainer
        v-show="showObjWindow"
        id="game-container"
        :initial-x="dragContainerX"
        :initial-y="dragContainerY"
        :max-width="dragContainerMaxWidth"
        :max-height="dragContainerMaxHeight"
      >
        <div
          class="drag-window glass-wrapper object-view"
          :style="{
            width: `${dragWindowWidth}`,
            height: `${dragWindowHeight}`,
            maxHeight: `${dragContainerMaxHeight}`,
            maxWidth: `${dragContainerMaxWidth}`,
            borderRadius: dragWindowIsFullscreen ? '0' : '16px'
          }"
        >
          <!-- TODO: move traffic lights to drag container (decompose) -->
          <div class="traffic-lights">
            <button
              class="traffic-light traffic-light-close"
              @click="showObjWindow = false"
            ></button>
            <button
              class="traffic-light traffic-light-minimize"
              @click="handleResizeDragWindow('min')"
            ></button>
            <button
              class="traffic-light traffic-light-maximize"
              @click="handleResizeDragWindow('max')"
            ></button>
          </div>

          <DavidHead @loadComplete="handleLoadComplete" />
        </div>
      </DragContainer>

      <DragContainer
        v-show="showGame2Window"
        id="game-2-container"
        :initial-x="dragContainerX"
        :initial-y="dragContainerY"
        :max-width="dragContainerMaxWidth"
        :max-height="dragContainerMaxHeight"
      >
        <div
          class="drag-window glass-wrapper object-viewer"
          :style="{
            width: `${dragWindowWidth}`,
            height: `${dragWindowHeight}`,
            maxHeight: `${dragContainerMaxHeight}`,
            maxWidth: `${dragContainerMaxWidth}`,
            borderRadius: dragWindowIsFullscreen ? '0' : '16px'
          }"
        >
          <!-- TODO: move traffic lights to drag container (decompose) -->
          <div class="traffic-lights">
            <button
              class="traffic-light traffic-light-close"
              @click="showGame2Window = false"
            ></button>
            <button
              class="traffic-light traffic-light-minimize"
              @click="handleResizeDragWindow('min')"
            ></button>
            <button
              class="traffic-light traffic-light-maximize"
              @click="handleResizeDragWindow('max')"
            ></button>
          </div>

          <iframe
            id="tapocheck-top-down"
            title="Betha test"
            width="100%"
            height="100%"
            src="http://localhost:5173"
          ></iframe>
        </div>
      </DragContainer>

      <DragContainer
        v-show="showObjWindow"
        id="game-container"
        :initial-x="dragContainerX"
        :initial-y="dragContainerY"
        :max-width="dragContainerMaxWidth"
        :max-height="dragContainerMaxHeight"
      >
        <div
          class="drag-window glass-wrapper object-view"
          :style="{
            width: `${dragWindowWidth}`,
            height: `${dragWindowHeight}`,
            maxHeight: `${dragContainerMaxHeight}`,
            maxWidth: `${dragContainerMaxWidth}`,
            borderRadius: dragWindowIsFullscreen ? '0' : '16px'
          }"
        >
          <!-- TODO: move traffic lights to drag container (decompose) -->
          <div class="traffic-lights">
            <button
              class="traffic-light traffic-light-close"
              @click="showObjWindow = false"
            ></button>
            <button
              class="traffic-light traffic-light-minimize"
              @click="handleResizeDragWindow('min')"
            ></button>
            <button
              class="traffic-light traffic-light-maximize"
              @click="handleResizeDragWindow('max')"
            ></button>
          </div>

          <iframe
            id="plasta"
            title="Betha test"
            width="100%"
            height="100%"
            src="https://fulliam.github.io/plasta"
          >
          </iframe>
        </div>
      </DragContainer>
    </section>
    <section id="section2">
      <!-- <About /> -->
      <!-- <DavidHead /> -->
      <!-- <DavidHead @loadComplete="handleLoadComplete" /> -->
      <!-- <img src="/public/images/img.png" alt="fulliam" width="300px" height="300px" /> -->
    </section>
  </div>
  <section id="section3">
    <article style="text-align: center; color: #fff; font-size: 20px; margin-bottom: 6%; padding-right: 50px; padding-left: 50px;">
      <!-- <h2>
          H. Rackham
        </h2>
        <p>
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        </p> -->
    </article>
  </section>
  <section id="section4">
    <!-- <RotateCarousel /> -->
  </section>
</template>

<script setup lang="ts">
import ChangeFontAndImage from '@/components/UI/AnimatedText/ChangeFontAndImage.vue';
import NavMenu from '@/components/partials/NavMenu/NavMenu.vue';
// import About from '@/components/templates/About.vue';
import Calendar from '@/components/templates/Calendar.vue';
import DavidHead from '@/components/partials/3D/DavidHead.vue';
import MusicSpectogramm from '@/components/partials/MusicWidget/MusicSpectrogramm.vue';
import RotateCarousel from '@/components/partials/Carousel/RotateCarousel.vue';
import DragContainer from '@/components/partials/Drag/DragContainer.vue';
import CodeHighlighter from '@/components/UI/AnimatedText/CodeHighLighter.vue';
// import ColorPicker from '@/components/partials/ThemeColorSettings/ColorPicker.vue';
import ColorPicker from '@/components/partials/ThemeColorSettings/ColorPicker/index.vue';
// import gsap from 'gsap';
// import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

// gsap.registerPlugin(ScrollToPlugin);
const showMusic = ref<boolean>(false);
const showCode = ref<boolean>(false);
const showCalendar = ref<boolean>(false);
const showDragWindow = ref<boolean>(false);
const showGameWindow = ref<boolean>(false);
const showObjWindow = ref<boolean>(false);
const showGame2Window = ref<boolean>(false);

let lastClickTime = 0;
const debounceTime = 500; // animation speed in scss
let currentTime = Date.now();

// TODO: update this logic && rechange index
const handleChangeAction = (index: number) => {
  currentTime = Date.now();

  if (currentTime - lastClickTime < debounceTime) {
    return;
  } else {
    if (index === 0) {
      lastClickTime = Date.now();
      showMusic.value = !showMusic.value;
    }
    if (index === 1) {
      lastClickTime = Date.now();
      showCode.value = !showCode.value;
    }
    if (index === 2) {
      lastClickTime = Date.now();
      showDragWindow.value = true;
    }
    if (index === 3) {
      lastClickTime = Date.now();
      showCalendar.value = !showCalendar.value;
    }
    if (index === 4) {
      lastClickTime = Date.now();
      showGameWindow.value = !showGameWindow.value;
    }
    if (index === 5) {
      lastClickTime = Date.now();
      showObjWindow.value = !showObjWindow.value;
    }
    if (index === 6) {
      lastClickTime = Date.now();
      showGame2Window.value = !showGame2Window.value;
    }
    // addd line && index if u need
  }
};

const dragContainerX = ref<number>(500);
const dragContainerY = ref<number>(500);

const dragContainerMaxWidth = ref<string>('500px');
const dragContainerMaxHeight = ref<string>('500px');

const dragWindowWidth = ref<string>('100%');
const dragWindowHeight = ref<string>('100%');
const dragWindowIsFullscreen = ref<boolean>(false);

const handleResizeDragWindow = (param: string) => {
  if (param === 'max') {
    dragContainerMaxWidth.value = '100vw';
    dragContainerMaxHeight.value = '100vh';
    dragContainerX.value = 0;
    dragContainerY.value = 104;
    dragWindowWidth.value = '100vw';
    dragWindowHeight.value = '100vh';
    dragWindowIsFullscreen.value = true;
  }
  if (param === 'min') {
    dragContainerMaxWidth.value = '500px';
    dragContainerMaxHeight.value = '500px';
    dragContainerX.value = 300;
    dragContainerY.value = 500;
    dragWindowWidth.value = '100%';
    dragWindowHeight.value = '100%';
    dragWindowIsFullscreen.value = false;
  }
};

const objLoading = ref<boolean>(true);
const handleLoadComplete = (value: boolean) => {
  objLoading.value = value;
  console.log('ODJ', value);
};

const samplePythonCode = `
import asyncio

class AsyncJokeTeller:
    def __init__(self, name):
        self.name = name

    async def tell_joke(self):
        print(f"Hello, I'm {self.name} and I'm going to tell you a joke!")
        await asyncio.sleep(1)
        print("Why don't scientists trust atoms?")
        await asyncio.sleep(2)
        print("Because they make up everything! 😂")
    
    async def main(self):
        await self.tell_joke()

if __name__ == "__main__":
    joke_teller = AsyncJokeTeller("ChatGPT")
    asyncio.run(joke_teller.main())
`;

// const sections = ref([]);
// const currentSectionIndex = ref(0);

// const handleWheel = (event) => {
//   event.preventDefault();
//   if (event.deltaY < 0 && currentSectionIndex.value > 0) {
//     // Scroll up
//     currentSectionIndex.value--;
//     scrollToSection(sections.value[currentSectionIndex.value], 'up');
//   } else if (event.deltaY > 0 && currentSectionIndex.value < sections.value.length - 1) {
//     // Scroll down
//     currentSectionIndex.value++;
//     scrollToSection(sections.value[currentSectionIndex.value], 'down');
//   }
// };

// const scrollToSection = (section, direction) => {
//   if (section) {
//     const yOffset = direction === 'up' ? -window.innerHeight : 0;
//     gsap.to(window, { scrollTo: { y: section.offsetTop + yOffset, autoKill: false }, duration: 1 });
//   }
// };

// onMounted(() => {
//   sections.value = [
//     document.getElementById('section1'),
//     document.getElementById('section2'),
//     document.getElementById('section3'),
//     document.getElementById('section4')
//   ];
//   window.addEventListener('wheel', handleWheel);
// });

// onUnmounted(() => {
//   window.removeEventListener('wheel', handleWheel);
// });
</script>

<style scoped lang="scss">
section {
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
}

#section1 {
  z-index: 1;
}

#section2 {
  top: 104px;
  height: calc(100vh - 104px);

  z-index: 2;
  background: var(--section-bg-color);;
  backdrop-filter: blur(2px);

  display: flex;
  flex-direction: row;
  gap: 100px;
}

#section3 {
  top: 104px;
  height: calc(100vh - 104px);

  z-index: 3;
  background: rgba(255, 255, 255, 0.165);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#section4 {
  top: 104px;
  height: calc(100vh - 104px);

  z-index: 4;
  background: rgba(0, 0, 0, 0.15);
}

.glass-wrapper {
  padding: 15px;
  background-color: var(--section-bg-color);
  background-image: var(--section-bg-color);
}

.object-view {
  min-width: 600px !important;
  max-width: 600px !important;
  min-height: 500px !important;
  width: 600px !important;
  height: 500px !important;

  canvas {
    height: 100%;
    width: 100%;;
  }

  iframe {
    width: 100%;
    height: 100%;
    min-height: 540px;
    min-width: 540px;
    border: none;
    border-radius: 20px;
    margin-top: 15px;
  }
}

.object-viewer{
  min-width: 1200px;
  min-height: 600px;

  canvas {
    height: 100%;
    width: 100%;;
  }

  iframe {
    width: 100%;
    height: 100%;
    min-height: 540px;
    border: none;
    border-radius: 20px;
    margin-top: 15px;
  }
}

.game-viewer {
  min-width: 900px;
  min-height: 400px;

  iframe {
    width: 100%;
    height: 100%;
    min-height: 400px;
    border: none;
    border-radius: 20px;
    margin-top: 15px;
  }
}

.music-widget {
  position: fixed;
  right: 0;
  top: 150px;
  border-radius: 16px 0 0 16px;
  z-index: 109;
  color: white;
  display: flex;
  flex-direction: column;

  p {
    display: flex;
    gap: 10px;
    flex-direction: row;
    align-items: center;
  }
}

.carousel {
  position: absolute;
  left: -150px;
  top: 300px;
}

.earphones {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  border: 2px solid #fff;
  border-bottom-color: transparent;

  &:before {
    content: "";
    position: absolute;
    left: 1px;
    bottom: 0px;
    width: 5px;
    height: 10px;
    background-color: #fff;
    border-radius: 5px;
  }

  &:after {
    content: "";
    position: absolute;
    right: 1px;
    bottom: 0px;
    width: 5px;
    height: 10px;
    background-color: #fff;
    border-radius: 5px;
  }
}

.code {
  position: fixed;
  z-index: 99;
  bottom: 30px;
  right: 0;
  border-radius: 24px 0 0 24px;
}

.calendar {
  position: fixed;
  z-index: 99;
  height: 500px;
  bottom: 30px;
  left: 0;
  border-radius: 0 24px 24px 0;
}

.slide-in-right {
  animation: slide-in-right .5s linear forwards;
}

.slide-out-right {
  animation: slide-out-right .5s linear forwards;
}

.slide-in-left {
  animation: slide-in-left .5s linear forwards;
}

.slide-out-left {
  animation: slide-out-left .5s linear forwards;
}

@keyframes slide-in-right {
  0% {
    transform: translate(100%);
  }
  100% {
    transform: translate(0%);
  }
}

@keyframes slide-out-right {
  0% {
    transform: translate(0%);
  }
  100% {
    transform: translate(100%);
  }
}

@keyframes slide-in-left {
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(0%);
  }
}

@keyframes slide-out-left {
  0% {
    transform: translate(0%);
  }
  100% {
    transform: translate(-100%);
  }
}

.drag-window {
  overflow: scroll;

  p {
    margin: 10px;
    margin-top: 20px;
    @include HiveheadHandwriting(500, 14, $white);
  }

  .traffic-lights {
    position: absolute;
    top: 2px;
    left: 11px;

    .focus &, &:hover, &:active {
        > .traffic-light-close {
            background-color: $close-red;

            &:active:hover {
                background-color: $close-red-active;
            }
        }
        > .traffic-light-minimize {
            background-color: $minimize-yellow;

            &:active:hover {
                background-color: $minimize-yellow-active;
            }
        }
        > .traffic-light-maximize {
            background-color: $maximize-green;

            &:active:hover {
                background-color: $maximize-green-active;
            }
        }
    }

    > .traffic-light {
        &:before, &:after {
            visibility: hidden;
        }
    }

    &:hover, &:active {
        > .traffic-light {
            &:before, &:after {
                visibility: visible;
            }
        }
    }
  }

  .traffic-light {
    border-radius: 100%;
    padding: 0;
    height: 12px;
    width: 12px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-right: 3.5px;
    background-color: $disabled-gray;
    position: relative;
    outline: none;

    &:before, &:after {
        content: '';
        position: absolute;
        border-radius: 1px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    &-close {
        &:before, &:after {
            background-color: $close-red-icon;
            width: 8px;
            height: 1px;
        }
        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }
        &:active:hover:before, &:active:hover:after {
            background-color: $close-red-icon-active;
        }
    }

    &-minimize {
        &:before {
            background-color: $minimize-yellow-icon;
            width: 8px;
            height: 1px;
        }
        &:active:hover:before {
            background-color: $minimize-yellow-icon-active;
        }
    }

    &-maximize {
        &:before {
            background-color: $maximize-green-icon;
            width: 6px;
            height: 6px;
        }
        &:after {
            background-color: $maximize-green;
            width: 10px;
            height: 2px;
            transform: rotate(45deg);
        }
        &:active:hover:before {
            background-color: $maximize-green-icon-active;
        }
        &:active:hover:after {
            background-color: $maximize-green-active;
        }
    }
  }
}
</style>
