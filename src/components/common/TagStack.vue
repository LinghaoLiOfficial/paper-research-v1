<template>
<div class="bg-gray-100 rounded-lg p-4 shadow-inner">
    <div class="flex flex-col space-y-3">
    <div 
        v-for="(item, index) in items" 
        :key="index"
        class="bg-white px-4 py-2 rounded-md shadow-sm border-2 flex flex-col space-y-2" 
        :class="getBorderColor(item.value)"
    >
      <div class=" flex justify-between items-center">
        <span class="font-medium text-gray-600">{{ item.value }}</span>
        <span class="ml-4 text-gray-600 flex-1">{{ item.name }}</span>
      </div>

      <span class="ml-10 text-gray-600 flex-1">{{ item.zh_name }}</span>

    </div>
    </div>
</div>
</template>

<script>
const COLOR_PALETTE = [
  'border-common_color_7',
  'border-common_color_6',
  'border-common_color_5',
  'border-common_color_4',
  'border-common_color_3',
  'border-common_color_2',
  'border-common_color_1'
]

export default {
  name: 'TagStack',
  props: {
        items: {
            type: Array,
            default: () => [],
        }
    },
  data() {
    return {
      colorMap: new Map()
    }
  },
  created() {
    this.generateColorMap()
  },
  watch: {
    items() {
      this.generateColorMap()
    }
  },
  methods: {
    generateColorMap() {
      const uniqueValues = [...new Set(this.items.map(i => i.value))]
      this.colorMap = new Map(
        uniqueValues.map((value, index) => [
          value,
          COLOR_PALETTE[index % COLOR_PALETTE.length]
        ])
      )
    },
    getBorderColor(value) {
      return this.colorMap.get(value) || 'border-gray-300'
    }
  }
    
}
</script>