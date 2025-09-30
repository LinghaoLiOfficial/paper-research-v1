<template>
    <SideNavigator
    :mainPath="'/webCrawl'"
    :pathList="pathList"
    />
</template>

<script>
import SideNavigator from '@/components/common/SideNavigator.vue';
import WCTaskManageIcon from '@/icon/web_crawl/WCTaskManageIcon.vue';

export default {
    name: 'WC',
    components: {
        SideNavigator,
        WCTaskManageIcon
    },
    data() {
        return {
            pathList: [
                {
                    route: "taskManage",
                    label: "任务管理",
                    icon: WCTaskManageIcon,
                },
            ],
        }
    }
}
</script>

<style>

</style>