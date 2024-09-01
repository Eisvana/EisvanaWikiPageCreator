<script setup lang="ts">
import { defineAsyncComponent, type Component, onMounted } from 'vue';
import { usePageDataStore } from './stores/pageData';
import { route } from './variables/route';
import ThemeSwitch from './components/ThemeSwitch.vue';
import NavBar from './components/NavBar.vue';

const pageData = usePageDataStore();

onMounted(async () => pageData.getRelease());

// build a custom "fake router" instead of using client-side routing to avoid 404 pages on direct navigation
const router: Record<string, string> = {
  flora: 'Flora',
  mineral: 'Mineral',
  home: 'Home',
};

function getRouteComponent() {
  if (!route || !router[route]) return router.home;
  return router[route];
}

const componentName = getRouteComponent();

// const RouteComponent = defineAsyncComponent<Component>({
//   loader: () => import(`./pages/${componentName}.vue`),
// });
</script>

<template>
  <QLayout view="hhh lpR fFf">
    <QHeader class="bg-primary text-white">
      <QToolbar>
        <NavBar />
        <QToolbarTitle class="text-center">
          <h1>Eisvana Wiki Page Creator{{ componentName === 'Home' ? '' : ` - ${componentName}` }}</h1>
        </QToolbarTitle>
        <ThemeSwitch />
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <QPage>
        <!-- <RouteComponent /> -->
      </QPage>
    </QPageContainer>

    <QFooter class="bg-grey-8 text-white">
      <QToolbar>
        <QToolbarTitle>
          <div>Copy your stuff!!</div>
        </QToolbarTitle>
      </QToolbar>
    </QFooter>
  </QLayout>
</template>

<style scoped lang="scss">
h1 {
  all: unset;
}
</style>
