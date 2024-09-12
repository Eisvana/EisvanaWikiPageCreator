<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();
const isVisible = ref(false);

const showTemplate = () => {
  if (isVisible.value) return;
  toast.add({ severity: 'error', summary: 'Failed to fetch release!' });
  isVisible.value = true;
};

const onReply = () => {
  toast.removeGroup('bc');
  isVisible.value = false;
};

const onClose = () => (isVisible.value = false);
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
          size="small"
          label="Retry"
          severity="info"
          @click="onReply()"
        />
      </div>
    </template>
  </Toast>
</template>
