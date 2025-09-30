<template>
    <div class=" cRowPage">
        <div class=" cBlockCol w-1/2">
            <div class=" cBlock">
                <div class=" cBlockTitle">选择爬虫任务</div>
                <Dropdown ref="ChooseCrawlTaskDropdown" @listen="changeCrawlTask"/>
            </div>

            <div class=" cBlock">
                <div class=" cBlockTitle">参数设置</div>
                <ParamsInputs ref="CrawlTaskParamsInputs" @listen="changeCrawlTaskParamsInputs"/>
                <div v-if="crawlTaskParams.checkboxgroup && crawlTaskParams.checkboxgroup.length > 0" class=" cSubBlockTitle">限定学科[可多选]</div>
                <CheckboxGroup ref="CrawlTaskParamsCheckboxGroup" @listen="changeCrawlTaskParamsCheckboxGroup"/>

            </div>

            <div class=" cBlock">
                <div class=" cBlockTitle">控制命令</div>
                <div class=" cBlockRow">
                    <Button :name="'运行'" :width="'20'" @listen="activateRunning"/>
                    <Button :name="'暂停'" :width="'20'"/>
                    <Button :name="'终止'" :width="'20'"/>
                </div>
            </div>
            
            <div class=" cBlock">
                <div class=" cBlockTitle">任务进度</div>
                <Stepper ref="CrawlTaskStepper" />
            </div>

        </div>

        <div class=" cBlockCol flex-1">
            <div class=" cBlock">
                <div class=" cBlockTitle">我的任务</div>
                <Dropdown ref="ChooseCrawlMyTaskDropdown" @listen="changeCrawlMyTaskDropdown"/>
            </div>
            <div class=" cBlock">
                <div class=" cBlockTitle">检索论文信息网站</div>
                <Dropdown ref="ChooseCrawlSearchPaperInfoWebDropdown"/>
            </div>
            <div class=" cBlock">
                <div class=" cBlockTitle">获取论文对应摘要网站</div>
                <Dropdown ref="ChooseCrawlSearchPaperAbstractWebDropdown"/>
            </div>
            <div class=" cBlock">
                <div class=" cBlockTitle">获取论文对应原文PDF网站</div>
                <Dropdown ref="ChooseCrawlSearchPaperPDFWebDropdown"/>
            </div>
            <div class=" cBlock">
                <div class=" cBlockTitle">获取论文对应AI总结【研究问题、研究方法、贡献、局限】</div>
                <Dropdown ref="ChooseCrawlGetPaperAISummaryDropdown"/>
            </div>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

import * as wc from '@/api/web_crawl'

import Dropdown from '@/components/common/Dropdown.vue';
import Stepper from '@/components/common/Stepper.vue';
import ParamsInputs from '@/components/common/SmallParamsInputs.vue';
import CheckboxGroup from '@/components/common/CheckboxGroup.vue';
import Button from '@/components/common/Button.vue';

export default {
    name: 'WCTaskManage',
    components: {
        Dropdown,
        Stepper,
        ParamsInputs,
        CheckboxGroup,
        Button
    },
    data() {
        return {
            crawlTaskOptions: [],
            crawlTaskParams: {},

            crawlTaskStepperData: [],
            crawlMyTaskOptions: [],

            crawlSearchPaperInfoWebsiteOptions: [],
            crawlSearchPaperAbstractWebsiteOptions: [],
            crawlSearchPaperPDFWebsiteOptions: [],
            crawlGetPaperAISummaryOptions: [],

            selectedCrawlMyTask: null
        }
    },
    mounted() {
        this.initConfig();

        this.getCrawlTaskOptions();

    },
    methods: {
        getWebCrawlConfig() {
            return JSON.parse(localStorage.getItem("webCrawlConfig"));
        },
        
        setWebCrawlConfig(webCrawlConfig) {
            localStorage.setItem("webCrawlConfig", JSON.stringify(webCrawlConfig));
        },

        async getCrawlTaskOptions() {
            try {

                const resp = await wc.getCrawlTaskOptionsAPI();
                const content = resp.data;

                if (content.check) {
                    this.crawlTaskOptions = content.data.crawlTaskOptions;

                    this.$refs.ChooseCrawlTaskDropdown.changeOptions(this.crawlTaskOptions);
                    this.$refs.ChooseCrawlTaskDropdown.init(
                        this.getWebCrawlConfig().taskManage.ChooseCrawlTaskDropdown
                    );
                }
                else {
                    this.$message.warning("getCrawlTaskOptions");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getCrawlTaskParams(crawlTask) {
            try {

                const resp = await wc.getCrawlTaskParamsAPI(crawlTask);
                const content = resp.data;

                if (content.check) {
                    this.crawlTaskParams = content.data.crawlTaskParams;

                    this.$refs.CrawlTaskParamsInputs.changeOptions(this.crawlTaskParams.input);
                    this.$refs.CrawlTaskParamsInputs.init(
                        this.getWebCrawlConfig().taskManage.CrawlTaskParamsInputs
                    );

                    this.$refs.CrawlTaskParamsCheckboxGroup.changeOptions(this.crawlTaskParams.checkboxgroup);
                    this.$refs.CrawlTaskParamsCheckboxGroup.init(
                        this.getWebCrawlConfig().taskManage.CrawlTaskParamsCheckboxGroup
                    );
                }
                else {
                    this.$message.warning("getCrawlTaskParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getCrawlSearchPaperInfoWebsiteOptions(crawlTask) {
            try {

                const resp = await wc.getCrawlSearchPaperInfoWebsiteOptionsAPI(crawlTask);
                const content = resp.data;

                if (content.check) {
                    this.crawlSearchPaperInfoWebsiteOptions = content.data.crawlSearchPaperInfoWebsiteOptions;

                    this.$refs.ChooseCrawlSearchPaperInfoWebDropdown.changeOptions(this.crawlSearchPaperInfoWebsiteOptions);
                    // this.$refs.ChooseCrawlSearchPaperInfoWebDropdown.init(
                    //     this.getWebCrawlConfig().taskManage.CrawlTaskParamsInputs
                    // );
                }
                else {
                    this.$message.warning("getCrawlTaskParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getCrawlSearchPaperAbstractWebsiteOptions(crawlTask) {
            try {

                const resp = await wc.getCrawlSearchPaperAbstractWebsiteOptionsAPI(crawlTask);
                const content = resp.data;

                if (content.check) {
                    this.crawlSearchPaperAbstractWebsiteOptions = content.data.crawlSearchPaperAbstractWebsiteOptions;

                    this.$refs.ChooseCrawlSearchPaperAbstractWebDropdown.changeOptions(this.crawlSearchPaperAbstractWebsiteOptions);
                    // this.$refs.ChooseCrawlSearchPaperInfoWebDropdown.init(
                    //     this.getWebCrawlConfig().taskManage.CrawlTaskParamsInputs
                    // );
                }
                else {
                    this.$message.warning("getCrawlTaskParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getCrawlSearchPaperPDFWebsiteOptions(crawlTask) {
            try {

                const resp = await wc.getCrawlSearchPaperPDFWebsiteOptionsAPI(crawlTask);
                const content = resp.data;

                if (content.check) {
                    this.crawlSearchPaperPDFWebsiteOptions = content.data.crawlSearchPaperPDFWebsiteOptions;

                    this.$refs.ChooseCrawlSearchPaperPDFWebDropdown.changeOptions(this.crawlSearchPaperPDFWebsiteOptions);
                    // this.$refs.ChooseCrawlSearchPaperInfoWebDropdown.init(
                    //     this.getWebCrawlConfig().taskManage.CrawlTaskParamsInputs
                    // );
                }
                else {
                    this.$message.warning("getCrawlTaskParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getCrawlGetPaperAISummaryOptions(crawlTask) {
            try {

                const resp = await wc.getCrawlGetPaperAISummaryOptionsAPI(crawlTask);
                const content = resp.data;

                if (content.check) {
                    this.crawlGetPaperAISummaryOptions = content.data.crawlGetPaperAISummaryOptions;

                    this.$refs.ChooseCrawlGetPaperAISummaryDropdown.changeOptions(this.crawlGetPaperAISummaryOptions);
                    // this.$refs.ChooseCrawlSearchPaperInfoWebDropdown.init(
                    //     this.getWebCrawlConfig().taskManage.CrawlTaskParamsInputs
                    // );
                }
                else {
                    this.$message.warning("getCrawlTaskParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getCrawlMyTaskOptions(crawlTask) {
            try {

                const resp = await wc.getCrawlMyTaskOptionsAPI(crawlTask);
                const content = resp.data;

                if (content.check) {
                    this.crawlMyTaskOptions = content.data.crawlMyTaskOptions;

                    this.$refs.ChooseCrawlMyTaskDropdown.changeOptions(this.crawlMyTaskOptions);
                    // this.$refs.ChooseCrawlSearchPaperInfoWebDropdown.init(
                    //     this.getWebCrawlConfig().taskManage.CrawlTaskParamsInputs
                    // );
                }
                else {
                    this.$message.warning("getCrawlTaskParams");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async getCrawlTaskStepperData(crawlTask) {
            try {

                const resp = await wc.getCrawlTaskStepperDataAPI(crawlTask);
                const content = resp.data;

                if (content.check) {
                    this.crawlTaskStepperData = content.data.crawlTaskStepperData;

                    this.$refs.CrawlTaskStepper.changeData(this.crawlTaskStepperData);
                }
                else {
                    this.$message.warning("getCrawlTaskStepperData");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        async startWebCrawlRunning() {
            try {

                if (!(this.selectedCrawlMyTask)) {
                    this.selectedCrawlMyTask = uuidv4();
                }

                const resp = await wc.startWebCrawlRunningAPI(this.getWebCrawlConfig(), this.selectedCrawlMyTask);
                const content = resp.data;

                if (content.check) {
                    this.$message.success(content.message);
                }
                else {
                    this.$message.warning("startWebCrawlRunning");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },
        
        async getDefaultWebCrawlConfig() {
            try {

                const resp = await wc.getDefaultWebCrawlConfigAPI();
                const content = resp.data;

                if (content.check) {
                    const webCrawlConfig = content.data.defaultWebCrawlConfig;

                    this.setWebCrawlConfig(webCrawlConfig);
                }
                else {
                    this.$message.warning("getDefaultWebCrawlConfig");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        initConfig() {
            if (this.getWebCrawlConfig() == null) {
                this.getDefaultWebCrawlConfig();
            }
        },

        changeCrawlTask(option) {
            let webCrawlConfig = this.getWebCrawlConfig();
            webCrawlConfig.taskManage.ChooseCrawlTaskDropdown = option.name;
            this.setWebCrawlConfig(webCrawlConfig);

            this.getCrawlTaskParams(option.name);
            this.getCrawlTaskStepperData(option.name);

            this.getCrawlMyTaskOptions(option.name);

            this.getCrawlSearchPaperInfoWebsiteOptions(option.name);
            this.getCrawlSearchPaperAbstractWebsiteOptions(option.name);
            this.getCrawlSearchPaperPDFWebsiteOptions(option.name);
            this.getCrawlGetPaperAISummaryOptions(option.name);
        },

        changeCrawlTaskParamsInputs(option) {
            let webCrawlConfig = this.getWebCrawlConfig();
            webCrawlConfig.taskManage.CrawlTaskParamsInputs[option.name] = option.value;
            this.setWebCrawlConfig(webCrawlConfig);
        },

        changeCrawlTaskParamsCheckboxGroup(option) {
            let webCrawlConfig = this.getWebCrawlConfig();
            webCrawlConfig.taskManage.CrawlTaskParamsCheckboxGroup[option.name] = 1 - webCrawlConfig.taskManage.CrawlTaskParamsCheckboxGroup[option.name];
            this.setWebCrawlConfig(webCrawlConfig);
        },

        changeCrawlMyTaskDropdown(option) {
            this.selectedCrawlMyTask = option.name;
        },

        activateRunning() {
            this.startWebCrawlRunning();
        }
    }
}
</script>

<style>

</style>