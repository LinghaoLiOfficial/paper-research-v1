<template>
  <vue-markdown-preview :text="data" class="preview-only"/>
</template>

<script>
// 正确引入预览组件
import VueMarkdownPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

// 应用主题配置
VueMarkdownPreview.use(vuepressTheme, { 
Prism,
extend(md) {
  // 这里可以保留原有的markdown扩展（如果有）
}
});

export default {
name: "MarkdownPreview",
components: {
  // 正确注册组件（自动转换短横线写法）
  VueMarkdownPreview
},
data() {
  return {
    data: '',
  }
},
methods: {
  setData(data) {
      this.data = data;
  }
}
};
</script>

<style>
/* 保持原有样式增强 */
.preview-only {
padding: 20px;
background: transparent !important;
}

.vuepress-markdown-body h1{ font-size: 28px; }
.vuepress-markdown-body h2{ font-size: 26px; }
.vuepress-markdown-body h3{ font-size: 24px; }
.vuepress-markdown-body h4{ font-size: 22px; }
.vuepress-markdown-body h5{ font-size: 20px; }
</style>