<template>
    <div>
        <button class="mt-3" @click="getFile">
            <div class="flex items-center justify-center border-2 rounded-3xl border-main_color_1 p-1 pl-6 pr-6 ">
                <Upload class="h-5 w-5 fill-main_color_1"></Upload>
            </div>
        </button>
        <input type="file" ref="file" style="display: none;" v-on:change="handleFileUpload($event)">
    </div>
</template>

<script>
import * as utils from '@/api/utils/utils'
import Upload from '@/icon/data_analysis_assistance/Upload.vue'

export default {
    name: 'UploadFile',
    components: {
        Upload
    },
    props: [
        "componentType"
    ],
    data() {
        return {
            tableData: {}
        }
    },
    methods: {
        // 打开文件
        getFile () {
            this.$refs.file.click();
        },

        // 获取文件
        handleFileUpload(event){
            // 阻止发生默认行为
            event.preventDefault();
            let file = this.$refs.file.files[0];
            
            if (this.componentType == "table") {
                if (file.type == "text/csv" || file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    this.onUploadTable(file.name, file)
                }
                else {
                    this.$message.warning("只能上传csv或xlsx格式的文件");
                }
            }
            else if (this.componentType == "pdf") {
                if (file.type == "application/pdf") {
                    this.onUploadPDF(file, file.name, file.size, file.type);
                }
                else {
                    this.$message.warning("只能上传pdf格式的文件");
                }
            }
 
        },

        async onUploadPDF(file, file_name, file_size, file_type) {
            try {

                const resp = await utils.uploadFileAPI(file, file_name, file_size, file_type);
                const content = resp.data;

                if (content.check) {
                    this.$message.success("文件上传成功");
                }
                else {
                    this.$message.warning(content.message);
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async onUploadTable(name, file) {
            await axios.post(`${process.env.VUE_APP_FLASK_API}/uploadFile`, {
                f_name: name,
                file: file,
                username: sessionStorage.getItem("username")
		    }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((resp) => {
                let check = resp.data.check;
                if (check) {
                    this.$message.success("上传成功");
                    this.tableData = resp.data;
                    this.$emit("getTableData", this.tableData);
                }
                else {
                    this.$message.warning("上传失败");
                }
            })
            .catch((error) => {
                this.$message.error(error.message);
            })
        },
    }
}
</script>

<style>

</style>