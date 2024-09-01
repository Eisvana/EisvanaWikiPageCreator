<script setup lang="ts">
import { defineAsyncComponent, type Component, onMounted } from 'vue';
import { usePageDataStore, useStaticPageDataStore } from './stores/pageData';
import { storeToRefs } from 'pinia';

const staticPageData = useStaticPageDataStore();
const { route } = storeToRefs(staticPageData);

const pageData = usePageDataStore();

onMounted(async () => pageData.getRelease());

// build a custom "fake router" instead of using client-side routing to avoid 404 pages on direct navigation
const router: Record<string, string> = {
  flora: 'Flora',
  mineral: 'Mineral',
  home: 'Home',
};

function getRouteComponent() {
  const currentRoute = route.value;
  if (!currentRoute || !router[currentRoute]) return router.home;
  return router[currentRoute];
}

const componentName = getRouteComponent();

const RouteComponent = defineAsyncComponent<Component>({
  loader: () => import(`./pages/${componentName}.vue`),
});
</script>

<template>
  <QLayout view="hhh lpR fFf">
    <QHeader class="bg-primary text-white">
      <QToolbar>
        <div>this is the back nav</div>
        <QToolbarTitle>
          <h1>Eisvana Wiki Page Creator{{ componentName === 'Home' ? '' : ` - ${componentName}` }}</h1>
        </QToolbarTitle>
        <div>this is the theme toggle button</div>
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <QPage>
        <RouteComponent />
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
