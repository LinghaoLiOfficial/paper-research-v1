<template>
    <div class=" h-full w-full flex flex-row overflow-x-hidden overflow-y-auto" style="height: 700px;">

        <div class=" h-full w-2/3 flex flex-col">
            <div class=" flex flex-row space-x-4 border border-slate-300 shadow-sm p-3 rounded-xl mx-4 mt-4">
                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">选择数据表的任务类型</div>
                    <Dropdown ref="TrainingHistoryDropdown" @listen="changeTrainingHistoryDropdown"/>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">选择数据表的显示层级</div>
                    <Dropdown ref="TrainingHistoryLevelDropdown" @listen="changeTrainingHistoryLevelDropdown"/>
                </div>
            </div>

            <div class=" h-2/3 flex flex-col m-4">
                <div class=" w-full h-full flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl">
                    <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_3">历史记录</div>
                    <TrainingHistoryTable ref="TrainingHistoryTable" @listen="showHistoryDetail"/>
                </div>
            </div>

            <div class=" flex flex-col mx-4 mb-4">
                <div class=" h-full w-full flex flex-row border space-x-4 border-slate-300 shadow-sm px-3 pb-3 pt-2 rounded-xl">
                    <Button :name="'查看当前参数配置'" :textColor="'text-main_color_1'" :width="'38'" :textSize="'sm'" @listen="activateHyperParams"/>
                    <Button :name="'查看当前图表'" :textColor="'text-main_color_1'" :width="'32'" :textSize="'sm'" @listen="activateVisualize"/>
                    <Button :name="'删除当前任务的所有记录'" :textColor="'text-main_color_1'" :width="'44'" :textSize="'sm'" @listen="activateDeleteHistory"/>
                    <Button :name="'清除所有无效的训练文件'" :textColor="'text-main_color_1'" :width="'44'" :textSize="'sm'" @listen="activateClearFiles"/>
                </div>
            </div>

            <!-- <div class=" flex-1 flex flex-col mx-4 mb-4 overflow-auto">
                <div class=" h-full w-full flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl">
                    <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_3">记录参数</div>
                    <div class=" overflow-auto">
                        <ParamJson :jsonData="historyParams"/>
                    </div>
                </div>
            </div> -->
        </div>

        <div class=" flex-1 flex flex-col my-4 mr-4">
            <div class=" w-full h-full flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl">
                <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_3">记录指标</div>

                <TrainingHistoryDetailTable ref="TrainingHistoryDetailTable"/>
            </div>
        </div>

        <div v-show="isActivate" class=" w-full h-full fixed inset-0 bg-black bg-opacity-50 z-50">
            <div class=" flex h-full w-full items-center justify-center" @click.self="handleClose">
                <div class=" bg-white rounded-lg shadow-2xl p-6 w-10/12 h-5/6 relative">

                <button @click="handleClose" class="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-4">×</button>

                <div class=" mt-6 h-full w-full flex flex-col overflow-auto" style="height: 96%;">
                    <!-- <div class=" absolute top-2 left-4 mt-2 flex flex-row space-x-8">
                        <button @click="generateMD" class=" text-common_color_3 text-sm">
                            ↓ 导出MD文档
                        </button>
                    </div> -->

                    <div class=" mt-12 text-3xl font-semibold mr-10 ml-8 text-common_color_5 mb-8">超参数配置</div>

                    <div class=" mt-6 flex flex-row space-x-4 mb-2 ml-12 mr-12">
                        <div class=" flex flex-col space-y-8" style="width: 80rem;">
                            <ParamJson ref="HyperParamsParamJson" :jsonData="historyParams"/>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import * as da from '@/api/data_analysis'

import Dropdown from '@/components/common/Dropdown.vue';
import TrainingHistoryTable from '@/components/common/TrainingHistoryTable.vue';
import TrainingHistoryDetailTable from '@/components/common/TrainingHistoryDetailTable.vue';
import ParamJson from '@/components/common/ParamJson.vue';
import Button from '@/components/common/Button.vue';

export default {
    name: 'DAModelTrain',

    components: {
        TrainingHistoryTable,
        TrainingHistoryDetailTable,
        ParamJson,
        Button,
        Dropdown
    },

    data() {
        return {
            analysisTaskTypeOptions: [
                {
                    "id": 0,
                    "label": "分类",
                    "name": "classification"
                },
                {
                    "id": 1,
                    "label": "回归",
                    "name": "regression"
                },
            ],
            analysisTasklLevelOptions: [
                {
                    "id": 0,
                    "label": "run",
                    "name": "run"
                },
                {
                    "id": 1,
                    "label": "study",
                    "name": "study"
                },
            ],

            taskType: null,
            taskLevel: null,
            historyParams: {},
            trainingHistoryTableData: [],
            taskId: "",
            studyId: "",
            runId: "",

            isActivate: false,
        }
    },

    mounted() {
        this.getAnalysisTaskTypeOptions();
        this.getAnalysisTaskLevelOptions();
    },

    methods: {
        activateDeleteHistory() {
            this.deleteHistory();
        },
        async deleteHistory() {

            try {

                const resp = await da.deleteHistoryAPI(this.taskType, this.taskId, this.runId);
                const content = resp.data;

                if (content.check) {
                    this.$message.success("删除成功");
                    this.getTrainingHistory();
                }
                else {
                    this.$message.warning("删除失败");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        changeTrainingHistoryDropdown(option) {
            this.taskType = option.name;

            if (this.taskType != null && this.taskLevel != null) {
                this.getTrainingHistory();
            }
        },
        changeTrainingHistoryLevelDropdown(option) {
            this.taskLevel = option.name;

            if (this.taskType != null && this.taskLevel != null) {
                this.getTrainingHistory();
            }
        },
        getAnalysisTaskTypeOptions() {
            this.$refs.TrainingHistoryDropdown.changeOptions(this.analysisTaskTypeOptions);
        },
        getAnalysisTaskLevelOptions() {
            this.$refs.TrainingHistoryLevelDropdown.changeOptions(this.analysisTasklLevelOptions);
        },

        activateHyperParams() {
            this.isActivate = true;
        },
        handleClose() {
            this.isActivate = false;
        },
        activateVisualize() {
            
            this.$router.push({
                path: '/dataAnalysis/dataVisualize', 
                query: { 
                    task_id: this.taskId,
                    run_id: this.runId,
                } 
            });
        },
        showHistoryDetail(row) {
            this.taskId = row[0];
            this.studyId = row[2];
            this.runId = row[3];

            this.getAllTrainingHistory(this.taskId, this.studyId, this.runId);
            this.getHistoryParams(this.taskId, this.studyId, this.runId);
        },

        showHistoryParams(historyParams) {
            historyParams = JSON.parse(historyParams);
            this.historyParams = historyParams;
        },

        async activateClearFiles() {

            try {

                const resp = await da.activateClearFilesAPI(this.taskType);
                const content = resp.data;

                if (content.check) {
                    this.$message.success("无效文件清除成功");
                }
                else {
                    this.$message.warning("无效文件清除失败");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAllTrainingHistory(taskId, studyId, runId) {

            try {

                const resp = await da.getAllTrainingHistoryAPI(this.taskType, taskId, studyId, runId);
                const content = resp.data;

                if (content.check) {
                    this.$refs.TrainingHistoryDetailTable.changeHeadAndBody(content.data.trainingHistory);
                }
                else {
                    this.$message.warning("获取训练历史记录失败");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getTrainingHistory() {

            try {

                const resp = await da.getTrainingHistoryAPI(this.taskType, this.taskLevel);
                const content = resp.data;

                if (content.check) {
                    this.trainingHistoryTableData = content.data.trainingHistory;
                    this.$refs.TrainingHistoryTable.setTableData(this.trainingHistoryTableData);
                }
                else {
                    this.$message.warning("获取训练历史记录失败");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getHistoryParams(taskId, studyId, runId) {
            try {

                const resp = await da.getHistoryParamsAPI(this.taskType, taskId, studyId, runId);
                const content = resp.data;

                if (content.check) {
                    const historyParams = content.data.historyParams;
                    this.showHistoryParams(historyParams);
                }
                else {
                    this.$message.warning("历史记录参数列表获取失败");
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