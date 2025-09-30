<template>
    <div class=" custom-loading cColPage overflow-y-auto" v-loading="isLoading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading">
        <vue-markdown-editor
        ref="markdownEditor"
        v-model="editor"
        :mode="editorMode"
        left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link code | image save changeMode"
        right-toolbar="preview toc sync-scroll"
        :disabled-menus="[]"
        @upload-image="onUploadImage"
        @save="onSaveContent"
        ></vue-markdown-editor>
    </div>
</template>
  
<script>
import * as kb from '@/api/knowledge_base'

import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

import Dropdown from '@/components/common/Dropdown.vue';
import Button from '@/components/common/Button.vue'

VueMarkdownEditor.use(vuepressTheme, { Prism, extend(md) {} });

export default {
    name: "TE",
    components: {
        VueMarkdownEditor,
        Dropdown,
        Button,
    },
    data() {
      return {
        fileId: null,
        editor: '',
        isLoading: true,

        shouldFullscreen: false,
        editorMode: "editable",

        autoSaveTimer: null
      }
    },
    beforeDestroy() {
        // 组件销毁前清除定时器，防止内存泄漏
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
        }
    },
    mounted() {
        this.fileId = this.$route.query.file_id;

        if (this.$route.query.editor_mode) {
            this.editorMode = this.$route.query.editor_mode;
        }

        this.editLoadMarkdownFile();

        // 默认全屏
        this.$nextTick(() => {
            setTimeout(() => {
                if (this.$refs.markdownEditor) {
                    this.$refs.markdownEditor.fullscreen = true;

                    this.isLoading = false;
                }
            }, 2000);
        });

        // this.autoSaveTimer = setInterval(this.autoSaveMD, 10000);
    },
    methods: {
        autoSaveMD() {
            this.editSaveMarkdownFile(this.editor, false);
        },
        async editLoadMarkdownFile() {
            try {

                const resp = await kb.editLoadMarkdownFileAPI(this.fileId);
                const content = resp.data;

                if (content.check) {
                    this.editor = content.data.content;
                }
                else {
                    this.$message.warning("startWebCrawlRunning");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        async editSaveMarkdownFile(data, isManual) {
            try {

                const resp = await kb.editSaveMarkdownFileAPI(data, this.fileId);
                const content = resp.data;

                if (content.check) {
                    if (isManual) this.$message.success("已自动保存");
                }
                else {
                    this.$message.warning("startWebCrawlRunning");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        async edituploadMarkdownImage(formData, insertImage) {

            formData.append('fileId', this.fileId);

            try {

                const resp = await kb.uploadMarkdownImageAPI(formData);
                const content = resp.data;

                if (content.check) {
                    const imageUrl = content.data.imageUrl;

                    insertImage({
                        url: `${process.env.VUE_APP_FLASK_API}${imageUrl}`,
                        desc: formData.get('image').name,
                        width: 'auto',
                        height: 'auto',
                    })
                }
                else {
                    this.$message.warning("startWebCrawlRunning");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        onUploadImage(event, insertImage, files) {
            const file = files[0];

            let formData = new FormData();
            formData.append('image', file);

            this.edituploadMarkdownImage(formData, insertImage);
        },
        onSaveContent(content) {
            this.editSaveMarkdownFile(content, true);
        },
        changeEditMyFilesButton() {
            if (this.switchTo === "预览") {
                
                this.switchTo = "编辑";
            }
            else {
                this.switchTo = "预览";
            }
        }
    }
};
</script>
<style>
    .vuepress-markdown-body h1{ font-size: 28px; }
    .vuepress-markdown-body h2{ font-size: 26px; }
    .vuepress-markdown-body h3{ font-size: 24px; }
    .vuepress-markdown-body h4{ font-size: 22px; }
    .vuepress-markdown-body h5{ font-size: 20px; }
    .vuepress-markdown-body:not(.custom){padding: 5px 10px!important;}
</style>
