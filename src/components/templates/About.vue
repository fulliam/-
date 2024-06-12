<template>
  <article class="left">
    <h1>
      <ChangeRandomLetter :text="'de Finibus Bonorum et Malorum'" />
    </h1>
    <p>
      <ChangeRandomLetter :text="'Sed ut perspiciatis unde omnis iste natus error '" />
      <!-- "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" -->
      <!-- "Us denying the random!" -->
      <!-- "Нам отказывают в случайности!" -->
    </p>
  </article>
  <article class="right">
    <h1>
      <ChangeRandomLetter :text="'Lorem Ipsum'" />
    </h1>
    <p>
      <ChangeRandomLetter :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'" />
      <!-- "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." -->
    </p>
  </article>
</template>

<script setup lang="ts">
import ChangeRandomLetter from '@/components/UI/AnimatedText/ChengeRandomLetter.vue';
</script>

<style scoped lang="scss">
article {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 50px;

    @include ORAFranchini(400, 24, $white);

    &.left {
        text-align: left;
    }

    &.right {
        text-align: right;
    }
}
</style>