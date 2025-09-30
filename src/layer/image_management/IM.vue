<template>
  <div class="min-h-screen bg-sky-200">
    <div class=" w-full h-full container mx-auto py-2 px-2">
      <image-gallery></image-gallery>
    </div>
  </div>
</template>

<script>
import ImageGallery from '@/components/common/ImageGallery.vue';

export default {
  components: {
    ImageGallery
  }
}
</script>