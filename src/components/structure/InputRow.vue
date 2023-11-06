<template>
  <div class="table">
    <template v-if="$slots.label && $slots.input">
      <div class="table-cell text">
        <slot name="label"></slot>
      </div>
      <div class="table-cell data">
        <slot name="input"></slot>
      </div>
    </template>

    <div v-else class="table-cell">
      <slot></slot>
    </div>
  </div>
</template>
