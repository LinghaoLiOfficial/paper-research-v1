<template>
    <div class=" cRowPage">
        <div class=" cBlockSide">
            <div class=" cBlockCol">
                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">创建文件</div>
                    <div class=" flex flex-col items-center">
                        <Button :name="'创建文件夹'" :width="'36'" @listen="activateCreateFolder"/>
                        <InputStrMessageBox :name="'创建文件夹'" ref="docCreateFolderMessageBox" @listen="changeCreateFolder"/>
                        <Button :name="'创建图谱'" :width="'36'" @listen="activateCreateGraph"/>
                        <InputStrMessageBox :name="'创建图谱'" ref="docCreateGraphMessageBox" @listen="changeCreateGraph"/>
                        <Button :name="'创建文档'" :width="'36'" @listen="activateCreateMarkdown"/>
                        <InputStrMessageBox :name="'创建文档'" ref="docCreateMarkdownMessageBox" @listen="changeCreateMarkdown"/>
                    </div>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">上传文件</div>
                    <div class=" flex flex-col items-center">
                        <Dropdown ref="UploadFolderDropdown" @listen="changeUploadFolderDropdown"/>

                        <input type="file" ref="uploadPDFFileInput" multiple accept="application/pdf" style="display: none" @change="handleUploadPDFFileChange" />
                        <Button :name="'上传PDF'" :width="'36'" @listen="activateUploadPDF"/>
                    </div>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">选择空间</div>
                    <Dropdown ref="DocChooseSpaceDropdown" />
                </div>

                <div class=" flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl w-full h-full">
                    <div class=" cSubBlockTitle">空间容量</div>
                    <div class=" flex flex-col items-center">
                        <!-- <CircleProgressor :progress="progressValue" class=" w-10 h-10 mb-4"/> -->
                        <div class=" text-sm">已使用空间大小：{{totalFileSize}}MB</div>
                        <div class=" text-sm">总空间大小：{{authSpaceCapacity}}MB</div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" cBlock">
            <div class=" mt-4 cBlock h-full">
                <Table ref="DocSpaceFilesTable" @listen="gotoNewRoute" @delete="deleteFile"/>
                <ConfirmMessageBox :name="'删除文件'" :strToShow="'删除后，文件将不可恢复。确认删除吗？'" ref="docDeleteFileMessageBox" @listen="changeDocDeleteFileMessageBox"/>
            </div>
        </div>
    </div>
</template>

<script>
import * as kb from '@/api/knowledge_base'

import Button from '@/components/common/Button.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import InputStrMessageBox from '@/components/common/InputStrMessageBox.vue';
import ConfirmMessageBox from '@/components/common/ConfirmMessageBox.vue';
import Table from '@/components/common/Table.vue';
import CircleProgressor from '@/components/common/CircleProgressor.vue';

export default {
    name: 'KBDocManage',
    components: {
        Button,
        Dropdown,
        InputStrMessageBox,
        ConfirmMessageBox,
        Table,
        CircleProgressor
    },
    data() {
        return {
            folderInputs: [
                {
                    "id": 0,
                    "label": "文件名",
                    "name": "fileName",
                    "value": ""
                },
            ],
            graphInputs: [
                {
                    "id": 0,
                    "label": "文件名",
                    "name": "fileName",
                    "value": ""
                },
            ],
            markdownInputs: [
                {
                    "id": 0,
                    "label": "文件名",
                    "name": "fileName",
                    "value": ""
                },
            ],
            docChooseSpaceOptions: [
                {
                    "id": 0,
                    "label": "我的空间",
                    "name": "my_space"
                },
                {
                    "id": 1,
                    "label": "团队空间",
                    "name": "team_space"
                },
            ],

            mySpaceFiles: [],
            mySpaceFilesHeaders: [],
            currentRow: null,
            progressValue: 0,
            authSpaceCapacity: 0,
            totalFileSize: 0,
            uploadFolderOptions: [],
            chooseUploadFolder: null,
            fileId: null,
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$refs.DocChooseSpaceDropdown.changeOptions(this.docChooseSpaceOptions);
            this.$refs.DocChooseSpaceDropdown.init(this.docChooseSpaceOptions[0]["name"]);

            this.docGetMySpaceFiles();
            this.getTotalFileSize();

            this.getUploadFolderOptions();
            
            this.$refs.docCreateFolderMessageBox.changeData(this.folderInputs);
            this.$refs.docCreateGraphMessageBox.changeData(this.graphInputs);
            this.$refs.docCreateMarkdownMessageBox.changeData(this.markdownInputs);
        },

        deleteFile(row) {
            this.currentRow = row;

            this.$refs.docDeleteFileMessageBox.open();
        },

        async getUploadFolderOptions() {
            try {

                const resp = await kb.getUploadFolderOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.uploadFolderOptions = content.data.uploadFolderOptions;

                    this.$refs.UploadFolderDropdown.changeOptions(this.uploadFolderOptions);
                    this.$refs.UploadFolderDropdown.init(this.uploadFolderOptions[0]["name"]);
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getTotalFileSize() {
            try {

                const resp = await kb.getTotalFileSizeAPI();
                const content = resp.data;

                if (content.check) {
                    this.authSpaceCapacity = content.data.authSpaceCapacity;
                    this.totalFileSize = Math.floor(content.data.totalFileSize * 100) / 100;

                    this.progressValue = Math.floor((this.totalFileSize / this.authSpaceCapacity * 100) * 100) / 100;
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async docDeleteFile() {
            try {

                const resp = await kb.docDeleteFileAPI(this.currentRow.file_type, this.currentRow.file_id);
                const content = resp.data;

                if (content.check) {
                    this.$message.success();

                    this.docGetMySpaceFiles();
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        gotoNewRoute(row) {
            if (row.file_type === 'folder') {
                this.fileId = row.file_id;
                this.docGetMySpaceFiles();
                return;
            }

            console.log(row);

            const subRouteDict = {
                "graph": "graphEdit",
                "md": "textEdit",
                "pdf": "pdfView",
            };

            this.$router.push({
                path: `/knowledgeBase/${subRouteDict[row.file_type]}`, 
                query: { 
                    file_id: this.fileId != null ? `${this.fileId}/${row.file_id}` : row.file_id
                } 
            });
        },

        async docGetMySpaceFiles() {
            try {

                const resp = await kb.docGetMySpaceFilesAPI(this.fileId);
                const content = resp.data;

                if (content.check) {
                    this.mySpaceFiles = content.data.mySpaceFiles;
                    this.mySpaceFilesHeaders = content.data.mySpaceFilesHeaders;

                    this.$refs.DocSpaceFilesTable.changeHeaders(this.mySpaceFilesHeaders);
                    this.$refs.DocSpaceFilesTable.changeRows(this.mySpaceFiles);
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async docCreateFile(fileType, fileName) {
            try {

                const resp = await kb.docCreateFileAPI(fileType, fileName);
                const content = resp.data;

                if (content.check) {
                    this.$message.success(content.message);
                    
                    this.docGetMySpaceFiles();
                    this.getUploadFolderOptions();
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async uploadPDFFile(files) {

            const formData = new FormData();
            files.forEach(file => {
                formData.append("files[]", file);
            });
            formData.append("uploadFolder", this.chooseUploadFolder);

            try {

                const resp = await kb.uploadPDFFileAPI(formData);
                const content = resp.data;

                if (content.check) {
                    this.$message.success("上传成功");

                    // 清空input中的文件
                    this.$refs.uploadPDFFileInput.value = null;

                    this.docGetMySpaceFiles();
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        activateCreateFolder() {
            this.$refs.docCreateFolderMessageBox.open();
        },

        activateCreateGraph() {
            this.$refs.docCreateGraphMessageBox.open();
        },

        activateCreateMarkdown() {
            this.$refs.docCreateMarkdownMessageBox.open();
        },

        activateUploadPDF() {
            this.$refs.uploadPDFFileInput.click();
        },

        changeCreateFolder(options) {
            this.docCreateFile("folder", options[0].value);
        },

        changeCreateGraph(options) {
            this.docCreateFile("graph", options[0].value);
        },

        changeCreateMarkdown(options) {
            this.docCreateFile("md", options[0].value);
        },

        handleUploadPDFFileChange(event) {
            const files = Array.from(event.target.files);
            if (files.length === 0) return;
            
            // 批量校验文件类型
            const invalidFiles = files.filter(file => file.type !== "application/pdf");
            if (invalidFiles.length > 0) {
                this.$message.warning("只能上传PDF文件");
                return;
            }
            
            this.uploadPDFFile(files);
        },

        changeDocDeleteFileMessageBox(confirm) {
            if (confirm === true) {
                this.docDeleteFile();
            }
        },

        changeUploadFolderDropdown(option) {
            this.chooseUploadFolder = option.name;
        }

    }
}
</script>

<style>

</style>