<template>
    <div class="flex flex-col mt-2 border border-slate-300 shadow-sm p-3 rounded-xl">
        <div class="pb-2 text-sm font-SiyuanHei-Regula text-neutral_color_3">{{name}}</div>
        <div class="grid gap-8 grid-cols-6 border border-neutral_color_7 rounded-xl p-2 max-w-screen-lg h-full">
            <label class="flex cursor-pointer" v-for="(option, i) in sMRadioOptions" :key="i">
                <input type="radio" :value="option" v-model="sMRadioOption" class="hidden" @change="choose"/>
                <div class="mr-2 w-4 h-4 rounded-full border transition" :class="[sMRadioOption === option ? 'bg-main_color_1 border border-main_color_1' : 'bg-white border border-neutral_color_6 hover:bg-neutral_color_6']"></div>
                <span class="text-neutral_color_4 text-xs overflow-hidden">{{option}}</span>
            </label>
        </div>
    </div>
</template>

<script>
  export default {
    props: [
        "sMRadioOptions",
        "name"
    ],
    data() {
        return {
            sMRadioOption: null,
        };
    },
    methods: {
        choose() {
            this.$emit("setSMRadioOption", this.sMRadioOption);
        },
        setSMRadioOption(data) {
            this.sMRadioOption = data;
        }
    },
  };
</script>

<style>

</style>
  