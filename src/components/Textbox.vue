<template>
    <div class="flex flex-col mt-4 border border-slate-300 shadow-sm p-4 rounded-xl items-start">
        <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_3">{{name}}</div>
        <input v-model="input" @input="submit" type="text" class="ml-3 border border-main_color_1 rounded-xl shadow-inner h-8 outline-none text-main_color_1 text-center placeholder:text-main_color_1" :style="{width: textWidth}" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
    name: 'Textbox',
    props: [
        "name",
        "textWidth",
        "placeholder"
    ],
    data() {
        return {
            input: null
        }
    },
    methods: {
        submit() {
            if (this.input == null) {
                this.$emit("setTextbox", this.placeholder);
            }
            else {
                this.$emit("setTextbox", this.input);
            }
        },
    }
}
</script>

<style>

</style>