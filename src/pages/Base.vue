<script setup lang="ts">
import PageCreator from '@/views/PageCreator.vue';
import BaseOutput from '@/pageSections/base/BaseOutput.vue';
import BaseInput from '@/pageSections/base/BaseInput.vue';
</script>

<template>
  <PageCreator>
    <template #input>
      <BaseInput />
    </template>

    <template #output>
      <BaseOutput />
    </template>
  </PageCreator>
</template>
