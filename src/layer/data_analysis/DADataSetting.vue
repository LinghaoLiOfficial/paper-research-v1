<template>
    <div class=" cColPage">

        <div class=" flex flex-col w-full space-y-4 overflow-auto" style="height: 660px;">
            <div class=" cBlock">
                <div class=" cBlockTitle">数据导入</div>
                <div class=" cBlockRow">

                    <div class=" cSubBlock">
                        <div class=" cSubBlockTitle">选择任务类型</div>
                        <Dropdown ref="AnalysisTaskTypeDropdown" @listen="changeTaskType"/>
                    </div>

                    <div class=" cSubBlock">
                        <div class=" cSubBlockTitle">选择数据类型</div>
                        <Dropdown ref="AnalysisDataTypeDropdown" @listen="changeDataType"/>
                    </div>

                    <div class=" cSubBlock">
                        <div class=" cSubBlockTitle">选择数据集</div>
                        <div class=" cTip">*多选数据集仅适用于同类型数据集</div>
                        <TagGroup ref="AnalysisDataSetTagGroup" @listen="changeAnalysisDataSetTagGroup"/>
                        <Dropdown ref="AnalysisDataSetDropdown" @listen="changeAnalysisDataSet"/>
                        <Dropdown ref="AnalysisDataTableDropdown" @listen="changeAnalysisDataTable"/>
                        <div class=" flex flex-row justify-center">
                            <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisDataSetButton"/>
                        </div>
                    </div>

                </div>
            </div>

            <div v-if="showDataframe" class=" cBlock">
                <div class=" cBlockTitle">数据表</div>

                <div class=" cBlockCol">
                    <DataframeTable ref="AnalysisDataframeTable" :key="analysisDataTable" v-loading="isLoading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading"/>
                    <div class=" cBlock">
                        <div class=" cSubBlockTitle">数据表参数</div>
                        <div class=" cBlockTitle italic pl-8">提示：多个值请用英文逗号分割</div>
                        <SmallParamsInputs ref="DataframeParamsInputs" @listen="changeDataframeParamsInputs"/>
                    </div>
                    <div class=" cBlock">
                        <div class=" cSubBlockTitle">处理目标值</div>
                        <CheckboxGroup ref="DataframeCheckboxGroup" :isMultiSelect="false" @listen="changeDataframeCheckboxGroup" @changeCheckboxValue="changeDataframeCheckboxValue"/>
                    </div>
                </div>

            </div>

            <div class=" cBlock">
                <div class=" cBlockTitle">数据预处理</div>
                <div class=" cBlockCol">
                    <div class=" cBlockRow">

                        <!-- <div class=" cSubBlock">
                            <div class="  flex flex-row">
                                <div class=" cSubBlockTitle">时序聚合</div>
                                <Switcher class=" ml-auto" ref="AnalysisTimeScaleSwitcher" @listen="changeAnalysisTimeScaleStatus"/>
                            </div>
                            <TagGroup ref="AnalysisTimeScaleTagGroup" @listen="changeAnalysisTimeScaleTagGroup"/>
                            <Dropdown ref="AnalysisTimeScaleDropdown" @listen="changeAnalysisTimeScale"/>
                            <div class=" flex flex-row justify-center">
                                <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisTimeScaleButton"/>
                            </div>
                        </div> -->

                    </div>

                    <div class=" cBlockRow">

                        <div class=" cSubBlock">
                            <div class=" flex flex-row">
                                <div class=" cSubBlockTitle">处理缺失值</div>
                                <Switcher class=" ml-auto" ref="AnalysisNullValueSwitcher" @listen="changeAnalysisNullValueStatus"/>
                            </div>
                            <TagGroup ref="AnalysisNullValueTagGroup" @listen="changeAnalysisNullValueTagGroup"/>
                            <Dropdown ref="AnalysisNullValueDropdown" @listen="changeAnalysisNullValue"/>
                            <div class=" flex flex-row justify-center">
                                <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisNullValueButton"/>
                            </div>
                        </div>

                        <!-- <div class=" cSubBlock">
                            <div class="  flex flex-row">
                                <div class=" cSubBlockTitle">处理目标值</div>
                                <Switcher class=" ml-auto" ref="AnalysisTargetValueSwitcher" @listen="changeAnalysisTargetValueStatus"/>
                            </div>
                            <TagGroup ref="AnalysisTargetValueTagGroup" @listen="changeAnalysisTargetValueTagGroup"/>
                            <Dropdown ref="AnalysisTargetValueDropdown" @listen="changeAnalysisTargetValue"/>
                            <div class=" flex flex-row justify-center">
                                <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisTargetValueButton"/>
                            </div>
                        </div> -->

                        <div class=" cSubBlock">
                            <div class="  flex flex-row">
                                <div class=" cSubBlockTitle">数据标准化</div>
                                <Switcher class=" ml-auto" ref="AnalysisNormalizeValueSwitcher" @listen="changeAnalysisNormalizeValueStatus"/>
                            </div>
                            <TagGroup ref="AnalysisNormalizeValueTagGroup" @listen="changeAnalysisNormalizeValueTagGroup"/>
                            <Dropdown ref="AnalysisNormalizeValueDropdown" @listen="changeAnalysisNormalizeValue"/>
                            <div class=" flex flex-row justify-center">
                                <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisNormalizeValueButton"/>
                            </div>
                        </div>

                        <!-- <div class=" cSubBlock">
                            <div class="  flex flex-row">
                                <div class=" cSubBlockTitle">数据采样</div>
                                <Switcher class=" ml-auto" ref="AnalysisSampleValueSwitcher" @listen="changeAnalysisSampleValueStatus"/>
                            </div>
                            <TagGroup ref="AnalysisSampleValueTagGroup" @listen="changeAnalysisSampleValueTagGroup"/>
                            <Dropdown ref="AnalysisSampleValueDropdown" @listen="changeAnalysisSampleValue"/>
                            <div class=" flex flex-row justify-center">
                                <Button class=" mt-8" :name="'选择'" :width="'18'" :textSize="'xs'" @listen="clickAnalysisSampleValueButton"/>
                            </div>
                        </div> -->

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import * as da from '@/api/data_analysis'

import Dropdown from '@/components/common/Dropdown.vue';
import Switcher from '@/components/common/Switcher.vue';
import TagGroup from '@/components/common/TagGroup.vue';
import Button from '@/components/common/Button.vue';
import DataframeTable from '@/components/common/DataframeTable.vue';
import SmallParamsInputs from '@/components/common/SmallParamsInputs.vue';
import CheckboxGroup from '@/components/common/CheckboxGroup.vue';

export default {
    name: 'DADataSetting',
    components: {
        Dropdown,
        Switcher,
        TagGroup,
        Button,
        DataframeTable,
        SmallParamsInputs,
        CheckboxGroup
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
            analysisDataTypeOptions: [
                {
                    "id": 0,
                    "label": "普通数据",
                    "name": "common"
                },
                {
                    "id": 1,
                    "label": "时间序列数据",
                    "name": "time_series"
                },
                {
                    "id": 2,
                    "label": "图数据",
                    "name": "graph"
                },
            ],
            analysisDataSetOptions: [],
            analysisDataTableOptions: [],

            dataframeParamsOptions: [
                {
                    "id": 0,
                    "label": "目标变量列",
                    "name": "target_name"
                }
            ],

            analysisParamsOptions: [],
            analysisTimeScaleOptions: [],
            analysisNullValueOptions: [],
            analysisTargetValueOptions: [],
            analysisNormalizeValueOptions: [],
            analysisSampleValueOptions: [],
            analysisParams: [],

            taskType: null,
            dataType: null,
            analysisDataSet: null,
            analysisDataTable: null,

            showDataframe: false,

            analysisTimeScale: null,
            analysisNullValue: null,
            analysisTargetValue: null,
            analysisNormalizeValue: null,
            analysisSampleValue: null,

            isLoading: false,
        }
    },
    mounted() {
        if (this.getDataAnalysisConfig() == null) {
            this.getDefaultDataAnalysisConfig().then(() => {
                this.initializeDataAnalysis();
            });
        } else {
            this.initializeDataAnalysis();
        }
    },
    methods: {
        initializeDataAnalysis() {
            this.getAnalysisTaskTypeOptions();
            // this.getAnalysisTimeScaleOptions();
            this.getAnalysisNullValueOptions();
            this.getAnalysisNormalizeValueOptions();
            // this.getAnalysisSampleValueOptions();
        },
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
        getDataAnalysisConfig() {
            return JSON.parse(localStorage.getItem("dataAnalysisConfig"));
        },
        
        setDataAnalysisConfig(dataAnalysisConfig) {
            localStorage.setItem("dataAnalysisConfig", JSON.stringify(dataAnalysisConfig));
        },

        getAnalysisTaskTypeOptions() {
            this.$refs.AnalysisTaskTypeDropdown.changeOptions(this.analysisTaskTypeOptions);
            this.$refs.AnalysisTaskTypeDropdown.init(
                this.getDataAnalysisConfig().data_setting.task_type
            );
        },

        getAnalysisDataTypeOptions() {
            this.$refs.AnalysisDataTypeDropdown.changeOptions(this.analysisDataTypeOptions);
            this.$refs.AnalysisDataTypeDropdown.init(
                this.getDataAnalysisConfig().data_setting.data_type
            );
        },
        
        async getDefaultDataAnalysisConfig() {
            try {

                const resp = await da.getDefaultDataAnalysisConfigAPI();
                const content = resp.data;

                if (content.check) {
                    const dataAnalysisConfig = content.data.defaultDataAnalysisConfig;

                    this.setDataAnalysisConfig(dataAnalysisConfig);
                }
                else {
                    this.$message.warning("getDefaultDataAnalysisConfig");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisDataTableOptions(dataSet) {
            try {

                const resp = await da.getAnalysisDataTableOptionsAPI(this.taskType, this.dataType, dataSet);
                const content = resp.data;

                if (content.check) {
                    this.analysisDataTableOptions = content.data.analysisDataTableOptions;

                    this.$refs.AnalysisDataTableDropdown.changeOptions(this.analysisDataTableOptions);
                }
                else {
                    this.$message.warning("getAnalysisDataSetOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisDataSetOptions() {
            try {

                const resp = await da.getAnalysisDataSetOptionsAPI(this.taskType, this.dataType);
                const content = resp.data;

                if (content.check) {
                    this.analysisDataSetOptions = content.data.analysisDataSetOptions;

                    this.$refs.AnalysisDataSetDropdown.changeOptions(this.analysisDataSetOptions);
                    this.$refs.AnalysisDataSetTagGroup.changeData(
                        Object.keys(this.getDataAnalysisConfig().data_setting.dataset)
                    );
                }
                else {
                    this.$message.warning("getAnalysisDataSetOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisTimeScaleOptions() {
            try {

                const resp = await da.getAnalysisTimeScaleOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisTimeScaleOptions = content.data.analysisTimeScaleOptions;

                    this.$refs.AnalysisTimeScaleDropdown.changeOptions(this.analysisTimeScaleOptions);
                    this.$refs.AnalysisTimeScaleSwitcher.init(
                        this.getDataAnalysisConfig().data_setting.time_scale_mark
                    );
                    this.$refs.AnalysisTimeScaleTagGroup.changeData(
                        this.getLabelList(this.getDataAnalysisConfig().data_setting.time_scale, this.analysisTimeScaleOptions)
                    );
                }
                else {
                    this.$message.warning("getAnalysisTimeScaleOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisNullValueOptions() {
            try {

                const resp = await da.getAnalysisNullValueOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisNullValueOptions = content.data.analysisNullValueOptions;

                    this.$refs.AnalysisNullValueDropdown.changeOptions(this.analysisNullValueOptions);
                    this.$refs.AnalysisNullValueSwitcher.init(
                        this.getDataAnalysisConfig().data_setting.null_value_mark
                    );
                    this.$refs.AnalysisNullValueTagGroup.changeData(
                        this.getLabelList(this.getDataAnalysisConfig().data_setting.null_value, this.analysisNullValueOptions)
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

        async getAnalysisTargetValueOptions() {
            try {

                const resp = await da.getAnalysisTargetValueOptionsAPI(this.taskType);
                const content = resp.data;

                if (content.check) {
                    this.analysisTargetValueOptions = content.data.analysisTargetValueOptions;

                    this.$refs.DataframeCheckboxGroup.changeOptions(this.analysisTargetValueOptions);
                    
                    const datasetKey = `${this.analysisDataSet}/${this.analysisDataTable}`;

                    let dataAnalysisConfig = this.getDataAnalysisConfig();

                    if (dataAnalysisConfig.data_setting.dataset[datasetKey].hasOwnProperty("target_method")) {
                        
                        const targetMethod = dataAnalysisConfig.data_setting.dataset[datasetKey].target_method;
                        const newTargetMethod = {};
                        if (targetMethod.hasOwnProperty('target_method_name')) {
                            newTargetMethod['name'] = targetMethod['target_method_name']
                        }
                        if (targetMethod.hasOwnProperty('target_method_value')) {
                            newTargetMethod['value'] = targetMethod['target_method_value']
                        }
                        
                        this.$refs.DataframeCheckboxGroup.init(
                            [newTargetMethod]
                        )
                    }
                }
                else {
                    this.$message.warning("getAnalysisTargetValueOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisNormalizeValueOptions() {
            try {

                const resp = await da.getAnalysisNormalizeValueOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisNormalizeValueOptions = content.data.analysisNormalizeValueOptions;

                    this.$refs.AnalysisNormalizeValueDropdown.changeOptions(this.analysisNormalizeValueOptions);
                    this.$refs.AnalysisNormalizeValueSwitcher.init(
                        this.getDataAnalysisConfig().data_setting.normalize_value_mark
                    );
                    this.$refs.AnalysisNormalizeValueTagGroup.changeData(
                        this.getLabelList(this.getDataAnalysisConfig().data_setting.normalize_value, this.analysisNormalizeValueOptions)
                    );
                }
                else {
                    this.$message.warning("getAnalysisNormalizeValueOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getAnalysisSampleValueOptions() {
            try {

                const resp = await da.getAnalysisSampleValueOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.analysisSampleValueOptions = content.data.analysisSampleValueOptions;

                    this.$refs.AnalysisSampleValueDropdown.changeOptions(this.analysisSampleValueOptions);
                    this.$refs.AnalysisSampleValueSwitcher.init(
                        this.getDataAnalysisConfig().data_setting.sample_value_mark
                    );
                    this.$refs.AnalysisSampleValueTagGroup.changeData(
                        this.getLabelList(this.getDataAnalysisConfig().data_setting.sample_value, this.analysisSampleValueOptions)
                    );
                }
                else {
                    this.$message.warning("getAnalysisSampleValueOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getDataFrame() {
            
            if (!this.showDataframe) this.showDataframe = true;

            try {

                const resp = await da.getDataFrameAPI(this.taskType, this.dataType, this.analysisDataSet, this.analysisDataTable);
                const content = resp.data;

                if (content.check) {
                    this.isLoading = true;

                    this.$refs.AnalysisDataframeTable.changeData(content.data.analysisDataframe);

                    this.isLoading = false;

                    this.getAnalysisTargetValueOptions();
                    this.getDataframeInputs();
                }
                else {
                    this.$message.warning("getAnalysisSampleValueOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getDefaultTargetColumn() {
            
            try {

                const resp = await da.getDefaultTargetColumnAPI(this.dataType, this.analysisDataSet);
                const content = resp.data;

                if (content.check) {
                    this.$refs.DataframeParamsInputs.changeOptions(this.dataframeParamsOptions);
                    this.$refs.DataframeParamsInputs.init(
                        content.data.targetName
                    );

                    const targetNameKey = Object.keys(content.data.targetName)[0];

                    const datasetKey = `${this.analysisDataSet}/${this.analysisDataTable}`;

                    let dataAnalysisConfig = this.getDataAnalysisConfig();

                    if (!dataAnalysisConfig.data_setting.dataset.hasOwnProperty(datasetKey)) return;

                    dataAnalysisConfig.data_setting.dataset[datasetKey][targetNameKey] = content.data.targetName[targetNameKey];
                    this.setDataAnalysisConfig(dataAnalysisConfig);
                }
                else {
                    this.$message.warning("getAnalysisSampleValueOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        getDataframeInputs() {
            this.$refs.DataframeParamsInputs.reset();

            const datasetKey = `${this.analysisDataSet}/${this.analysisDataTable}`;

            let dataAnalysisConfig = this.getDataAnalysisConfig();
            
            if (!dataAnalysisConfig.data_setting.dataset.hasOwnProperty(datasetKey)) return;

            if (!dataAnalysisConfig.data_setting.dataset[datasetKey].hasOwnProperty("target_name")) {
                this.getDefaultTargetColumn();
            }
            else {
                this.$refs.DataframeParamsInputs.changeOptions(this.dataframeParamsOptions);
                this.$refs.DataframeParamsInputs.init(
                    dataAnalysisConfig.data_setting.dataset[datasetKey]
                );
            }
        },

        changeAnalysisDataSet(option) {
            this.analysisDataSet = option ? option.name : null;

            this.getAnalysisDataTableOptions(option.name);
        },

        changeAnalysisDataTable(option) {
            this.analysisDataTable = option.name;

            this.getDataFrame();
        },

        clickAnalysisDataSetButton() {
            const datasetKey = `${this.analysisDataSet}/${this.analysisDataTable}`;

            let dataAnalysisConfig = this.getDataAnalysisConfig();
            
            if (dataAnalysisConfig.data_setting.dataset.hasOwnProperty(datasetKey)) {
                this.$message.warning("该数据集已选择");
                return;
            };
            
            dataAnalysisConfig.data_setting.dataset[datasetKey] = {};
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisDataSetTagGroup.changeData(
                Object.keys(this.getDataAnalysisConfig().data_setting.dataset)
            );

            this.getDataframeInputs();
        },

        changeAnalysisTimeScaleStatus(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.time_scale_mark = option;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisTimeScale(option) {
            this.analysisTimeScale = option ? option.name : null;
        },

        clickAnalysisTimeScaleButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.time_scale.push(this.analysisTimeScale);
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisTimeScaleTagGroup.changeData(
                this.getLabelList(this.getDataAnalysisConfig().data_setting.time_scale, this.analysisTimeScaleOptions)
            );
        },

        changeAnalysisNullValueStatus(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.null_value_mark = option;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisNullValue(option) {
            this.analysisNullValue = option ? option.name : null;
        },

        clickAnalysisNullValueButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.null_value.push(this.analysisNullValue);
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisNullValueTagGroup.changeData(
                this.getLabelList(this.getDataAnalysisConfig().data_setting.null_value, this.analysisNullValueOptions)
            );
        },

        changeAnalysisTargetValueStatus(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.target_value_mark = option;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisTargetValue(option) {
            this.analysisTargetValue = option ? option.name : null;
        },

        clickAnalysisTargetValueButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.target_value.push(this.analysisTargetValue);
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisTargetValueTagGroup.changeData(
                this.getLabelList(this.getDataAnalysisConfig().data_setting.target_value, this.analysisTargetValueOptions)
            );
        },

        changeAnalysisNormalizeValueStatus(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.normalize_value_mark = option;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisNormalizeValue(option) {
            this.analysisNormalizeValue = option ? option.name : null;
        },

        clickAnalysisNormalizeValueButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.normalize_value.push(this.analysisNormalizeValue);
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisNormalizeValueTagGroup.changeData(
                this.getLabelList(this.getDataAnalysisConfig().data_setting.normalize_value, this.analysisNormalizeValueOptions)
            );
        },

        changeAnalysisSampleValueStatus(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.sample_value_mark = option;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisSampleValue(option) {
            this.analysisSampleValue = option ? option.name : null;
        },

        clickAnalysisSampleValueButton() {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.sample_value.push(this.analysisSampleValue);
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.$refs.AnalysisSampleValueTagGroup.changeData(
                this.getLabelList(this.getDataAnalysisConfig().data_setting.sample_value, this.analysisSampleValueOptions)
            );
        },

        changeAnalysisDataSetTagGroup(list) {
            
            let dataAnalysisConfig = this.getDataAnalysisConfig();

            const newDataSet = {};
            for (const key in dataAnalysisConfig.data_setting.dataset) {
                if (list.includes(key)) {
                    newDataSet[key] = dataAnalysisConfig.data_setting.dataset[key];
                }
            }

            dataAnalysisConfig.data_setting.dataset = newDataSet;

            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisTimeScaleTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.time_scale = this.getNameList(list, this.analysisTimeScaleOptions);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisNullValueTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.null_value = this.getNameList(list, this.analysisNullValueOptions);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisTargetValueTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.target_value = this.getNameList(list, this.analysisTargetValueOptions);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeAnalysisNormalizeValueTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.normalize_value = this.getNameList(list, this.analysisNormalizeValueOptions);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },
        changeAnalysisSampleValueTagGroup(list) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.sample_value = this.getNameList(list, this.analysisSampleValueOptions);
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },
        changeTaskType(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.task_type = option.name;
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.taskType = option.name;

            this.getAnalysisDataTypeOptions();
        },
        changeDataType(option) {
            let dataAnalysisConfig = this.getDataAnalysisConfig();
            dataAnalysisConfig.data_setting.data_type = option.name;
            this.setDataAnalysisConfig(dataAnalysisConfig);

            this.dataType = option.name;

            this.getAnalysisDataSetOptions();
        },

        changeDataframeParamsInputs(option) {
            const datasetKey = `${this.analysisDataSet}/${this.analysisDataTable}`;

            let dataAnalysisConfig = this.getDataAnalysisConfig();
            
            if (!dataAnalysisConfig.data_setting.dataset.hasOwnProperty(datasetKey)) return;

            dataAnalysisConfig.data_setting.dataset[datasetKey][option.name] = option.value;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeDataframeCheckboxGroup(option) {
            const datasetKey = `${this.analysisDataSet}/${this.analysisDataTable}`;

            let dataAnalysisConfig = this.getDataAnalysisConfig();
            
            if (!dataAnalysisConfig.data_setting.dataset.hasOwnProperty(datasetKey)) return;

            const newTargetMethod = {
                "target_method_name": option.name
            };
            if (option.hasOwnProperty("value")) {
                newTargetMethod["target_method_value"] = parseInt(option.value);
            }

            dataAnalysisConfig.data_setting.dataset[datasetKey].target_method = newTargetMethod;
            this.setDataAnalysisConfig(dataAnalysisConfig);
        },

        changeDataframeCheckboxValue(option) {
            this.changeDataframeCheckboxGroup(option);
        }

    }
}
</script>

<style>

</style>