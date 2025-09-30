<template>
  <div v-if="points.length > 0" class="flex items-center">
    <div
      v-for="(point, index) in points"
      :key="index"
      class="relative flex items-center"
      :style="{ marginLeft: index === 0 ? '0' : '2rem' }"
    >
      <!-- 圆点 -->
      <div
        class="rounded-full border-2 border-white relative z-10"
        :class="{
          'w-6 h-6': point.name === 'large',
          'w-4 h-4': point.name === 'small',
          'bg-red-500': point.value === -1,
          'bg-gray-300': point.value === 0, // 圆点灰色
          'bg-green-500': point.value === 1,
        }"
        :style="{
          margin: '0 0.5rem', // 增加圆点与直线之间的间隔
        }"
      ></div>

      <!-- 每两个圆点之间的虚线 -->
      <div
        v-if="index < points.length - 1"
        class="absolute h-0.5 z-0"
        :style="{
          width: '2rem',
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          background: dashStyle, // 使用动态计算的虚线样式
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: [], // 组件自身的 points 变量
    };
  },
  computed: {
    // 动态计算虚线样式
    dashStyle() {
      const grayColor = '#d1d5db'; // Tailwind CSS 中 gray-300 的 HEX 值
      return `repeating-linear-gradient(to right, ${grayColor}, ${grayColor} 4px, transparent 4px, transparent 8px)`;
    },
  },
  methods: {
    changeData(points) {
      this.points = points;
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加自定义样式 */
</style>