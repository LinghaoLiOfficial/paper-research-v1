<template>
    <div class=" cBlockCol">
        <div v-for="(item, index) in listData" :key="item.paper_id" class=" cBlock">
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" text-xl font-semibold italic mb-8">{{index + 1}}</div>
                </div>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">论文标题</div>
                </div>
                <h3 class="text-xl font-semibold">{{ item.paper_title }}</h3>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">作者</div>
                </div>
                <p class="text-gray-700">{{ item.paper_authors }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">出版时间</div>
                </div>
                <p class="text-gray-700">{{ item.paper_publish_time }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">关联检索词</div>
                </div>
                <p class="text-gray-700">{{ item.paper_search_words }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">[AI]主题词</div>
                </div>
                <p class="text-xl text-_color_2">{{ item.research_themes }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">摘要</div>
                </div>
                <p class="text-gray-700">{{ item.paper_abstract }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">[AI]研究问题</div>
                </div>
                <p class="text-gray-700">{{ item.research_questions }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">[AI]研究方法</div>
                </div>
                <p class="text-gray-700">{{ item.research_methods }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">[AI]研究贡献</div>
                </div>
                <p class="text-gray-700">{{ item.research_contributions }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">[AI]研究局限</div>
                </div>
                <p class="text-gray-700">{{ item.research_limitations }}</p>
            </div>
            <div class=" flex flex-row space-x-4 mb-2">
                <div>
                    <div class=" font-semibold w-24">[AI]模型结构</div>
                </div>
                <p class="text-gray-700">{{ item.model_structure }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    data() {
        return {
            listData: []
        }
    },
    methods: {
        changeOptions(data) {
            this.listData = data;
        }
    }
}
</script>

<style scoped>
</style>