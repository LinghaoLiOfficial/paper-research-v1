<template>
    <div class=" h-full w-full flex flex-col">
        <div class=" w-full min-h-16 bg-neutral-900 flex flex-row items-center space-x-2">

            <div class=" text-white text-sm ml-12">当前应用 :</div>

            <div class=" flex flex-row space-x-4">
                <div class="relative inline-block w-72">
                    <button @click="toggleIsOpen" class="w-full pl-3 pr-10 py-2 text-left focus:outline-none">
                        <span class="block truncate font-SiyuanHei-Regula text-neutral-200 text-xs">{{ currentOption ? currentOption.label : optionList.length > 0 ? "请选择" : "--" }}</span>
                        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg class="h-6 w-6 text-neutral-200 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        </span>
                    </button>

                    <div v-if="isOpen" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                        <ul class="max-h-60 rounded-md overflow-auto focus:outline-none text-xs">
                            <li v-for="option in optionList" :key="option.id" @click="selectOption(option)" class="cursor-pointer select-none relative py-2 pl-3 pr-9 text-neutral_color_4 text-xs hover:bg-main_color_1 hover:text-white first:rounded-md first:rounded-b-none last:rounded-md last:rounded-t-none">
                                <router-link :to="`${option.route}`">
                                    <span class="block truncate">{{ option.label }}</span>
                                    <span v-if="currentOption && currentOption.name === option.name" class="absolute inset-y-0 right-0 flex items-center pr-4 text-main_color_1">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class=" flex flex-row space-x-6 items-center absolute right-44">
                <div class=" text-white text-sm ml-12 border border-white rounded-md px-2 py-1">{{userAuth}}</div>
                <span class="block truncate font-SiyuanHei-Regula text-neutral-200 text-sm font-semibold pr-12">{{username}}</span>
                <Head class=" w-8 h-8"/>
            </div>

        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import * as login from '@/api/login'

import Head from '@/icon/login/Head.vue';

export default {
    name: 'TopNavigator',
    components: {
        Head
    },
    data() {
        return {
            optionList: [
                {
                    "id": 0,
                    "label": "【Graph-MD-PDF】知识管理互连应用",
                    "name": "knowledgeBase",
                    "route": "/knowledgeBase"
                },
                {
                    "id": 1,
                    "label": "【论文-主题短语】知识网络构建与分析",
                    "name": "scienceResearch",
                    "route": "/scienceResearch"
                },
                {
                    "id": 2,
                    "label": "【深度学习-机器学习】数据分析全流程实验",
                    "name": "dataAnalysis",
                    "route": "/dataAnalysis"
                },
            ],

            currentOption: null,
            isOpen: false,

            username: null,
            userAuth: null
        }
    },

    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    mounted() {
        document.addEventListener('click', this.handleClickOutside);

        this.init(this.$route.path.split("/")[1] || "knowledgeBase");

        this.getUserInfo();
    },

    methods: {

        async getUserInfo() {
            try {

                const resp = await login.getUserInfoAPI();
                const content = resp.data;

                if (content.check) {
                    this.username = content.data.username;
                    this.userAuth = content.data.userAuth;
                }
                else {
                    this.$message.warning("getUserInfo");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
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
}
</script>

<style>

</style>