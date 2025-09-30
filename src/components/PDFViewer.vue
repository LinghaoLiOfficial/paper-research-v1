<template>
    <div class="flex flex-col mt-2 border border-slate-300 shadow-sm p-3 rounded-xl w-full h-full">
        <iframe ref="iframe" :src="fileURL" class=" h-full w-full" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: "PDFViewer",

    data() {
        return {
            fileURL: ""
        }
    },

    methods: {
        changefileURL(fileURL) {
            this.fileURL = fileURL;
        }
    }
}
</script>

<style>

</style>
