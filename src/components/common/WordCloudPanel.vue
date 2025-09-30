<template>
    <div v-show="isActivate" class=" w-full h-full fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class=" flex h-full w-full items-center justify-center" @click.self="handleClose">
        <div class=" bg-white rounded-lg shadow-2xl p-6 w-10/12 h-5/6 relative">

          <button @click="handleClose" class="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-4">×</button>

          <div class=" mt-6 h-full w-full flex flex-col overflow-auto" style="height: 96%;">
            <div class=" mt-2 text-3xl font-semibold mr-10 ml-8 text-common_color_3">距离词云图</div>

            <div v-for="(image, index) in images" :key="index" class=" flex flex-col items-center">
              <div class=" mt-16 text-xl text-neutral-700">{{image['name']}}</div>  
              <img :src="image['url']" style="width: 90rem" >
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import TagStack from './TagStack.vue';
import SingleTag from './SingleTag.vue';
import AITag from './AITag.vue';

export default {
  name: 'WordCloudPanel',
  data() {
    return {
        isActivate: false,
        images: []
    }
  },
  components: {
    TagStack,
    SingleTag,
    AITag
  },
  methods: {
    activate(images) {
        this.isActivate = true;
        this.images = images;
    },
    handleClose() {
        this.isActivate = false;
        this.images = [];
        this.$emit('input', false);
    },
  }
}
</script>

<style>

</style>