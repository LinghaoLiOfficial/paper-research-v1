<template>
  <div class=" cColPage">

    <div class=" w-full flex flex-col border border-slate-300 shadow-sm rounded-xl">
      <div class=" flex flex-row items-center">
        <div class=" cSubBlock m-4">
          <div class=" cBlockTitle">选择论文评价维度</div>
          <Dropdown ref="ContentPerspectiveDropdown" @listen="changeContentPerspectiveDropdown"/>
        </div>
        
        <div class=" flex h-24 flex-row items-center border border-slate-300 shadow-sm px-3 rounded-xl m-4">

          <Button class=" mb-2 ml-8" :textColor="'text-common_color_3'" :name="'查看目录结构'" :width="'22'" @listen="activateKnowledgeTree"/>
          <Button class=" mb-2 ml-8" :textColor="'text-common_color_3'" :name="'查看文献综述总结'" :width="'22'" @listen="activateLiteratureReview"/>
          <Button class=" mb-2 ml-8 mr-8" :textColor="'text-common_color_3'" :name="'查看时间演化趋势'" :width="'22'" @listen="activateGetTimeEvolveTrend"/>
        </div>

        <Button class=" ml-auto mr-8" :textColor="'text-common_color_3'" :name="'返回'" :width="'22'" @listen="activateBackToMyTasks"/>

      </div>

    </div>
    <div class="cBlock flex-1">
      <KnowledgeGraph :key="contentPerspective" v-loading="isLoading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" :canEdit="false" :willNodeMoveToXCenter="true" :rectWidth="400" :isKnowledgeGraph="true" @clickNode="clickNodeKnowledgeGraph" ref="NetworkKnowledgeGraph"/>
    </div>

    <KnowledgeGraphTree ref="PaperKnowledgeGraphTree"/>
    <HoverPanel ref="PaperHoverPanel"/>
    <LiteratureReviewPanel ref="GraphLiteratureReviewPanel"/>
    <WordCloudPanel ref="VisualizeWordCloudPanel"/>
  </div>
</template>

<script>
import * as sr from '@/api/science_research';

import KnowledgeGraph from '@/components/common/KnowledgeGraph.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import HoverPanel from '@/components/common/HoverPanel.vue';
import Button from '@/components/common/Button.vue';
import KnowledgeGraphTree from '@/components/common/KnowledgeGraphTree.vue';
import LiteratureReviewPanel from '@/components/common/LiteratureReviewPanel.vue';
import WordCloudPanel from '@/components/common/WordCloudPanel.vue';

export default {
    name: 'SRNetworkAnalysis',
    data() {
        return {
          graphData: null,
          contentPerspectiveOptions: [],
          nodeDetailInfo: null,

          taskId: null,
          contentPerspective: null,
          isLoading: true,
          literatureReview: null,
          wordcloudImagePathList: null
        }
    },
    components: {
      KnowledgeGraph,
      Dropdown,
      HoverPanel,
      Button,
      KnowledgeGraphTree,
      LiteratureReviewPanel,
      WordCloudPanel
    },
    mounted() {
      this.taskId = this.$route.query.task_id;

      this.getContentPerspectiveDropdown();
    },
    methods: {

      activateKnowledgeTree() {
        this.$refs.PaperKnowledgeGraphTree.activate(this.graphData);
      },

      activateLiteratureReview() {
        this.getKnowledgeGraphSummary();
      },

      activateGetTimeEvolveTrend() {
        this.getTimeEvolveTrend();
      },

      activateBackToMyTasks() {

        const token = localStorage.getItem("token");
        if (token == null) {
          this.$router.push({
            path: '/login'
          });
        }
        else {
          this.$router.push({
            path: '/scienceResearch/myTask'
          });
        }
      },

      async getTimeEvolveTrend() {
        try {
          const resp = await sr.getTimeEvolveTrendAPI(this.taskId, this.contentPerspective);
          const content = resp.data;
  
          if (content.check) {
            this.wordcloudImagePathList = content.data.wordcloudImagePathList;
  
            this.$refs.VisualizeWordCloudPanel.activate(this.wordcloudImagePathList);

          } else {
            this.$message.warning('getTimeEvolveTrend');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },

      async getKnowledgeGraphSummary() {
        try {
          const resp = await sr.getKnowledgeGraphSummaryAPI(this.taskId, this.contentPerspective);
          const content = resp.data;
  
          if (content.check) {
            this.literatureReview = content.data.literatureReview;
  
            this.$refs.GraphLiteratureReviewPanel.activate(this.literatureReview);

          } else {
            this.$message.warning('getKnowledgeGraphSummary');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },

      async getContentPerspectiveDropdown() {
        try {
          const resp = await sr.getContentPerspectiveDropdownAPI();
          const content = resp.data;
  
          if (content.check) {
            this.contentPerspectiveOptions = content.data.contentPerspectiveOptions;
  
            this.$refs.ContentPerspectiveDropdown.changeOptions(this.contentPerspectiveOptions);
            this.$refs.ContentPerspectiveDropdown.init("research_methods");

          } else {
            this.$message.warning('getContentPerspectiveDropdown');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },
      async getKnowledgeNetwork() {
        try {
          const resp = await sr.getKnowledgeNetworkAPI(this.taskId, this.contentPerspective);
          const content = resp.data;
  
          if (content.check) {
            this.graphData = content.data.graphData;
  
            this.$refs.NetworkKnowledgeGraph.init(this.graphData);

            this.isLoading = false;

          } else {
            this.$message.warning('getKnowledgeNetwork');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },
      async getKnowledgeGraphNodeDetailInfo(nodeId) {
        try {
          const resp = await sr.getKnowledgeGraphNodeDetailInfoAPI(nodeId);
          const content = resp.data;
  
          if (content.check) {
            this.nodeDetailInfo = content.data.nodeDetailInfo;
  
            this.$refs.PaperHoverPanel.activate(this.nodeDetailInfo);

          } else {
            this.$message.warning('getKnowledgeGraphNodeDetailInfo');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },
      changeContentPerspectiveDropdown(option) {
        this.isLoading = true;
        this.contentPerspective = option.name;
        this.getKnowledgeNetwork();
      },
      clickNodeKnowledgeGraph(node) {
        if (node.data.type === '论文') {
          this.getKnowledgeGraphNodeDetailInfo(node.data.id);
        }
      }
    }
}
</script>

<style scoped>

</style>