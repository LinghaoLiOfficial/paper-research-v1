<template>
    <SideNavigator
    ref="KBSideNavigator"
    :mainPath="'/knowledgeBase'"
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
    name: 'KB',
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
                    route: "docManage",
                    label: "文件管理",
                    icon: KBDocManageIcon,
                },
                {
                    route: "graphEdit",
                    label: "图谱编辑",
                    icon: KBGraphEditIcon,
                },
                {
                    route: "textEdit",
                    label: "文档编辑",
                    icon: KBTextEditIcon,
                },
                {
                    route: "pdfView",
                    label: "PDF预览",
                    icon: KBPDFViewIcon,
                },
            ],
        }
    },
    mounted() {
        this.$refs.KBSideNavigator.hideNavigator();
    }
}
</script>

<style>

</style>