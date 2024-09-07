<template>
  <div class="checkbox-group full-width">
    <slot></slot>
  </div>
</template>


<style scoped lang="scss">
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(50%, 175px), 1fr));
}
</style>
