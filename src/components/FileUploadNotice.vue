<script setup lang="ts">
import WikiLink from './WikiLink.vue';
import ExternalLink from './ExternalLink.vue';
</script>

<template>
  <p>
    Any pictures you upload here won't be uploaded to the wiki. This is only to autofill the image name. Maximum
    filesize is 10MB. You can upload your pictures to the wiki on
    <WikiLink
      link="Special:Upload?multiple=true"
      text="Special:Upload"
    />.
  </p>
  <p>
    You can compress your images with the
    <ExternalLink
      link="https://nmscd.com/Image-Compressor/"
      text="Image Compressor"
    />.
  </p>
</template>
