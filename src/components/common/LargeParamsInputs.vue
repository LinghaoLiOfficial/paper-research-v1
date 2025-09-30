<template>
  <div class="p-6 bg-white">
    <div class="flex flex-wrap -mx-3">
      <div v-for="(option, index) in optionList" :key="index" class="w-1/3 px-3 mb-4">
        <div class="flex items-center">
          <label class="w-1/4 text-left font-SiyuanHei-Regular text-neutral_color_4 text-sm italic mr-2 pr-2">{{ option.label }}</label>
          <div class="w-1/2">
            <input
              v-model="option.value"
              @blur="selectOption(option)"
              class="w-full px-2 py-1 text-left placeholder-gray-400 focus:outline-none font-SiyuanHei-Regular text-neutral_color_4 text-sm italic rounded border border-neutral_color_5"
              placeholder="请输入"
            />
          </div>
        </div>
      </div>
      <template v-if="optionList.length % 3 !== 0">
        <div
          v-for="i in 3 - (optionList.length % 3)"
          :key="`placeholder-${i}`"
          class="w-1/3 px-3"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LargeParamsInputs',
  data() {
    return {
      optionList: []
    };
  },
  methods: {
      changeOptions(optionList) {
        this.optionList = optionList;
      },
      selectOption(option) {
        this.$emit("listen", option);
      },
      // 加载默认值
      init(optionDict) {
        for (const [key, value] of Object.entries(optionDict)) {
          const item = this.optionList.find(option => option.name === key);
          if (item) {
            item.value = value;
          }
        }
      },  
    }
};
</script>

<style scoped>
</style>