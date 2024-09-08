<template>
  <div class="row wrap q-gutter-x-lg q-pt-lg q-mx-auto page-wrapper">
    <QCard class="col q-pa-md q-mb-lg card">
      <slot name="input"></slot>
    </QCard>

    <QCard class="col q-pa-md q-mb-lg card monospace">
      <slot name="output"></slot>
    </QCard>
  </div>

  <slot></slot>
</template>

<style scoped lang="scss">
.page-wrapper {
  max-width: 1400px;

  .card {
    min-width: 250px;
  }
}
</style>
