<template>
    <div class=" flex flex-col justify-center items-center">
        <div @click="onClick" class=" hover:border hover:rounded-2xl hover:border-dashed w-40 h-40 flex flex-col justify-center items-center space-y-3 cursor-pointer transition ease-in-out hover:scale-110 duration-300">
            <div v-if="color == 1" class=" bg-desktop_color_1 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center">
                <AINodeIcon class=" w-8 h-8 fill-neutral_color_9" />
            </div>
            <div v-else-if="color == 2" class=" bg-desktop_color_2 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center">
                <JigsawIcon class=" w-8 h-8 fill-neutral_color_9" />
            </div>
            <div v-else-if="color == 3" class=" bg-desktop_color_3 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center">
                <DeliveryVanIcon class=" w-8 h-8 fill-neutral_color_9" />
            </div>
            <div v-else-if="color == 4" class=" bg-desktop_color_4 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center">
                <CloudComputingIcon class=" w-8 h-8 fill-neutral_color_9" />
            </div>
            <div v-else-if="color == 5" class=" bg-desktop_color_5 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center">
                <AtomIcon class=" w-8 h-8 fill-neutral_color_9" />
            </div>
            <div v-else-if="color == 6" class=" bg-desktop_color_6 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center">
            </div>
            <div v-else-if="color == 7" class=" bg-desktop_color_7 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center"></div>
            <div v-else-if="color == 8" class=" bg-desktop_color_8 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center"></div>
            <div v-else-if="color == 9" class=" bg-desktop_color_9 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center"></div>
            <div v-else-if="color == 10" class=" bg-desktop_color_10 w-16 h-16 rounded-xl shadow-md flex flex-row items-center justify-center"></div>
            <div v-else class=" bg-desktop_color_10 w-16 h-16 rounded-xl shadow-md"></div>

            <div class=" w-40 text-neutral_color_8 text-sm font-medium italic bg-neutral_color_7/40 px-2 text-center">{{name}}</div>
        </div>
    </div>
</template>

<script>
import AINodeIcon from '@/icon/desktop/AINodeIcon.vue';
import JigsawIcon from '@/icon/desktop/JigsawIcon.vue';
import DeliveryVanIcon from '@/icon/desktop/DeliveryVanIcon.vue';
import CloudComputingIcon from '@/icon/desktop/CloudComputingIcon.vue';
import AtomIcon from '@/icon/desktop/AtomIcon.vue';

export default {
    name: 'Application',
    components: {
        AINodeIcon,
        JigsawIcon,
        DeliveryVanIcon,
        CloudComputingIcon,
        AtomIcon
    },
    props: [
        "name",
        "color",
        "label"
    ],
    methods: {
        onClick() {
            if (this.label == 1) {
                this.$router.push({path: "/dataAnalysis/dataSetting"});
            }
            else if (this.label == 2) {
                this.$router.push({path: "/knowledgeBase/docManage"});
            }
            else if (this.label == 3) {
                this.$router.push({path: "/supplyChainManage/supplyChainNetworkDesign"});
            }
            else if (this.label == 4) {
                this.$router.push({path: "/webCrawl/taskManage"});
            }
            else if (this.label == 5) {
                this.$router.push({path: "/scienceResearch/myTask"});
            }
            else {
                this.$message.warning("此程序尚未开放，敬请期待");
            }
        }
    }

}
</script>

<style>

</style>