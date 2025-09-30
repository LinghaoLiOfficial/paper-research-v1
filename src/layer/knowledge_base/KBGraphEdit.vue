<template>
    <div class="cColPage">
      <div class="cBlock h-full">
        <KnowledgeGraph :canEdit="true" ref="DocMySpaceGraphKnowledgeGraph" @listen="changeKnowledgeGraph" @listenImage="uploadKnowledgeGraphImage"/>
      </div>
    </div>
</template>
  
<script>
  import * as kb from '@/api/knowledge_base';
  import KnowledgeGraph from '@/components/common/KnowledgeGraph.vue'
  
  export default {
    name: 'KBGraphEdit',
    components: {
      KnowledgeGraph,
    },
    data() {
      return {
        fileId: null,
        graphData: null,
      };
    },
    mounted() {
      this.fileId = this.$route.query.file_id;

      this.getKnowledgeGraph();
    },
    methods: {

      // 上传图片
      async uploadKnowledgeGraphImage(formData) {
        try {
          formData.append('id', this.graphData.id);

          const resp = await kb.uploadKnowledgeGraphImageAPI(formData);
          const content = resp.data;

          if (content.check) {

          } else {
            this.$message.warning('docGetMySpaceFilesOptions');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },

      async getKnowledgeGraph() {
        try {
          const resp = await kb.getKnowledgeGraphAPI(this.fileId);
          const content = resp.data;
  
          if (content.check) {
            this.graphData = content.data.graphData;
  
            this.$refs.DocMySpaceGraphKnowledgeGraph.init(this.graphData);

          } else {
            this.$message.warning('getKnowledgeGraph');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },

      async updateKnowledgeGraph(graphData) {
        try {
          const resp = await kb.updateKnowledgeGraphAPI(graphData);
          const content = resp.data;
  
          if (content.check) {

          } else {
            this.$message.warning('getKnowledgeGraph');
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },

      changeKnowledgeGraph(graphData) {
        this.updateKnowledgeGraph(graphData);
      },
    },
  };
</script>
  
<style>

</style>