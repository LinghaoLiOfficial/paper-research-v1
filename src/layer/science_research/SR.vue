<template>
    <SideNavigator
    ref="SRSideNavigator"
    :mainPath="'/scienceResearch'"
    :pathList="pathList"
    />
</template>

<script>
import SideNavigator from '@/components/common/SideNavigator.vue';
import KBDocManageIcon from '@/icon/knowledge_base/KBDocManageIcon.vue';
import KBGraphEditIcon from '@/icon/knowledge_base/KBGraphEditIcon.vue';
import KBTextEditIcon from '@/icon/knowledge_base/KBTextEditIcon.vue';
import KBPDFViewIcon from '@/icon/knowledge_base/KBPDFViewIcon.vue';

export default {
    name: 'SR',
    components: {
        SideNavigator,
        KBDocManageIcon,
        KBGraphEditIcon,
        KBTextEditIcon,
        KBPDFViewIcon
    },
    data() {
        return {
            pathList: [
                {
                    route: "myTask",
                    label: "我的任务",
                    icon: KBGraphEditIcon,
                },
                {
                    route: "networkAnalysis",
                    label: "网络分析",
                    icon: KBTextEditIcon,
                },
            ],
        }
    },
    mounted() {
        this.$refs.SRSideNavigator.hideNavigator();
    }
}
</script>

<style>

</style>