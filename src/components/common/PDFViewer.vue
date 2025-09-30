<template>
  <div class="flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl w-full h-full">
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
      },
      async savePDF() {
          const iframe = this.$refs.iframe;
          console.log(iframe.contentWindow);
          const pdfDocument = iframe.contentWindow.PDFViewerApplication.pdfDocument;
          const data = await pdfDocument.saveDocument();
          const file = new Blob([data], { type: 'application/pdf' });
          
          this.$emit("listen", file);
      }
  }
}
</script>

<style>

</style>