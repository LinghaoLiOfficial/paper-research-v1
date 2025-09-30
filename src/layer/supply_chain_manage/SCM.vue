<template>
    <SideNavigator
    :mainPath="'/supplyChainManage'"
    :pathList="pathList"
    />
</template>

<script>
import SideNavigator from '@/components/common/SideNavigator.vue'
import SCMSupplyChainNetworkDesignIcon from '@/icon/supply_chain_manage/SCMSupplyChainNetworkDesignIcon.vue';
import SCMInventoryManagementIcon from '@/icon/supply_chain_manage/SCMInventoryManagementIcon.vue';
import SCMManufacturngPlanningAndSchedulingIcon from '@/icon/supply_chain_manage/SCMManufacturngPlanningAndSchedulingIcon.vue';
import SCMTransportAndLogisticsIcon from '@/icon/supply_chain_manage/SCMTransportAndLogisticsIcon.vue';
import SCMDemandForecastingIcon from '@/icon/supply_chain_manage/SCMDemandForecastingIcon.vue';
import SCMSupplyChainCoordinationAndContractDesignIcon from '@/icon/supply_chain_manage/SCMSupplyChainCoordinationAndContractDesignIcon.vue';
import SCMRiskManagementIcon from '@/icon/supply_chain_manage/SCMRiskManagementIcon.vue';

export default {
    name: 'SCM',
    components: {
        SideNavigator,
        SCMSupplyChainNetworkDesignIcon,
        SCMInventoryManagementIcon,
        SCMManufacturngPlanningAndSchedulingIcon,
        SCMTransportAndLogisticsIcon,
        SCMDemandForecastingIcon,
        SCMSupplyChainCoordinationAndContractDesignIcon,
        SCMRiskManagementIcon
    },
    data() {
        return {
            pathList: [
                {
                    route: "supplyChainNetworkDesign",
                    label: "供应链网络设计",
                    icon: SCMSupplyChainNetworkDesignIcon,
                },
                {
                    route: "inventoryManagement",
                    label: "库存管理",
                    icon: SCMInventoryManagementIcon,
                },
                {
                    route: "manufacturngPlanningAndScheduling",
                    label: "生产计划与调度",
                    icon: SCMManufacturngPlanningAndSchedulingIcon,
                },
                {
                    route: "transportAndLogistics",
                    label: "运输与物流",
                    icon: SCMTransportAndLogisticsIcon,
                },
                {
                    route: "supplyChainCoordinationAndContractDesign",
                    label: "供应链协调与合同设计",
                    icon: SCMSupplyChainCoordinationAndContractDesignIcon,
                },
                {
                    route: "demandForecasting",
                    label: "需求预测",
                    icon: SCMDemandForecastingIcon,
                },
                {
                    route: "riskManagement",
                    label: "风险管理",
                    icon: SCMRiskManagementIcon,
                },
            ],
        }
    },
}
</script>

<style>

</style>