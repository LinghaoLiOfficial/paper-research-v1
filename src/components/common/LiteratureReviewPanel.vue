<template>
    <div v-show="isActivate" class=" w-full h-full fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class=" flex h-full w-full items-center justify-center" @click.self="handleClose">
        <div class=" bg-white rounded-lg shadow-2xl p-6 w-10/12 h-5/6 relative">

          <button @click="handleClose" class="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-4">×</button>

          <div class=" mt-6 h-full w-full flex flex-col overflow-auto" style="height: 96%;">
            <div class=" absolute top-2 left-4 mt-2 flex flex-row space-x-8">
              <button @click="generateMD" class=" text-common_color_3 text-sm">
                ↓ 导出MD文档
              </button>
            </div>

            <div class=" mt-12 text-3xl font-semibold mr-10 ml-8 text-common_color_3">文献综述报告 (Theme-oriented)</div>

            <div class=" mt-6 flex flex-row space-x-4 mb-2 ml-12 mr-12">
                <div class=" flex flex-col space-y-8" style="width: 80rem;">
                      <MarkdownPreview ref="LRMarkdownPreview"/>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import TagStack from './TagStack.vue';
import SingleTag from './SingleTag.vue';
import AITag from './AITag.vue';
import MarkdownPreview from './MarkdownPreview.vue';

export default {
  name: 'LiteratureReviewPanel',
  data() {
    return {
        isActivate: false,
        data: null
    }
  },
  components: {
    TagStack,
    SingleTag,
    AITag,
    MarkdownPreview
  },
  methods: {
    activate(data) {
        this.isActivate = true;
        this.data = data;
        this.$refs.LRMarkdownPreview.setData(this.data);
    },
    handleClose() {
        this.isActivate = false;
        this.text = "";
        this.$emit('input', false);
    },
    generateMD() {
      this.saveAsMarkdown(this.data);
    },
    // 文件保存方法
    saveAsMarkdown(content) {
      const blob = new Blob([content], { type: 'text/markdown' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `report-${new Date().toISOString().slice(0,10)}.md`;
      link.click();
      URL.revokeObjectURL(link.href);
    },
  }
}
</script>

<style>

</style>