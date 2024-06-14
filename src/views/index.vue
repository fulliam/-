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
    class="code"
    :class="showCode ? 'slide-in-right' : 'slide-out-right'"
  >
    <pre class="glass-wrapper">
      <code class="javascript" style="background: transparent;">

      </code>
    </pre>
  </div>

  <DragWindow>
    <div class="glass-wrapper">
      HELOOO
    </div>
  </DragWindow>

  <DragContainer
    v-for="container in containerData"
    :key="container.id"
    :initial-x="container.initialX"
    :initial-y="container.initialY"
    :z-index="container.zIndex"
    :width="container.width"
    :height="container.height"
    @selectContainer="selectContainer(container.id)"
    @contextmenu="showContextMenu($event, container.id)"
  >
    <div
      v-if="showMenu && container.id === selectedContainerId"
      class="context-menu"
    >
      <button class="button-85" style="width: 90px; --bg: #be4d4d;" @click="deleteContainer(container.id)">Del</button>
    </div>
    <ul>
      <li>
        id: {{ container.id }}
      </li>
      <li>
        initialY: {{ container.initialY }}
      </li>
      <li>
        initialY: {{ container.initialY }}
      </li>
      <li>
        zIndex: {{ container.zIndex }}
      </li>
    </ul>
  </DragContainer>

  <div style="position: relative;">
    <section id="section1">
      <ChangeFontAndImage :text="'fu11i@m'" />
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
import DragWindow from '@/components/partials/Drag/DragWindow.vue';
import DragContainer from '@/components/partials/Drag/DragContainer.vue';

const showMusic = ref<boolean>(false);
const showCode = ref<boolean>(false);
const showDragWindow = ref<boolean>(false);

let lastClickTime = 0;
const debounceTime = 500;
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
      // Действия при индексе 2
    }
    if (index === 4) {
      // Действия при индексе 2
    }
  }
};

const containerData = ref([
  {
    id: 1,
    initialX: 100,
    initialY: 500,
    zIndex: 110,
    width: 100,
    height: 100
  },
  {
    id: 2,
    initialX: 200,
    initialY: 500,
    zIndex: 110,
    width: 100,
    height: 100
  },
  {
    id: 3,
    initialX: 300,
    initialY: 500,
    zIndex: 110,
    width: 100,
    height: 100
  }
]);

let maxZIndex = 2;
let showMenu = ref(false);
let selectedContainerId = ref<number | null>(null);
// let nextContainerId = ref(4);

const selectContainer = (id: number) => {
  const container = containerData.value.find((c: any) => c.id === id);
  if (container) {
    container.zIndex = maxZIndex + 1;
    maxZIndex += 1;
    selectedContainerId.value = id;
  }
};

const showContextMenu = (event: MouseEvent, id: number) => {
  event.preventDefault();
  showMenu.value = true;
  selectedContainerId.value = id;

  window.addEventListener('click', hideContextMenu);
  window.addEventListener('keyup', hideContextMenu);
};

const hideContextMenu = () => {
  showMenu.value = false;
  window.removeEventListener('click', hideContextMenu);
  window.removeEventListener('keyup', hideContextMenu);
};

const deleteContainer = (id: number) => {
  const index = containerData.value.findIndex((c: any) => c.id === id);
  if (index !== -1) {
    containerData.value.splice(index, 1);
    if (id === selectedContainerId.value) {
      selectedContainerId.value = null;
    }
  }
};

// const addContainer = () => {
//   containerData.value.push({
//     id: nextContainerId.value,
//     initialX: 100,
//     initialY: 0,
//     zIndex: 0,
//     width: 100,
//     height: 100
//   });
//   nextContainerId.value += 1;
// };
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
  top: 8px;
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

  pre {
    border-radius: 24px 0 0 24px;

    code {
      font-size: 12px;
    }
  }
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
</style>
