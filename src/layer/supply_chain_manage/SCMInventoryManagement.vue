<template>
    <div class=" cColPage overflow-y-auto">
        <div class=" cBlock">
            <div class=" cBlockTitle">数学建模方法</div>
            <Dropdown ref="SCMModellingMethodDropdown" />
            
            <div class=" mt-4 cBlockRow">
                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">状态变量</div>
                    <Dropdown ref="StatusVarDropdown"/>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">动作(决策)变量</div>
                    <Dropdown ref="ActionVarDropdown"/>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">目标函数</div>
                    <Dropdown ref="TargetFuncDropdown"/>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">状态转移方程</div>
                    <Dropdown ref="StateTransitionDropdown"/>
                </div>

            </div>

            <div class=" mt-4 cBlockRow">
                <div class=" cBlock">
                    <div class=" cBlockTitle">约束条件</div>
                    <CheckboxGroup ref="ConstraintCheckboxGroup"/>
                </div>
            </div>

            <div class=" mt-4 cBlockRow">
                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">策略学习方法</div>
                    <Dropdown ref="StrategicLearningDropdown"/>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">策略学习所用模型</div>
                    <Dropdown ref="StrategicLearningModelDropdown"/>
                </div>
            </div>

            <div class=" mt-4 cBlockRow">
                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">解决动作空间的组合优化方法</div>
                    <Dropdown ref="ActionCombinatorialOptimalDropdown"/>
                </div>

                <div class=" cSubBlock">
                    <div class=" cSubBlockTitle">组合优化所用模型</div>
                    <Dropdown ref="ActionCombinatorialOptimalModelDropdown"/>
                </div>
            </div>

        </div>

        <div class=" cBlock">
            <div class=" cBlockTitle">供应商</div>

            <LargeParamsInputs ref="SupplierParamsInputs" />
        </div>

        <div class=" cBlock">
            <div class=" cBlockTitle">仓库</div>

            <LargeParamsInputs ref="WarehouseParamsInputs" />
        </div>

        <div class=" cBlock">
            <div class=" cBlockTitle">零售商</div>
            <LargeParamsInputs ref="RetailerParamsInputs" />
            <div class=" cSubBlock">
                <div class=" cSubBlockTitle">需求状态</div>
                <Dropdown ref="RetailerDemandDropdown" @listen="changeRetailerDemand"/>
                <SmallParamsInputs ref="RetailerDemandParamsInputs" />
            </div>
        </div>
    </div>
</template>

<script>
import * as scm from '@/api/supply_chain_manage'

import Dropdown from '@/components/common/Dropdown.vue';
import LargeParamsInputs from '@/components/common/LargeParamsInputs.vue';
import SmallParamsInputs from '@/components/common/SmallParamsInputs.vue';
import CheckboxGroup from '@/components/common/CheckboxGroup.vue';

export default {
    name: 'SCMInventoryManagement',
    components: {
        Dropdown,
        LargeParamsInputs,
        SmallParamsInputs,
        CheckboxGroup,
    },
    data() {
        return {
            actionCombinatorialOptimalModelOptions: [
                {
                    "id": 0,
                    "label": "分支定界法+割平面法",
                    "name": "branch_demarcation_plus_cut_plane",
                },
                {
                    "id": 1,
                    "label": "隐枚举法",
                    "name": "hidden_enumeration",
                },
            ],
            actionCombinatorialOptimalOptions: [
                {
                    "id": 0,
                    "label": "整数规划(IP)",
                    "name": "IP",
                },
            ],
            strategicLearningModelOptions: [
                {
                    "id": 0,
                    "label": "PPO",
                    "name": "PPO",
                },
                {
                    "id": 1,
                    "label": "DQN",
                    "name": "DQN",
                },
                {
                    "id": 2,
                    "label": "SAC",
                    "name": "SAC",
                },
                {
                    "id": 3,
                    "label": "A2C",
                    "name": "A2C",
                },
            ],
            strategicLearningOptions: [
                {
                    "id": 0,
                    "label": "深度强化学习",
                    "name": "DRL",
                },
            ],
            constraintOptions: [
                {
                    "id": 0,
                    "label": "订货量限制",
                    "name": "order_limit",
                },
                {
                    "id": 1,
                    "label": "库存容量限制[零售商+仓库+在途]",
                    "name": "stock_limit",
                },
            ],
            statusVarOptions: [
                {
                    "id": 0,
                    "label": "库存水平[零售商+仓库]",
                    "name": "stock_num",
                },
            ],
            actionVarOptions: [
                {
                    "id": 0,
                    "label": "订货量[零售商+仓库]",
                    "name": "order_num",
                },
            ],
            targetFuncOptions: [
                {
                    "id": 0,
                    "label": "最大化长期折扣回报",
                    "name": "max_discounted_return",
                },
            ],
            stateTransitionOptions: [
                {
                    "id": 0,
                    "label": "需求更新+库存更新[零售商+仓库+在途]",
                    "name": "demand_update_plus_stock_update",
                },
            ],
            supplierParams: [
                {
                    "id": 0,
                    "label": "供应商数量",
                    "name": "supplier_num",
                    "value": 2
                },
                {
                    "id": 1,
                    "label": "供应商给出的订货固定成本",
                    "name": "supplier_order_fixed_cost",
                    "value": 4
                },
                {
                    "id": 2,
                    "label": "供应商-仓库所需交货时间",
                    "name": "supplier_to_warehouse_delivery_time",
                    "value": 3
                },
            ],

            warehouseParams: [
                {
                    "id": 0,
                    "label": "仓库数量",
                    "name": "warehouse_num",
                    "value": 3
                },
                {
                    "id": 1,
                    "label": "仓库最大容量",
                    "name": "warehouse_max_capacity",
                    "value": 100
                },
                {
                    "id": 2,
                    "label": "仓库最大订货量",
                    "name": "warehouse_max_order",
                    "value": 50
                },
                {
                    "id": 3,
                    "label": "仓库给出的订货固定成本",
                    "name": "warehouse_order_fixed_cost",
                    "value": 7
                },
                {
                    "id": 4,
                    "label": "仓库单位存储成本",
                    "name": "warehouse_unit_storage_cost",
                    "value": 2
                },
                {
                    "id": 5,
                    "label": "仓库-零售商所需交货时间",
                    "name": "warehouse_to_retailer_delivery_time",
                    "value": 2
                },
            ],

            retailerParams: [
                {
                    "id": 0,
                    "label": "零售商数量",
                    "name": "retailer_num",
                    "value": 4
                },
                {
                    "id": 1,
                    "label": "零售商商品售价",
                    "name": "retailer_unit_selling_price",
                    "value": 6
                },
                {
                    "id": 2,
                    "label": "零售商最大容量",
                    "name": "retailer_max_capacity",
                    "value": 100
                },
                {
                    "id": 3,
                    "label": "零售商最大订货量",
                    "name": "retailer_max_order",
                    "value": 50
                },
                {
                    "id": 4,
                    "label": "零售商单位存储成本",
                    "name": "retailer_unit_storage_cost",
                    "value": 3
                },
                {
                    "id": 5,
                    "label": "零售商单位缺货费用",
                    "name": "retailer_unit_stockout_cost",
                    "value": 10
                },
            ],

            retailerDemandOptions: [
                {
                    "id": 0,
                    "label": "确定性需求",
                    "name": "retailer_deterministic_demand"
                },
                {
                    "id": 1,
                    "label": "季节性需求",
                    "name": "retailer_seasonal_demand"
                },
                {
                    "id": 2,
                    "label": "随机性需求【泊松分布】",
                    "name": "retailer_stochastic_demand_poisson"
                },
                {
                    "id": 3,
                    "label": "随机性需求【均匀分布】",
                    "name": "retailer_stochastic_demand_uniform"
                },
                {
                    "id": 4,
                    "label": "随机性需求【正态分布】",
                    "name": "retailer_stochastic_demand_normal"
                },
                {
                    "id": 5,
                    "label": "随机性需求【指数分布】",
                    "name": "retailer_stochastic_demand_exponential"
                },
            ],

            retailerDemandOptionsValueDict: {
                "retailer_deterministic_demand": [
                    {
                        "id": 0,
                        "label": "需求速率",
                        "name": "demand_rate",
                        "value": 5
                    },
                ],
                "retailer_seasonal_demand": [
                    {
                        "id": 0,
                        "label": "周期长度",
                        "name": "cycle_len",
                        "value": 1000
                    },
                ],
                "retailer_stochastic_demand_poisson": [
                    {
                        "id": 0,
                        "label": "λ",
                        "name": "lambda",
                        "value": 6
                    },
                ],
                "retailer_stochastic_demand_uniform": [
                    {
                        "id": 0,
                        "label": "a",
                        "name": "a",
                        "value": 10
                    },
                    {
                        "id": 1,
                        "label": "b",
                        "name": "b",
                        "value": 20
                    },
                ],
                "retailer_stochastic_demand_normal": [
                    {
                        "id": 0,
                        "label": "均值μ",
                        "name": "mean",
                        "value": 5
                    },
                    {
                        "id": 1,
                        "label": "标准差σ",
                        "name": "standard_deviation",
                        "value": 8
                    },
                ],
                "retailer_stochastic_demand_exponential": [
                    {
                        "id": 0,
                        "label": "λ",
                        "name": "lambda",
                        "value": 6
                    },
                ],
            },

            modellingMethodOptions: [
                {
                    "id": 0,
                    "label": "马尔可夫决策过程(MDP)",
                    "name": "MDP"
                },
            ],
        }
    },
    mounted() {
        this.initConfig();
    },
    methods: {
        getSupplyChainConfig() {
            return JSON.parse(localStorage.getItem("supplyChainConfig"));
        },
        
        setSupplyChainConfig(supplyChainConfig) {
            localStorage.setItem("supplyChainConfig", JSON.stringify(supplyChainConfig));
        },

        changeRetailerDemand(option) {
            this.$refs.RetailerDemandParamsInputs.changeOptions(this.retailerDemandOptionsValueDict[option.name]);
        },

        getDefaultSupplyChainConfig() {
            this.$refs.SupplierParamsInputs.changeOptions(this.supplierParams);
            this.$refs.WarehouseParamsInputs.changeOptions(this.warehouseParams);
            this.$refs.RetailerParamsInputs.changeOptions(this.retailerParams);
            this.$refs.RetailerDemandDropdown.changeOptions(this.retailerDemandOptions);

            this.$refs.SCMModellingMethodDropdown.changeOptions(this.modellingMethodOptions);
            this.$refs.StatusVarDropdown.changeOptions(this.statusVarOptions);
            this.$refs.ActionVarDropdown.changeOptions(this.actionVarOptions);
            this.$refs.TargetFuncDropdown.changeOptions(this.targetFuncOptions);
            this.$refs.StateTransitionDropdown.changeOptions(this.stateTransitionOptions);
            this.$refs.ConstraintCheckboxGroup.changeOptions(this.constraintOptions);

            this.$refs.StrategicLearningDropdown.changeOptions(this.strategicLearningOptions);
            this.$refs.StrategicLearningModelDropdown.changeOptions(this.strategicLearningModelOptions);
            
            this.$refs.ActionCombinatorialOptimalDropdown.changeOptions(this.actionCombinatorialOptimalOptions);
            this.$refs.ActionCombinatorialOptimalModelDropdown.changeOptions(this.actionCombinatorialOptimalModelOptions);
        },

        initConfig() {
            if (this.getSupplyChainConfig() == null) {
                this.getDefaultSupplyChainConfig();
            }
        },
    }
}
</script>

<style>

</style>