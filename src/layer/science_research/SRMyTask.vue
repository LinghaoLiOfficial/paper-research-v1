<template>
    <div class=" cRowPage">
        <div class=" cBlockSide">
            <div class=" cBlockCol">
                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">选择功能</div>
                    <div class=" flex flex-col items-center">
                        <Button :name="'新建检索式任务'" :textColor="'text-common_color_3'" :width="'40'" @listen="createNewTask"/>
                        <InputStrMessageBox :name="'新建检索式任务'" ref="createNewTaskMessageBox" @listen="changeCreateNewTaskMessageBox"/>
                        
                        <Button :name="'新建解析式任务'" :textColor="'text-common_color_3'" :width="'40'" @listen="createNewParsingTask"/>
                        <InputStrMessageBox :name="'新建解析式任务'" ref="createNewParsingTaskMessageBox" @listen="changeCreateNewParsingTaskMessageBox"/>
                    </div>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">选择空间</div>
                    <Dropdown ref="ChooseSpaceDropdown" @listen="changeChooseSpaceDropdown"/>
                </div>

                <div class=" flex flex-col items-center justify-center space-y-4">
                    <div class=" w-72 flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl h-48 pt-3 items-center">
                        <CircleProgressor ref="taskTotalCircleProgressor" :circleColor="'common_color_3'" class=" w-12 mb-1"/>
                        <div class="font-medium text-sm text-neutral-700">{{ taskProgress['current_task_name'] || '' }}</div>
                        <div class="font-medium text-sm text-neutral-700">{{ taskProgress['current_stage'] || '' }}</div>
                    </div>

                    <div class=" w-72 flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl space-y-2 overflow-y-auto max-w-full h-40">
                        <div v-for="(item, index) in taskProgress['log']" :key="index" class=" flex flex-row space-x-4">                            
                            <p class=" w-20 text-xs text-gray-700">{{item['timestamp']}}</p>
                            <p class=" text-xs text-gray-700">{{item['message']}}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class=" cBlock">
            <div class=" cBlock h-full">
                <TaskTable ref="spaceTasksTable" @listen="gotoNewRoute" @delete="deleteTask" @retry="retryTask"/>
                <ConfirmMessageBox :name="'删除任务'" :strToShow="'删除后，任务将不可恢复。确认删除吗？'" ref="taskDeleteTaskMessageBox" @listen="changetaskDeleteTaskMessageBox"/>
            </div>
        </div>
    </div>
</template>

<script>
import * as sr from '@/api/science_research';

import Button from '@/components/common/Button.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import InputStrMessageBox from '@/components/common/InputStrMessageBox.vue';
import ConfirmMessageBox from '@/components/common/ConfirmMessageBox.vue';
import TaskTable from '@/components/common/TaskTable.vue';
import CircleProgressor from '@/components/common/CircleProgressor.vue';

export default {
    name: 'SRMyTask',
    components: {
        Button,
        Dropdown,
        InputStrMessageBox,
        ConfirmMessageBox,
        TaskTable,
        CircleProgressor
    },
    data() {
        return {
            chooseSpaceOptions: [
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

            createTaskInputs: [
                {
                    "id": 0,
                    "label": "领域关键词",
                    "name": "fieldKeywords",
                    "value": ""
                },
                {
                    "id": 1,
                    "label": "检索论文数量",
                    "name": "paperNum",
                    "value": ""
                },
                {
                    "id": 2,
                    "label": "任务名称",
                    "name": "taskName",
                    "value": ""
                }
            ],

            createParsingTaskInputs: [
                {
                    "id": 0,
                    "label": "领域关键词",
                    "name": "fieldKeywords",
                    "value": ""
                },
                {
                    "id": 1,
                    "label": "检索论文pdf文件夹名称",
                    "name": "folderFileId",
                    "value": ""
                },
                {
                    "id": 2,
                    "label": "任务名称",
                    "name": "taskName",
                    "value": ""
                }
            ],

            mySpaceTasks: [],
            mySpaceTasksHeaders: [],
            currentRow: null,

            taskProgress: {},

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
        this.$refs.ChooseSpaceDropdown.changeOptions(this.chooseSpaceOptions);
        this.$refs.ChooseSpaceDropdown.init(this.chooseSpaceOptions[0]["name"]);

        this.$refs.createNewTaskMessageBox.changeData(this.createTaskInputs);
        this.$refs.createNewParsingTaskMessageBox.changeData(this.createParsingTaskInputs);

        this.getMySpaceTasks();
        this.getTaskProgress();
        
        this.autoExecuteTimer = setInterval(this.autoExecute, 3000);
    },
    methods: {

        autoExecute() {
            this.getMySpaceTasks();
            this.getTaskProgress();
        },

        async getTaskProgress() {
            try {

                const resp = await sr.getTaskProgressAPI();
                const content = resp.data;

                if (content.check) {
                    this.taskProgress = content.data.taskProgress;

                    this.$refs.taskTotalCircleProgressor.updateProgress(this.taskProgress['total_progress']['now']);
                }
                else {
                    this.$message.warning("getTaskProgress");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        changeCreateNewTaskMessageBox(taskParams) {
            this.startCreateKnowledgeGraph(taskParams, 'retrieval');
        },

        changeCreateNewParsingTaskMessageBox(taskParams) {
            this.startCreateKnowledgeGraph(taskParams, 'parsing');
        },

        createNewTask() {
            this.$refs.createNewTaskMessageBox.open();
        },

        createNewParsingTask() {
            this.$refs.createNewParsingTaskMessageBox.open();
        },

        changeChooseSpaceDropdown(option) {
            if (option.name === 'team_space') {
                this.$message.warning("此功能暂未开放，敬请期待");
                this.$refs.ChooseSpaceDropdown.init(this.chooseSpaceOptions[0]["name"]);
            }
        },

        async startCreateKnowledgeGraph(taskParams, taskType) {
            try {

                const resp = await sr.startCreateKnowledgeGraphAPI(taskParams, taskType);
                const content = resp.data;

                if (content.check) {

                    this.$message.success(content.message);
                }
                else {
                    this.$message.warning(content.message);
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        deleteTask(row) {
            this.currentRow = row;

            this.$refs.taskDeleteTaskMessageBox.open();
        },

        retryTask(row) {
            this.currentRow = row;

            this.taskRetryTask();
        },

        async taskRetryTask() {
            try {

                const resp = await sr.taskRetryTaskAPI(this.currentRow.task_id);
                const content = resp.data;

                if (content.check) {
                    this.$message.success(content.message);

                    this.getMySpaceTasks();
                }
                else {
                    this.$message.warning(content.message);
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async taskDeleteTask() {
            try {

                const resp = await sr.taskDeleteTaskAPI(this.currentRow.task_id);
                const content = resp.data;

                if (content.check) {
                    this.$message.success("删除成功");

                    this.getMySpaceTasks();
                }
                else {
                    this.$message.warning(content.message);
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        gotoNewRoute(row) {

            if (row.task_status != "completed") {
                this.$message.warning("该任务尚未完成");
                return;
            }

            this.$router.push({
                path: '/scienceResearch/networkAnalysis', 
                query: { 
                    task_id: row.task_id
                } 
            });
        },

        async getMySpaceTasks() {
            try {

                const resp = await sr.getMySpaceTasksAPI();
                const content = resp.data;

                if (content.check) {
                    this.mySpaceTasks = content.data.mySpaceTasks;
                    this.mySpaceTasksHeaders = content.data.mySpaceTasksHeaders;

                    this.$refs.spaceTasksTable.changeHeaders(this.mySpaceTasksHeaders);
                    this.$refs.spaceTasksTable.changeRows(this.mySpaceTasks);
                }
                else {
                    this.$message.warning("getMySpaceTasks");
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
                    
                    this.getMySpaceTasks();
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        changetaskDeleteTaskMessageBox(confirm) {
            if (confirm === true) {
                this.taskDeleteTask();
            }
        }

    }
}
</script>

<style>

</style>