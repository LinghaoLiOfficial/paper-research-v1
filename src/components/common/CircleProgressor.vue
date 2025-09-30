<template>
    <div class="relative w-32 h-32">
      <svg class="w-full h-full" viewBox="0 0 36 36">
        <!-- 背景圆环 -->
        <circle
          class="text-gray-200 stroke-current"
          stroke-width="2"
          fill="none"
          cx="18"
          cy="18"
          r="16"
        />
        <!-- 进度圆环 -->
        <circle
          :class="` text-${circleColor} stroke-current`"
          stroke-width="2"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="offset"
          cx="18"
          cy="18"
          r="16"
        />
      </svg>
      <!-- 进度文字 -->
      <div class="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {{ progress }}%
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CircleProgressor',
    props: [
      "circleColor"
    ],
    data() {
      return {
        progress: 0
      }
    },
    computed: {
      circumference() {
        return 2 * Math.PI * 16; // 圆的周长 = 2 * π * r
      },
      offset() {
        return this.circumference - (this.progress / 100) * this.circumference;
      }
    },
    methods: {
      updateProgress(progress) {
        this.progress = progress;
      }
    }
  };
  </script>
  
  <style scoped>
  /* 确保 SVG 的 stroke-linecap 是 round，使进度条两端圆润 */
  circle {
    stroke-linecap: round;
  }
  </style>