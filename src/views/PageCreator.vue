<template>
  <div class="is-flex is-flex-wrap-wrap mx-auto">
    <Card>
      <slot name="input"></slot>
    </Card>

    <Card class="monospace">
      <slot name="output"></slot>
    </Card>
  </div>

  <!--This is for extra content like album entry or category modules-->
  <slot></slot>
</template>
