<template>
    <div class=" cRowPage">
        <div class=" cBlockCol w-4/5">
            <div class=" cBlock">
                <div class=" cBlockTitle">工具箱</div>
                <div class=" flex flex-row space-x-8">                
                    <Dropdown ref="docTranslateSourceDropdown" @listen="changeDocTranslateSourceOptions"/>
                </div>
            </div>

            <div class=" cBlock h-full">
                <PDFViewer ref="PDFViewer" @listen="changePDFViewer"></PDFViewer>
            </div>
        </div>


        <div class=" cBlockCol flex-1">
            <textarea v-model="strToTranslate" @blur="changeDocInputTextToTranslate" class="h-1/2 px-2 py-2 rounded-xl text-pretty bg-transparent border border-neutral_color_6 text-neutral_color_2 outline-none text-xs placeholder:text-neutral_color_6 focus:border-main_color_1" type="text" placeholder="←请输入需要翻译的文本"/>
            <span class="h-1/2 py-2 overflow-auto mt-2 pl-2 pr-1 text-balance rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none text-xs">{{translatedStr}}</span>
        </div>
    </div>
</template>

<script>
import * as kb from '@/api/knowledge_base';

import PDFViewer from '@/components/common/PDFViewer.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import Button from '@/components/common/Button.vue';

export default {
    name: 'KBPDFView',
    components: {
        Dropdown,
        PDFViewer,
        Button,
    },
    data() {
        return {
            fileId: null,
            pdfUrl: "",
            objectPDFUrl: "",
            strToTranslate: "",
            translatedStr: "翻译后的文本...",
            translateSource: "",
        }
    },
    beforeDestroy() {
        // 确保组件销毁时释放Blob URL对象
        URL.revokeObjectURL(this.objectPDFUrl);
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.fileId = this.$route.query.file_id;

            this.docLoadPDFFile();

            this.$refs.docTranslateSourceDropdown.changeOptions([
                {
                    "id": 0,
                    "label": "采用【DeepL】翻译",
                    "name": "deepl"
                },
                {
                    "id": 1,
                    "label": "采用【DeepSeek】翻译",
                    "name": "deepseek"
                },
            ]);
            this.$refs.docTranslateSourceDropdown.init("deepseek");
        },
        async docLoadPDFFile() {
            try {

                const resp = await kb.docLoadPDFFileAPI(this.fileId);
                const content = resp.data;

                if (content.check) {
                    this.pdfUrl = content.data.pdfUrl;

                    const resp1 = await kb.getFileAPI(this.pdfUrl);

                    const blob = new Blob([resp1.data], { type: 'application/pdf' });
                    this.objectPDFUrl = URL.createObjectURL(blob);
                    this.$refs.PDFViewer.changefileURL(this.objectPDFUrl);
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        async docTranslateText(strToTranslate) {
            try {

                const resp = await kb.docTranslateTextAPI(strToTranslate, this.translateSource);
                const content = resp.data;

                if (content.check) {
                    this.translatedStr = content.data.translatedStr;
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        async changePDFViewer(file) {

            // 保留2位小数
            const fileSize = parseInt(file.size / 1024 / 1024 * 100 + 1) / 100;

            const formData = new FormData();
            formData.append("file", file);

            formData.append("fileSize", fileSize);

            formData.append("fileId", this.fileId);

            try {

                const resp = await kb.docUpdatePDFFileAPI(formData);
                const content = resp.data;

                if (content.check) {
                    this.$message.success(content.message);
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        changeDocInputTextToTranslate() {
            if (this.strToTranslate === "") {
                this.translatedStr = "翻译后的文本...";
                return;
            }
            this.docTranslateText(this.strToTranslate);
        },
        changeDocTranslateSourceOptions(option) {
            this.translateSource = option.name;
        }
    }
}
</script>

<style>

</style>