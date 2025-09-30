<template>
    <div v-if="isActivate" class=" w-full h-full fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class=" flex h-full w-full items-center justify-center" @click.self="handleClose">
        <div class=" bg-white rounded-lg shadow-2xl p-6 w-10/12 h-5/6 relative">

          <button @click="handleClose" class="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-4">×</button>

          <div class=" mt-6 h-full w-full flex flex-col overflow-auto">
            
            <div class=" text-xl font-semibold mr-10 ml-2">{{node.paper_title}}</div>
            <div class=" mt-2 text-xl font-semibold mr-10 ml-2">{{node.paper_zh_title}}</div>
            <div class=" mt-8 flex flex-row space-x-4 mb-2 ml-12 mr-12">
                <div>
                    <div class=" font-medium w-12">作者:</div>
                </div>
                <p class="text-gray-700">{{ node.paper_authors }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2 ml-12 mr-12">
                <div>
                    <div class=" font-medium w-12">时间:</div>
                </div>
                <p class="text-gray-700">{{ node.paper_publish_time }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2 ml-12 mr-12">
                <div>
                    <div class=" font-medium w-12">期刊:</div>
                </div>
                <p class="text-gray-700">{{ node.paper_journal }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2 ml-12 mr-12">
                <div>
                    <div class=" font-medium w-12">DOI:</div>
                </div>
                <p class="text-gray-700">{{ node.paper_doi }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2 ml-12 mr-12">
                <div>
                    <div class=" font-medium w-12">URL:</div>
                </div>
                <p class="text-gray-700">{{ node.paper_url }}</p>
            </div>
            
            <div class=" mt-12 flex flex-row space-x-4 mb-2 ml-12 mr-12 relative">
                <div class=" absolute left-0 -ml-10">
                    <AITag />
                </div>
                <div>
                    <div class=" font-medium w-48 -ml-4">主题短语-研究问题:</div>
                </div>
            </div>

            <div class=" flex justify-center mt-4">
                <TagStack :items="node.research_questions" style="width: 50rem" />
            </div>

            <div class=" mt-12 flex flex-row space-x-4 mb-2 ml-12 mr-12 relative">
                <div class=" absolute left-0 -ml-10">
                    <AITag />
                </div>
                <div>
                    <div class=" font-medium w-48 -ml-4">主题短语-研究方法:</div>
                </div>
            </div>

            <div class=" flex justify-center mt-4">
                <TagStack :items="node.research_methods" style="width: 50rem" />
            </div>

            <div class=" mt-12 flex flex-row space-x-4 mb-2 ml-12 mr-12 relative">
                <div class=" absolute left-0 -ml-10">
                    <AITag />
                </div>
                <div>
                    <div class=" font-medium w-48 -ml-4">主题短语-研究贡献:</div>
                </div>
            </div>

            <div class=" flex justify-center mt-4">
                <TagStack :items="node.research_contributions" style="width: 50rem" />
            </div>
            
            <div class=" mt-12 flex flex-row space-x-4 mb-2 ml-12 mr-12 relative">
                <div class=" absolute left-0 -ml-10">
                    <AITag />
                </div>
                <div>
                    <div class=" font-medium w-48 -ml-4">主题短语-研究局限:</div>
                </div>
            </div>

            <div class=" flex justify-center mt-4">
                <TagStack :items="node.research_limitations" style="width: 50rem" />
            </div>

            <div class=" mt-20 flex flex-row space-x-4 mb-2 ml-12 mr-12">
                <div>
                    <div class=" font-medium w-12">摘要:</div>
                </div>
                <div class=" flex flex-row space-x-8" style="width: 60rem">
                    <p class="text-gray-700">{{ node.paper_abstract }}</p>
                    <p class="text-gray-700">{{ node.paper_zh_abstract }}</p>
                </div>
            </div>

            <div class=" mt-12 flex flex-row space-x-4 mb-2 ml-12 mr-12 relative">
                <div class=" absolute left-0 -ml-10">
                    <AITag />
                </div>
                <div>
                    <div class=" font-medium w-48 -ml-4">研究总结:</div>
                </div>
            </div>

            <div class=" mt-4 flex flex-row space-x-4 ml-8 mr-12 mb-40">
                <div>
                    <div class=" font-medium w-12"></div>
                </div>
                <div class=" flex flex-col space-y-8" style="width: 60rem">
                    <p class="text-gray-700">{{ node.paper_summary }}</p>
                    <p class="text-gray-700">{{ node.paper_zh_summary }}</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import TagStack from './TagStack.vue';
import SingleTag from './SingleTag.vue';
import AITag from './AITag.vue';

export default {
  name: 'HoverPanel',
  data() {
    return {
        isActivate: false,
        node: {}
    }
  },
  components: {
    TagStack,
    SingleTag,
    AITag
  },
  methods: {
    activate(node) {
        this.isActivate = true;
        this.node = node;
    },
    handleClose() {
        this.isActivate = false;
        this.node = {};
        this.$emit('input', false);
    }
  }
}
</script>

<style>

</style>