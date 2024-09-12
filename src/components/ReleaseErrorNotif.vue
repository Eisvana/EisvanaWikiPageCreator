<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';

const toast = useToast();

const pageData = usePageDataStore();

const showTemplate = () => {
  toast.add({ severity: 'error', summary: 'Failed to fetch release!' });
};

onMounted(showTemplate);

const onClose = () => {
  toast.removeGroup('bc');
};
</script>

<template>
  <Toast
    position="bottom-center"
    @close="onClose"
  >
    <template #message="slotProps">
      <div>
        <div>{{ slotProps.message.summary }}</div>
        <Button
          label="Retry"
          severity="info"
          size="small"
          @click="pageData.getRelease"
        />
      </div>
    </template>
  </Toast>
</template>
