<template>
  <div class="json-renderer">
    <ul>
      <div v-for="(value, key, index) in jsonData" :key="index">
        <li :class="`pl-${depth * 4} my-1`">
          <!-- 动态生成键名颜色 -->
          <div v-if="Array.isArray(value)">
            <span :style="keyStyle(depth)">- {{ key }}:</span>
            <ul class="pl-4">
              <li v-for="(item, i) in value" :key="i" class="ml-4 italic">
                <template v-if="typeof item === 'object'">
                  <ParamJson :jsonData="item" :depth="depth + 1" />
                </template>
                <template v-else>
                  {{ item }}
                </template>
              </li>
            </ul>
          </div>

          <div v-else-if="typeof value === 'object' && value !== null">
            <span :style="keyStyle(depth)">- {{ key }}:</span>
            <ParamJson class="ml-2" :jsonData="value" :depth="depth + 1" />
          </div>

          <div v-else>
            <span :style="keyStyle(depth)">- {{ key }}:</span>
            <span class="ml-4 italic text-neutral-600">{{ value }}</span>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
// 生成HSL颜色（色相渐变算法）
const generateHslColor = (depth) => {
  const hue = (depth * 45) % 360  // 每层色相差45度
  return `hsl(${hue}, 70%, 45%)`    // 固定饱和度和亮度
}

export default {
  name: 'ParamJson',
  props: {
    jsonData: {
      type: [Object, Array],
      required: true
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 动态生成键名样式
    keyStyle(depth) {
      return {
        color: generateHslColor(depth),
        fontWeight: 600,
        transition: 'color 0.3s ease'  // 添加颜色过渡动画
      }
    }
  }
}
</script>

<style scoped>
.json-renderer {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}
</style>