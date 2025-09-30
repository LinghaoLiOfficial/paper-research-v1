<template>
  <div class="p-2 min-h-12">
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        :class="['px-4 py-1 text-xs italic text-neutral-700 flex items-center rounded-full border-2 relative group', colors[index % colors.length]]"
        @mouseover="hoverIndex = index"
        @mouseleave="hoverIndex = -1"
      >
        {{ tag }}
        <span
          v-if="hoverIndex === index"
          class="absolute -top-3 -right-3 cursor-pointer text-red-500 text-lg bg-white border border-neutral-300 pr-1 rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
          @click="removeTag(index)"
        >
          ×
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagGroup',
  data() {
    return {
      colors: [
        'border-blue-400',
        'border-green-400',
        'border-red-400',
        'border-yellow-400',
        'border-purple-400',
        'border-pink-400'
      ],
      tags: [],
      hoverIndex: -1 // 用于跟踪当前鼠标悬浮的标签索引
    };
  },
  methods: {
    changeData(tags) {
      this.tags = tags;
    },
    removeTag(index) {
      this.tags.splice(index, 1); // 删除指定索引的标签

      this.$emit("listen", this.tags);
    }
  }
};
</script>

<style scoped>
</style>