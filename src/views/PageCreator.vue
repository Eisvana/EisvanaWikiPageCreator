<script setup lang="ts">
import Card from 'primevue/card';
import Fluid from 'primevue/fluid';
</script>

<template>
  <div class="columns is-tablet is-gap-2 mx-2">
    <Card class="column is-full-mobile p-0">
      <template #content>
        <Fluid>
          <slot name="input"></slot>
        </Fluid>
      </template>
    </Card>

    <Card class="column is-full-mobile p-0 is-family-monospace">
      <template #content>
        <slot name="output"></slot>
      </template>
    </Card>
  </div>

  <!--This is for extra content like album entry or category modules-->
  <slot></slot>
</template>
