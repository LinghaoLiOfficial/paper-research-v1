<template>
    <div class=" cColPage overflow-y-auto">

        <div class=" cBlock">
            <div class=" cBlockName">论文知识网络构建监控功能</div>
            <ShowTable ref="KnowledgeGraphTable"/>
            <div class=" mt-4">
                <Button :name="'一键终止所有任务'" :width="'48'" @listen="activateCancelAllTasks"/>
            </div>
        </div>

        <div class=" cBlock">
            <div class=" cBlockName">激活码获取功能</div>
            <ShowTable ref="ActivationTable"/>
            <div class=" mt-4">
                <Button :name="'批量添加激活码'" :width="'48'" @listen="activateAddActivationCode"/>
            </div>
        </div>

    </div>
</template>

<script>
import * as login from '@/api/login'

import ShowTable from '@/components/common/ShowTable.vue';
import Button from '@/components/common/Button.vue';

export default {
    name: 'Admin',
    components: {
        ShowTable,
        Button
    },
    data() {
        return {
            activationCodes: [],
            activationCodesHeaders: [],

            knowledgeGraphTasks: [],
            knowledgeGraphTasksHeaders: [],

            autoExecuteTimer: null
        }
    },
    beforeDestroy() {
        // 组件销毁前清除定时器，防止内存泄漏
        if (this.autoExecuteTimer) {
            clearInterval(this.autoExecuteTimer);
        }
    },
    mounted() {
        this.getAllActivationCode();
        this.getAllKnowledgeGraphTask();

        this.autoExecuteTimer = setInterval(this.autoExecute, 5000);
    },
    methods: {
        autoExecute() {
            this.getAllActivationCode();
            this.getAllKnowledgeGraphTask();
        },

        activateAddActivationCode() {
            this.addNewActivationCode();
        },

        activateCancelAllTasks() {
            this.cancelAllTasks();
        },

        async cancelAllTasks() {
            try {

                const resp = await login.cancelAllTasksAPI();
                const content = resp.data;

                if (content.check) {
                    this.$message.success("终止成功");
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAllKnowledgeGraphTask() {
            try {

                const resp = await login.getAllKnowledgeGraphTaskAPI();
                const content = resp.data;

                if (content.check) {
                    this.knowledgeGraphTasks = content.data.knowledgeGraphTasks;
                    this.knowledgeGraphTasksHeaders = content.data.knowledgeGraphTasksHeaders;

                    this.$refs.KnowledgeGraphTable.changeHeaders(this.knowledgeGraphTasksHeaders);
                    this.$refs.KnowledgeGraphTable.changeRows(this.knowledgeGraphTasks);
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAllActivationCode() {
            try {

                const resp = await login.getAllActivationCodeAPI();
                const content = resp.data;

                if (content.check) {
                    this.activationCodes = content.data.activationCodes;
                    this.activationCodesHeaders = content.data.activationCodesHeaders;

                    this.$refs.ActivationTable.changeHeaders(this.activationCodesHeaders);
                    this.$refs.ActivationTable.changeRows(this.activationCodes);
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        async addNewActivationCode() {
            try {

                const resp = await login.addNewActivationCodeAPI();
                const content = resp.data;

                if (content.check) {
                    this.$message.success("新增成功");
                    this.getAllActivationCode();
                }
                else {
                    this.$message.warning("docGetMySpaceFiles");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
    }
}
</script>

<style>

</style>