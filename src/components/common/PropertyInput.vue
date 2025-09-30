<template>
    <div class=" mt-4 flex flex-row items-center space-x-4">
        <div class=" text-xs font-SiyuanHei-Regula text-main_color_1 italic">{{name}}</div>
        <input v-model="propertyValue" @input="submit" :placeholder="defaultPropertyValue" type="text" class=" w-14 h-5 border border-main_color_1 rounded-xl shadow-inner outline-none text-main_color_1 text-center text-xs placeholder:text-main_color_1">
    </div>
</template>

<script>
export default {
    name: 'PropertyInput',
    
    data() {
        return {
            propertyValue: '',
            defaultPropertyValue: ''
        }
    },

    props: [
        "name"
    ],

    methods: {
        changeDefaultPropertyValue(defaultPropertyValue) {
            this.defaultPropertyValue = defaultPropertyValue;
        },

        submit() {
            this.$emit("listen", this.propertyValue);
        }
    }
}
</script>

<style>

</style>