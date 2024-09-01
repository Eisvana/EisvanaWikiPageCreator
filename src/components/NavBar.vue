<script setup lang="ts">
const eisvanaHosts = ['wiki.eisvana.com', 'wikipagecreator.eisvana.com'];
const isEisvanaHost = eisvanaHosts.includes(window.location.host);
</script>

<template>
  <QItem :href="isEisvanaHost ? 'https://nmscd.com' : '/'">
    <QItemSection>
      <QIcon name="arrow_back" />
    </QItemSection>
    <QItemSection avatar>View other pages</QItemSection>
  </QItem>
</template>
