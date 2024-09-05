<template>
  <div class="row q-gutter-x-lg q-pt-lg">
  <QCard class="col q-pa-md q-mb-lg">
    <slot name="input"></slot>
  </QCard>

  <QCard class="col q-pa-md q-mb-lg monospace">
    <slot name="output"></slot>
  </QCard>
</div>

  <slot></slot>
</template>
