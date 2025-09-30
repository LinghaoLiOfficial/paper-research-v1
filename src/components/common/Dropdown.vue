<template>
    <div class=" flex flex-row space-x-4">
        <div class="mt-2 relative inline-block w-64">
            <button @click="toggleIsOpen" class="w-full bg-white border border-slate-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-main_color_1 focus:border-main_color_1">
                <span class="block truncate font-SiyuanHei-Regula text-neutral_color_4 text-xs">{{ currentOption ? currentOption.label : optionList.length > 0 ? "请选择" : "--" }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                </span>
            </button>

            <div v-if="isOpen" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                <ul class="max-h-60 rounded-md overflow-auto focus:outline-none text-xs">
                    <li v-for="option in optionList" :key="option.id" @click="selectOption(option)" class="cursor-pointer select-none relative py-2 pl-3 pr-9 text-neutral_color_4 text-xs hover:bg-main_color_1 hover:text-white first:rounded-md first:rounded-b-none last:rounded-md last:rounded-t-none">
                    <span class="block truncate">{{ option.label }}</span>
                    <span v-if="currentOption && currentOption.name === option.name" class="absolute inset-y-0 right-0 flex items-center pr-4 text-main_color_1">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dropdown',

    data() {
        return {
            optionList: [],

            currentOption: null,
            isOpen: false
        };
    },

    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },

    methods: {

        changeOptions(optionList) {
            this.optionList = optionList;
        },

        toggleIsOpen() {
            this.isOpen = !this.isOpen;
        },

        selectOption(option) {
            this.currentOption = option;
            this.isOpen = false;

            this.$emit("listen", this.currentOption);
        },

        handleClickOutside(event) {
            if (this.$el && !this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        },

        // 加载默认值
        init(option) {
            this.selectOption(this.optionList.find(x => x.name === option));
        },  
    }
};
</script>

<style scoped>

</style>
  