<script setup lang="ts">
import MainToolbar from '@/components/MainToolbar.vue';
import { componentName } from '@/variables/route';
import { defineAsyncComponent, type Component } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const RouteComponent = defineAsyncComponent<Component>({
  loader: () => import(`./pages/${componentName}.vue`),
});
</script>

<template>
  <header>
    <MainToolbar />
  </header>
  <main class="container">
    <!-- <RouteComponent /> -->
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex, laudantium debitis eum molestias quis
      soluta enim, non nemo totam delectus iusto commodi corporis odio officiis aperiam natus ab voluptatum.
    </div>
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex, laudantium debitis eum molestias quis
      soluta enim, non nemo totam delectus iusto commodi corporis odio officiis aperiam natus ab voluptatum.
    </div>
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex, laudantium debitis eum molestias quis
      soluta enim, non nemo totam delectus iusto commodi corporis odio officiis aperiam natus ab voluptatum.
    </div>
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex, laudantium debitis eum molestias quis
      soluta enim, non nemo totam delectus iusto commodi corporis odio officiis aperiam natus ab voluptatum.
    </div>
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex, laudantium debitis eum molestias quis
      soluta enim, non nemo totam delectus iusto commodi corporis odio officiis aperiam natus ab voluptatum.
    </div>
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex, laudantium debitis eum molestias quis
      soluta enim, non nemo totam delectus iusto commodi corporis odio officiis aperiam natus ab voluptatum.
    </div>
  </main>
  <footer class="full-width">
    <Toolbar>
      <template #center>
        <div class="footer-toolbar">
          <Button label="Copy" />
          <Button
            as="a"
            label="Create"
          />
          <Button
            label="Reset"
            severity="warn"
          />
        </div>
      </template>
    </Toolbar>
  </footer>
</template>

<style scoped>
* {
  --p-toolbar-border-radius: 0;
}

footer {
  width: 100%;
  position: fixed;
  bottom: 0;

  .footer-toolbar {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}

.container {
  font-size: 5rem;
}
</style>
