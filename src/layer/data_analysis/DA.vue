<template>
    <SideNavigator
    :mainPath="'/dataAnalysis'"
    :pathList="pathList"
    />
</template>

<script>
import SideNavigator from '@/components/common/SideNavigator.vue'
import DADataSettingIcon from '@/icon/data_analysis/DADataSettingIcon.vue';
import DAModelSettingIcon from '@/icon/data_analysis/DAModelSettingIcon.vue';
import DAModelTrainIcon from '@/icon/data_analysis/DAModelTrainIcon.vue';
import DADataVisualizeIcon from '@/icon/data_analysis/DADataVisualizeIcon.vue';

export default {
    name: 'DA',
    components: {
        SideNavigator,
        DADataSettingIcon,
        DAModelSettingIcon,
        DAModelTrainIcon,
        DADataVisualizeIcon
    },
    data() {
        return {
            pathList: [
                {
                    route: "dataSetting",
                    label: "数据设定",
                    icon: DADataSettingIcon,
                },
                {
                    route: "modelSetting",
                    label: "模型设定",
                    icon: DAModelSettingIcon,
                },
                {
                    route: "modelTrain",
                    label: "模型训练",
                    icon: DAModelTrainIcon,
                },
                // {
                //     route: "dataVisualize",
                //     label: "数据可视化",
                //     icon: DADataVisualizeIcon,
                // },
            ],
        }
    },
}
</script>

<style>

</style>