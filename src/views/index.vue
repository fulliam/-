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

  <div style="position: relative;">
    <section id="section1">
      <ChangeFontAndImage :text="'fu11i@m'" />

      <DragContainer
        v-if="showDragWindow"
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
          <p>
            "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
          </p>
        </div>
      </DragContainer>
    </section>
    <section id="section2">
      <About />
    </section>
    <section id="section3">
      <DavidHead />

      <article style="text-align: center; color: #fff; font-size: 20px; margin-bottom: 6%; padding-right: 50px; padding-left: 50px;">
        <h2>
          H. Rackham
        </h2>
        <p>
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        </p>
      </article>
    </section>
    <section id="section4">
      <RotateCarousel />
    </section>
  </div>
</template>

<script setup lang="ts">
import ChangeFontAndImage from '@/components/UI/AnimatedText/ChangeFontAndImage.vue';
import NavMenu from '@/components/partials/NavMenu/NavMenu.vue';
import About from '@/components/templates/About.vue';
import DavidHead from '@/components/partials/3D/DavidHead.vue';
import MusicSpectogramm from '@/components/partials/MusicWidget/MusicSpectrogramm.vue';
import RotateCarousel from '@/components/partials/Carousel/RotateCarousel.vue';
import DragContainer from '@/components/partials/Drag/DragContainer.vue';
import CodeHighlighter from '@/components/UI/AnimatedText/CodeHighLighter.vue';

const showMusic = ref<boolean>(false);
const showCode = ref<boolean>(false);
const showDragWindow = ref<boolean>(false);

let lastClickTime = 0;
const debounceTime = 500; // animation speed in scss
let currentTime = Date.now();

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
      // any
    }
    if (index === 4) {
      // any
    }
  }
};

const dragContainerX = ref<number>(50);
const dragContainerY = ref<number>(700);

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
  background: rgba(0, 0, 0, 0.4);
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
  background-color: rgba(0, 0, 0, 0.5);
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

.slide-in-right {
  animation: slide-in-right .5s linear forwards;
}

.slide-out-right {
  animation: slide-out-right .5s linear forwards;
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
