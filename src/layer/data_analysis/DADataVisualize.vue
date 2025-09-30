<template>
    <div class=" w-full h-full">
      <div class=" flex h-full w-full">

          <div class=" mt-6 h-full w-full flex flex-col overflow-auto" style="height: 84%;">

            <div v-for="(image, index) in images" :key="index" class=" flex flex-col items-center mb-8">
              <div class=" mt-16 text-md text-common_color_2 font-semibold">{{image['name']}}</div>  
              <img :src="image['url']" style="width: 50rem" >
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import * as da from '@/api/data_analysis'

export default {
    name: 'DADataVisualize',
    data() {
        return {
            taskId: "",
            runId: "",
            images: []
        }
    },
    mounted() {
        this.taskId = this.$route.query.task_id;
        this.runId = this.$route.query.run_id;

        if (this.taskId == undefined || this.runId == undefined) {
            return;
        }

        this.getAllVisualizeImages();
    },
    methods: {
        async getAllVisualizeImages() {
            try {

                const resp = await da.getAllVisualizeImagesAPI(this.taskId, this.runId);
                const content = resp.data;

                if (content.check) {
                    this.images = content.data.visualizeImages;
                }
                else {
                    this.$message.warning("startWebCrawlRunning");
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