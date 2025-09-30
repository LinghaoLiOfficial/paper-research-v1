<template>
    <div class="mt-2 border border-slate-300 shadow-sm p-6 rounded-xl">
        <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_3">{{name}}</div>
        <div class="flex flex-col items-start justify-center space-y-6 pb-2">
            <ul class="h-10 bg-neutral_color_7 border-1 border-neutral_color_3 rounded-full flex items-center text-pretty">

                <li v-for="(option, i) in mDRadioOptions" :key="i" @click="choose(option)" class="h-full flex items-center cursor-default">
                    <div v-if="mDRadioOption === option" class="h-full flex items-center cursor-default justify-center">
                        <div class="text-neutral_color_9 h-full bg-gradient-to-br from-main_color_1 to-main_color_2 rounded-full flex items-center justify-center pr-4">
                            <Point class="fill-current"></Point>
                            <div class="text-xs -translate-x-1">{{option}}</div>
                        </div>
                    </div>

                    <div v-else class="h-full flex items-center cursor-default justify-center">
                        <div class="text-neutral_color_5 h-full rounded-full flex items-center justify-center hover:text-neutral_color_1 pr-4">
                            <Point class="fill-current"></Point>
                            <div class="text-xs -translate-x-1">{{option}}</div>
                        </div>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import Point from '@/icon/data_analysis_assistance/Point.vue';

export default {
    name: 'MDRadio',
    components: {
        Point,
    },
    props: [
        "name",
        "mDRadioOptions",
    ],
    data() {
        return {
            mDRadioOption: null
        }
    },
    methods: {
        choose(data) {
            this.mDRadioOption = data;
            this.$emit("setMDRadioOption", this.mDRadioOption);
        },
        getMDRadioOption(data) {
            this.mDRadioOption = data;
        },
        clearMDRadioOption() {
            this.mDRadioOption = null;
        }
    }
}
</script>

<style>

</style>