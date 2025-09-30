<template>
    <div class="relative h-full overflow-hidden group rounded-xl" @click.stop>
      <!-- 轮播项 -->
      <div
        v-for="(item, index) in items"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000"
        :class="{ 'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index }"
      >
        <div 
          class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
        
        <!-- 文字内容 -->
        <div class="relative h-full flex items-center justify-center text-white px-4">
          <div class="text-center max-w-4xl space-y-6 transform transition-all duration-1000"
               :class="{
                 'opacity-100 translate-y-0': currentIndex === index,
                 'opacity-0 translate-y-8': currentIndex !== index
               }">
            <span class="inline-block text-lg font-light tracking-widest">
              {{ item.name }}
            </span>
            <h2 class="text-4xl md:text-6xl font-bold mb-4">
              {{ item.title }}
            </h2>
            <p class="text-xl md:text-2xl font-light max-w-2xl mx-auto">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
  
      <!-- 导航按钮 -->
      <button
        @click="prev"
        class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors duration-300"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <button
        @click="next"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors duration-300"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
  
      <!-- 指示点 -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="currentIndex = index"
          class="w-3 h-3 rounded-full transition-colors duration-300"
          :class="currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'"
        ></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  
    data() {
      return {
        currentIndex: 0,
        timer: null,
        interval: 5000,
        items: [
          {
            image: require('@/assets/img/carousel/9d59a35a-4ed1-4c1b-92d0-716e8cbf559a.png'),
            title: '',
            name: '',
            description: ''
          },
          {
            image: require('@/assets/img/carousel/4859cd51-7cb7-4371-830a-208e11d15dae.png'),
            title: '',
            name: '',
            description: ''
          },
          {
            image: require('@/assets/img/carousel/c2f11650-bdc4-4f46-923b-19285ce3680b.png'),
            title: '',
            name: '',
            description: ''
          },
          {
            image: require('@/assets/img/carousel/f580c43f-17e0-4cd1-bc28-f5dea664c4d0.png'),
            title: '',
            name: '',
            description: ''
          },
        ],

      }
    },
  
    mounted() {
      this.startAutoPlay()
    },
  
    beforeDestroy() {
      this.clearAutoPlay()
    },
  
    methods: {
      prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
        this.resetAutoPlay()
      },
  
      next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length
        this.resetAutoPlay()
      },
  
      startAutoPlay() {
        this.timer = setInterval(() => {
          this.next()
        }, this.interval)
      },
  
      resetAutoPlay() {
        this.clearAutoPlay()
        this.startAutoPlay()
      },
  
      clearAutoPlay() {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    }
  }
  </script>