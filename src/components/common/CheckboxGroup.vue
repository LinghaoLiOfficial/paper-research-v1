<template>
    <div v-if="optionList.length > 0" class="flex flex-row p-2 space-x-16">
        <div
            v-for="option in optionList"
            :key="option.id"
            class="flex items-center ml-1 mt-2"
        >
            <label
                @click="toggleOption(option)"
                class="cursor-pointer flex items-center"
            >
                <div
                    class="mr-2 w-4 h-4 rounded-full border transition"
                    :class="[
                        currentOptions.includes(option)
                            ? 'bg-main_color_1 border-main_color_1'
                            : 'bg-white border-neutral_color_6 hover:bg-neutral_color_6',
                    ]"
                ></div>
                <span
                    class=" w-24"
                    :class="[
                        currentOptions.includes(option)
                            ? 'text-main_color_1 font-semibold text-xs'
                            : 'text-neutral_color_4 text-xs',
                    ]"
                >
                    {{ option.label }}
                </span>
            </label>
            <input
                v-if="option.value !== undefined"
              @blur="changeOption(option)"
              v-model="option.value"
              class=" ml-1 w-12 px-2 py-1 text-left placeholder-gray-400 focus:outline-none font-SiyuanHei-Regular text-neutral_color_4 text-sm italic rounded border"
              placeholder="请输入"
            />
        </div>
    </div>
</template>
  
<script>
export default {
    name: "CheckboxGroup",  
    data() {
      return {
        optionList: [],
        currentOptions: []
      };
    },
    props: {
        isMultiSelect: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        changeOptions(optionList) {
            this.optionList = optionList;
        },
        toggleOption(option) {
            if (this.currentOptions.includes(option)) {
                this.currentOptions = this.currentOptions.filter(
                    (item) => item.id !== option.id
                );
            } else {
                if (this.isMultiSelect) {
                    this.currentOptions.push(option);
                } 
                else {
                    this.currentOptions = [option];
                }
            }
  
            this.$emit("listen", option);
        },
        init(options) {
            const processData = (a, b) => {
                return a.filter(itemA => {
                    const matchedB = b.find(itemB => itemB.name === itemA.name);
                    if (matchedB) {
                        // 使用$set确保value属性响应式
                        if (matchedB.value !== undefined) {
                            this.$set(itemA, 'value', matchedB.value);
                        }
                        return true; // 保留匹配项
                    }
                    return false;
                });
            };

            this.currentOptions = processData(this.optionList, options);
        },
        changeOption(option) {
            this.$emit("changeCheckboxValue", option);
        },
    },
};
</script>
  
<style>

</style>