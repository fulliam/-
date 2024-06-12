<template>
  <SideMenu />

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
    </section>
  </div>
</template>

<script setup lang="ts">
import ChangeFontAndImage from '@/components/UI/AnimatedText/ChangeFontAndImage.vue';
import SideMenu from '@/components/partials/SideMenu/SideMenu.vue';
import About from '@/components/templates/About.vue';
import DavidHead from '@/components/partials/3D/DavidHead.vue';
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
</style>
