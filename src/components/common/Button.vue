<template>
    <div class=" mt-2 h-8 flex">
        <button @click="activate()" :class="` ${textColor} text-${textSize} shadow-sm border border-neutral_color_6 rounded-xl pl-4 pr-4 w-${width}`">{{name}}</button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: [
        "name",
        "width",
        "textSize",
        "textColor"
    ],
    data() {
        return {

        }
    },
    methods: {
        activate() {
            this.$emit("listen");
        }
    }
}
</script>

<style>

</style>