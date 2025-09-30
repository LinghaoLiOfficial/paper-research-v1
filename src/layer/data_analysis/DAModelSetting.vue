<template>
    <div class=" cColPage">

        <div class=" flex flex-col w-full space-y-4 overflow-auto" style="height: 660px;">

            <div class=" cBlock">
                <div class=" cBlockTitle">模型选择</div>
                <div class=" cBlockRow">
                    <div class=" cSubBlock">
                        <div class=" cSubBlockTitle">选择模板</div>
                        <TagGroup ref="AnalysisPatternTagGroup" @listen="changeAnalysisPatternTagGroup"/>
                        <Dropdown ref="AnalysisPatternDropdown" @listen="changeAnalysisPattern"/>
                        <div class=" flex flex-row justify-center">
                            <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisPatternButton"/>
                        </div>
                    </div>

                    <div class=" cSubBlock">
                        <div class=" cSubBlockTitle">选择模型类型</div>
                        <TagGroup ref="AnalysisDataSetTagGroup" @listen="changeAnalysisDataSetTagGroup"/>
                        <Dropdown ref="AnalysisModelTypeDropdown" @listen="changeAnalysisModelType"/>
                        <Dropdown ref="AnalysisModelDropdown" @listen="changeAnalysisModel"/>
                        <div class=" flex flex-row justify-center">
                            <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisModelButton"/>
                        </div>
                    </div>

                    <div class=" cSubBlock">
                        <div class=" flex flex-row">
                            <div class=" cSubBlockTitle">超参数优化</div>
                            <Switcher class=" ml-auto" ref="AnalysisHyperParamsSwitcher" @listen="changeAnalysisHyperParamsSwitcher"/>
                        </div>
                        <TagGroup ref="AnalysisHyperParamsTagGroup" @listen="changeAnalysisHyperParamsTagGroup"/>
                        <Dropdown ref="AnalysisHyperParamsDropdown" @listen="changeAnalysisHyperParamsDropdown"/>
                        <ParamsInputs ref="AnalysisHyperParamsInputs" @listen="changeAnalysisHyperParamsInputs"/>
                        <div class=" flex flex-row justify-center">
                            <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisHyperParamsButton"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" cBlock">
                <div class=" cBlockTitle">模型信息</div>
                
                <div class=" cBlockCol">
                    <div v-for="block in modelInfo" :key="block.id" class=" cBlock">
                        <div class=" cSubBlockTitle">{{block.label}}</div>
                        <TagGroup :ref="`ModelInfoTagGroup_${block.id}`" @listen="(list) => changeModelInfoTagGroup(list, block)"/>
                        <Dropdown :ref="`ModelInfoDropdown_${block.id}`" @listen="(option) => changeModelInfoDropdown(option, block)"/>
                        <ParamsInputs :ref="`ModelInfoInputs_${block.id}`" @listen="(option) => changeModelInfoInputs(option, block)"/>
                        <div class=" flex flex-row justify-center">
                            <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickModelInfoButton(block)"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" cBlock">
                <div class=" cBlockTitle">配置超参数</div>
                <div class=" cBlockTitle italic pl-8">提示：多个值请用英文逗号分割</div>
                <div class=" cBlockCol">
                    <LargeParamsInputs ref="AnalysisParamsInputs" @listen="changeAnalysisParamsInputs"/>
                </div>
            </div>

            <div class=" cBlock">
                <div class=" cBlockTitle">控制命令</div>
                <div class=" cBlockRow">
                    <Button :name="'运行'" :textColor="'text-main_color_1'" :width="'20'" :textSize="'sm'" @listen="activateTaskNameMessageBox"/>
                    <Button :name="'终止'" :textColor="'text-main_color_1'" :width="'20'" :textSize="'sm'"/>
                </div>
            </div>

            <div class=" cBlock">
                <div class=" cBlockTitle">训练进程</div>
            </div>

        </div>

        <StartTrainingModelMessageBox ref="StartTrainingModelMessageBox" @listen="changeStartTrainingModelMessageBox"/>

    </div>
</template>

<script>
import * as da from '@/api/data_analysis'

import Dropdown from '@/components/common/Dropdown.vue';
import ParamsInputs from '@/components/common/SmallParamsInputs.vue';
import Button from '@/components/common/Button.vue';
import TagGroup from '@/components/common/TagGroup.vue';
import LargeParamsInputs from '@/components/common/LargeParamsInputs.vue';
import StartTrainingModelMessageBox from '@/components/common/StartTrainingModelMessageBox.vue';
import Switcher from '@/components/common/Switcher.vue';

export default {
    name: 'DAModelSetting',
    components: {
        Dropdown,
        LargeParamsInputs,
        ParamsInputs,
        Button,
        TagGroup,
        StartTrainingModelMessageBox,
        Switcher
    },
    data() {
        return {
            analysisModelTypeOptions: [],
            analysisModelOptions: [],
            modelInfo: [],

            modelName: null,
            modelComponent: null,
            taskName: "",
            taskNames: [],

            analysisHyperParamsOptions: [],
            analysisHyperParamsOptimize: null,
            analysisPatternOptions: [],
            taskPattern: null
        }
    },
    mounted() {
        this.checkConfig();

        this.getAnalysisModelTypeOptions();

        this.getAnalysisParams();

        this.getTaskNames();

        this.getAnalysisHyperParamsOptions();

        this.getAnalysisPatternOptions();
    },
    methods: {
        getLabelList(sourceList, targetList) {
            const list = [];
            sourceList.forEach(x => {
                list.push(targetList.find(option => option.name === x).label);
            });
            return list;
        },
        getNameList(sourceList, targetList) {
            const list = [];
            sourceList.forEach(x => {
                list.push(targetList.find(option => option.label === x).name);
            });
            return list;
        },
        transformParamsInputData(data) {
            const result = {};
            data.forEach(item => {
                result[item.name] = item.value;
            });
            return result;
        },
        getModelParamStr(start, end, type) {
            return `${start}~${end}(${type})`;
        },
        parseModelParamStr(str) {
            // 使用正则表达式匹配字符串
            const regex = /^(\d+)~(\d+)\((\w+)\)$/;
            const match = str.match(regex);

            if (!match) {
                throw new Error('Invalid input string format');
            }

            // 返回解析后的结果
            return {
                start: parseInt(match[1]), // 解析 start 为数字
                end: parseInt(match[2]),   // 解析 end 为数字
                type: match[3]                 // type 是字符串
            };
        },
        getDataAnalysisConfig() {
            return JSON.parse(localStorage.getItem("dataAnalysisConfig"));
        },
        setDataAnalysisConfig(dataAnalysisConfig) {
            localStorage.setItem("dataAnalysisConfig", JSON.stringify(dataAnalysisConfig));
        },
        checkConfig() {
            if (this.getDataAnalysisConfig() == null) {
                this.$router.push("/dataAnalysis/dataSetting");
                return;
            }
        },

        async getAnalysisHyperParamsOptions() {
            try {

                const resp = await da.getAnalysisHyperParamsOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisHyperParamsOptions = content.data.analysisHyperParamsOptions;

                    this.$refs.AnalysisHyperParamsDropdown.changeOptions(this.analysisHyperParamsOptions);
                    this.$refs.AnalysisHyperParamsSwitcher.init(
                        this.getDataAnalysisConfig().data_setting.hyper_params_optimize_mark
                    );
                    this.$refs.AnalysisHyperParamsTagGroup.changeData(
                        this.getLabelList(this.getDataAnalysisConfig().data_setting.hyper_params_optimize, this.analysisHyperParamsOptions)
                    );

                    this.$refs.AnalysisHyperParamsInputs.changeOptions([
                        {
                            "id": 0,
                            "label": "超参数优化次数",
                            "name": "optimize_trials",
                        }
                    ]);
                    this.$refs.AnalysisHyperParamsInputs.init(
                        {
                            "optimize_trials": this.getDataAnalysisConfig().data_setting.hyper_params_optimize_trials
                        }
                    );
                }
                else {
                    this.$message.warning("getAnalysisNullValueOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        changeAnalysisHyperParamsSwitcher(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.hyper_params_optimize_mark = option;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisHyperParamsDropdown(option) {
            this.analysisHyperParamsOptimize = option ? option.name : null;
        },

        clickAnalysisHyperParamsButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.hyper_params_optimize.push(this.analysisHyperParamsOptimize);
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisHyperParamsTagGroup.changeData(
                this.getLabelList(this.getDataAnalysisConfig().data_setting.hyper_params_optimize, this.analysisHyperParamsOptions)
            );
        },

        changeAnalysisHyperParamsTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.hyper_params_optimize = this.getNameList(list, this.analysisHyperParamsOptions);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisPatternTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.task_pattern = this.getNameList(list, this.analysisPatternOptions);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisHyperParamsInputs(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.hyper_params_optimize_trials = parseInt(option.value);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        async getTaskNames() {
            try {

                const resp = await da.getTaskNamesAPI(this.taskType);
                const content = resp.data;

                if (content.check) {
                    this.taskNames = content.data.taskNames;
                }
                else {
                    this.$message.warning("getAnalysisParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisParams() {
            try {

                const resp = await da.getAnalysisParamsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisParams = content.data.analysisParams;

                    this.$refs.AnalysisParamsInputs.changeOptions(this.analysisParams);

                    // 将对象中值的数组转换为以逗号分隔的字符串
                    let task_params_obj = this.getDataAnalysisConfig().data_setting.task_params;
                    task_params_obj = Object.keys(task_params_obj).reduce((acc, key) => {
                        acc[key] = task_params_obj[key].join(',');
                        return acc;
                    }, {});

                    this.$refs.AnalysisParamsInputs.init(
                        task_params_obj
                    );
                }
                else {
                    this.$message.warning("getAnalysisParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisPatternOptions() {
            try {

                const resp = await da.getAnalysisPatternOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisPatternOptions = content.data.analysisHyperParamsOptions;

                    this.$refs.AnalysisPatternDropdown.changeOptions(this.analysisPatternOptions);
                    this.$refs.AnalysisPatternTagGroup.changeData(
                        this.getLabelList([this.getDataAnalysisConfig().data_setting.task_pattern], this.analysisPatternOptions)
                    );
                }
                else {
                    this.$message.warning("getAnalysisModelTypeOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisModelTypeOptions() {
            try {

                const resp = await da.getAnalysisModelTypeOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisModelTypeOptions = content.data.analysisModelTypeOptions;

                    this.$refs.AnalysisModelTypeDropdown.changeOptions(this.analysisModelTypeOptions);
                    
                    this.$refs.AnalysisDataSetTagGroup.changeData(
                        Object.keys(this.getDataAnalysisConfig().model_setting)
                    );
                }
                else {
                    this.$message.warning("getAnalysisModelTypeOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisModelOptions(modelType) {
            try {

                const resp = await da.getAnalysisModelOptionsAPI(modelType);
                const content = resp.data;

                if (content.check) {
                    this.analysisModelOptions = content.data.analysisModelOptions;

                    this.$refs.AnalysisModelDropdown.changeOptions(this.analysisModelOptions);
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisModelInfo(model) {
            try {

                const resp = await da.getAnalysisModelInfoAPI(model);
                const content = resp.data;

                if (content.check) {
                    this.modelInfo = content.data.modelInfo;

                    this.$nextTick(() => {
                        this.modelInfo.forEach(block => {
                            if (!this.getDataAnalysisConfig().model_setting[this.modelName].hasOwnProperty(block.name)) {
                                let dataAnalysisConfig = this.getDataAnalysisConfig();
                                dataAnalysisConfig.model_setting[this.modelName][block.name] = {};
                                this.setDataAnalysisConfig(dataAnalysisConfig);
                            }                            

                            this.$refs.AnalysisDataSetTagGroup.changeData(
                                Object.keys(this.getDataAnalysisConfig().model_setting)
                            );
                            
                            this.$refs[`ModelInfoDropdown_${block.id}`][0].changeOptions(block.children);
                            if (this.getDataAnalysisConfig().model_setting[this.modelName].hasOwnProperty(block.name)) {
                                this.$refs[`ModelInfoTagGroup_${block.id}`][0].changeData(
                                    Object.keys(this.getDataAnalysisConfig().model_setting[this.modelName][block.name])
                                );
                            }

                        });
                    })
                }
                else {
                    this.$message.warning("getAnalysisModelOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async startDataAnalysisTraining() {
            try {

                const resp = await da.startDataAnalysisTrainingAPI(this.getDataAnalysisConfig(), this.taskName);
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

        getModelInfoInputs(option, block) {
            this.$nextTick(() => {
                this.$refs[`ModelInfoInputs_${block.id}`][0].changeOptions(option.param);
                
                let paramsObj;
                if (this.getDataAnalysisConfig().model_setting[this.modelName][block.name].hasOwnProperty(option.name)) {
                    // 已经选择了的模型组件（从localStorage中获取）
                    paramsObj = this.getDataAnalysisConfig().model_setting[this.modelName][block.name][option.name];
                }
                else {
                    // 新的模型组件（从接口数据获取）
                    paramsObj = this.transformParamsInputData(block.children.find(x => x.name === option.name).param);
                }

                const newParamsObj = {};
                // 遍历对象的键值对
                for (const key in paramsObj) {
                    if (paramsObj.hasOwnProperty(key)) {
                        const { start, end, type } = paramsObj[key];
                        newParamsObj[key] = this.getModelParamStr(start, end, type);
                    }
                }

                this.$refs[`ModelInfoInputs_${block.id}`][0].changeBelongTo(option.name);

                this.$refs[`ModelInfoInputs_${block.id}`][0].init(
                    newParamsObj
                );

                this.modelComponent = option.name;
            })
        },

        changeModelInfoInputs(option, block) {
            option.value = this.parseModelParamStr(option.value);

            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.model_setting[this.modelName][block.name][option.belongTo][option.name] = option;
            this.setDataAnalysisConfig(dataAnalysisConfig);       
        },

        changeAnalysisModelType(option) {
            this.getAnalysisModelOptions(option.name);
        },

        changeAnalysisModel(option) {
            this.modelName = option.name;
            this.getAnalysisModelInfo(this.modelName);
        },

        changeAnalysisPattern(option) {
            this.taskPattern = option.name;
        },

        changeModelInfoDropdown(option, block) {
            this.getModelInfoInputs(option, block);
        },

        activateTaskNameMessageBox() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();

            // 所选数据集不能为空
            if (Object.keys(dataAnalysisConfig.data_setting.dataset).length === 0) {
                this.$message.warning("所选数据集不能为空");
                return;
            }

            // 选择的所有数据集都必须确定目标变量名
            for (let dataset in dataAnalysisConfig.data_setting.dataset) {
                if (!('target_name' in dataAnalysisConfig.data_setting.dataset[dataset])) {
                    this.$message.warning("选择的所有数据集都必须确定目标变量名，请检查");
                    return;
                }
            }

            this.$refs.StartTrainingModelMessageBox.open();
        },

        changeStartTrainingModelMessageBox(taskName) {
            this.taskName = taskName;

            if (this.taskNames.includes(this.taskName)) {
                this.$message.warning("任务名称已存在，请重新输入");
                return;
            }

            this.startDataAnalysisTraining();
        },

        changeAnalysisDataSetTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();

            const newModelSetting = {};
            for (const key in dataAnalysisConfig.model_setting) {
                if (list.includes(key)) {
                    newModelSetting[key] = dataAnalysisConfig.model_setting[key];
                }
            }

            dataAnalysisConfig.model_setting = newModelSetting;

            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeModelInfoTagGroup(list, block) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            const rawObj = dataAnalysisConfig.model_setting[this.modelName][block.name];
            const filteredObj = {};
                list.forEach(key => {
                if (rawObj.hasOwnProperty(key)) {
                    filteredObj[key] = rawObj[key];
                }
            });
            dataAnalysisConfig.model_setting[this.modelName][block.name] = filteredObj;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        clickModelInfoButton(block) {
            const originalParamsObj = block.children.find(x => x.name === this.modelComponent).param;
            const paramsObj = JSON.parse(JSON.stringify(originalParamsObj));

            // 操作拷贝后的数据
            paramsObj.forEach(param => {
            param.value = this.parseModelParamStr(param.value);
            });

            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.model_setting[this.modelName][block.name][this.modelComponent] = this.transformParamsInputData(paramsObj);
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$nextTick(() => {
                this.modelInfo.forEach(block => {
                    this.$refs[`ModelInfoTagGroup_${block.id}`][0].changeData(
                        Object.keys(this.getDataAnalysisConfig().model_setting[this.modelName][block.name])
                    );
                });
            })
        },

        changeAnalysisParamsInputs(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.task_params[option.name] = option.value.split(',').map(item => {
                // 如果是数字字符串，转换为数字类型
                return isNaN(item) ? item : Number(item);
            });
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        clickAnalysisModelButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.model_setting[this.modelName] = {};
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisDataSetTagGroup.changeData(
                Object.keys(this.getDataAnalysisConfig().model_setting)
            );

            this.getAnalysisModelInfo(this.modelName);
        },

        clickAnalysisPatternButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.task_pattern = this.taskPattern;
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisPatternTagGroup.changeData(
                this.getLabelList([this.getDataAnalysisConfig().data_setting.task_pattern], this.analysisPatternOptions)
            );
        },
    
    }
}
</script>

<style>

</style>