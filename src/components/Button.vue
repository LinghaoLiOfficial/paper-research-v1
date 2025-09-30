<template>
    <div class="mt-4 h-8 flex">
        <button @click="activate()" class="h-full w-full text-main_color_1 text-sm shadow-sm border border-neutral_color_6 rounded-xl pl-4 pr-4" :style="{width: buttonWidth}">{{name}}</button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: [
        "name",
        "buttonWidth"
    ],
    data() {
        return {

        }
    },
    methods: {
        activate() {
            this.$emit("activate");
        }
    }
}
</script>

<style>

</style>