<script setup lang="ts">
import { defineAsyncComponent, type Component, onMounted } from 'vue';
import { usePageDataStore } from './stores/pageData';
import { route } from './variables/route';
import NavBar from './components/NavBar.vue';
import Settings from './components/Settings.vue';

const pageData = usePageDataStore();

onMounted(async () => pageData.initStore());

// build a custom "fake router" instead of using client-side routing to avoid 404 pages on direct navigation
const router: Record<string, string> = {
  flora: 'Flora',
  mineral: 'Mineral',
  home: 'Home',
  base: 'Base',
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
        <Settings />
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
          <div class="row q-gutter-x-md">
            <QBtn
              color="secondary"
              label="Copy"
            />
            <QBtn
              color="secondary"
              label="Create"
            />
          </div>
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
