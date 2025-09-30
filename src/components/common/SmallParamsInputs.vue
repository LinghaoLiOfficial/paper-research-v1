<template>
  <div class="p-6 bg-white">
    <div class="flex flex-wrap -mx-3">
      <div v-for="(option, index) in optionList" :key="index" class="w-full px-3 mb-4">
        <div class="flex items-center">
          <label class=" w-32 text-left font-SiyuanHei-Regular text-neutral_color_4 text-sm italic mr-4">{{ option.label }}</label>
          <div class=" w-48">
            <input
              @blur="selectOption(option)"
              v-model="option.value"
              class="w-full px-2 py-1 text-left placeholder-gray-400 focus:outline-none font-SiyuanHei-Regular text-neutral_color_4 text-sm italic rounded border"
              placeholder="请输入"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallParamsInputs',
  data() {
    return {
      optionList: [],
      belongTo: null
    };
  },
  methods: {
    changeOptions(optionList) {
      this.optionList = optionList;
    },
    selectOption(option) {
      option['belongTo'] = this.belongTo;
      this.$emit("listen", option);
    },
    // 加载默认值
    init(optionDict) {
      if (Object.keys(optionDict).length === 0) {
        // 清空默认值
        this.optionList.forEach(option => {
          option.value = '';
        });
      }

      for (const [key, value] of Object.entries(optionDict)) {
        const item = this.optionList.find(option => option.name === key);
        if (item) {
          item.value = value;
        }
      }
    },
    changeBelongTo(belongTo) {
      this.belongTo = belongTo;
    },
    reset() {
      this.optionList = [];
      this.belongTo = null;
    }
  }
};
</script>

<style scoped>
</style>