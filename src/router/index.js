import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/layer/login/Login.vue'
import Material from '@/layer/display/Material.vue'
import Desktop from '@/layer/desktop/Desktop.vue'

import WC from '@/layer/web_crawl/WC.vue'
import WCTaskManage from '@/layer/web_crawl/WCTaskManage.vue'
import DA from '@/layer/data_analysis/DA.vue'
import DADataSetting from '@/layer/data_analysis/DADataSetting.vue'
import DAModelSetting from '@/layer/data_analysis/DAModelSetting.vue'
import DAModelTrain from '@/layer/data_analysis/DAModelTrain.vue'
import DADataVisualize from '@/layer/data_analysis/DADataVisualize.vue'
import KB from '@/layer/knowledge_base/KB.vue'
import KBDocManage from '@/layer/knowledge_base/KBDocManage.vue'
import KBGraphEdit from '@/layer/knowledge_base/KBGraphEdit.vue'
import KBTextEdit from '@/layer/knowledge_base/KBTextEdit.vue'
import KBPDFView from '@/layer/knowledge_base/KBPDFView.vue'
import SCM from '@/layer/supply_chain_manage/SCM.vue'
import SCMSupplyChainNetworkDesign from '@/layer/supply_chain_manage/SCMSupplyChainNetworkDesign.vue'
import SCMInventoryManagement from '@/layer/supply_chain_manage/SCMInventoryManagement.vue'
import SCMManufacturngPlanningAndScheduling from '@/layer/supply_chain_manage/SCMManufacturngPlanningAndScheduling.vue'
import SCMTransportAndLogistics from '@/layer/supply_chain_manage/SCMTransportAndLogistics.vue'
import SCMDemandForecasting from '@/layer/supply_chain_manage/SCMDemandForecasting.vue'
import SCMSupplyChainCoordinationAndContractDesign from '@/layer/supply_chain_manage/SCMSupplyChainCoordinationAndContractDesign.vue'
import SCMRiskManagement from '@/layer/supply_chain_manage/SCMRiskManagement.vue'
import PA from '@/layer/personal_achievement/PA.vue'
import Admin from '@/layer/admin/Admin.vue'

import SR from '@/layer/science_research/SR.vue'
import SRNetworkAnalysis from '@/layer/science_research/SRNetworkAnalysis.vue'
import SRMyTask from '@/layer/science_research/SRMyTask.vue'

import IM from '@/layer/image_management/IM.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/", 
            redirect: "/login",
        },
        {
            path: "/login", 
            name: "login",
            component: Login,
            meta: {
            }
        },

        {
            path: "/admin", 
            name: "admin",
            component: Admin,
            meta: {
                requireAuth: true,
            }
        },

        {
            path: "/im", 
            name: "im",
            component: IM,
            meta: {
                requireAuth: true,
            }
        },

        {
            path: "/supplyChainManage", 
            name: "supplyChainManage",
            component: SCM,
            children: [
                {path: "supplyChainNetworkDesign", name: "supplyChainNetworkDesign", component: SCMSupplyChainNetworkDesign},
                {path: "inventoryManagement", name: "inventoryManagement", component: SCMInventoryManagement},
                {path: "manufacturngPlanningAndScheduling", name: "manufacturngPlanningAndScheduling", component: SCMManufacturngPlanningAndScheduling},
                {path: "transportAndLogistics", name: "transportAndLogistics", component: SCMTransportAndLogistics},
                {path: "demandForecasting", name: "demandForecasting", component: SCMDemandForecasting},
                {path: "supplyChainCoordinationAndContractDesign", name: "supplyChainCoordinationAndContractDesign", component: SCMSupplyChainCoordinationAndContractDesign},
                {path: "riskManagement", name: "riskManagement", component: SCMRiskManagement},
            ],
            meta: {
                requireAuth: true,
            }
        },

        {
            path: "/webCrawl", 
            name: "webCrawl",
            component: WC,
            children: [
                {path: "taskManage", name: "taskManage", component: WCTaskManage},
            ],
            meta: {
                requireAuth: true,
            }
        },

        {
            path: "/knowledgeBase", 
            redirect: "/knowledgeBase/docManage",
        },
        {
            path: "/scienceResearch", 
            redirect: "/scienceResearch/myTask",
        },
        {
            path: "/dataAnalysis", 
            redirect: "/dataAnalysis/dataSetting",
        },

        {
            path: "/desktop", 
            redirect: "/scienceResearch/myTask",
        },

        {
            path: "/desktop", 
            name: "desktop",
            component: Desktop,
            meta: {
                requireAuth: true,
            },
            children: [
                {
                    path: "/knowledgeBase", 
                    name: "knowledgeBase",
                    component: KB,
                    children: [
                        {path: "docManage", name: "docManage", component: KBDocManage},
                        {path: "graphEdit", name: "graphEdit", component: KBGraphEdit},
                        {path: "textEdit", name: "textEdit", component: KBTextEdit},
                        {path: "pdfView", name: "pdfView", component: KBPDFView},
                    ],
                    meta: {
                        requireAuth: true,
                    }
                },
        
        
                {
                    path: "/scienceResearch", 
                    name: "scienceResearch",
                    component: SR,
                    children: [
                        {path: "myTask", name: "myTask", component: SRMyTask},
                        {path: "networkAnalysis", name: "networkAnalysis", component: SRNetworkAnalysis},
                    ],
                    meta: {
                        requireAuth: true,
                    }
                },
        
                {
                    path: "/dataAnalysis", 
                    name: "dataAnalysis",
                    component: DA,
                    children: [
                        {path: "dataSetting", name: "dataSetting", component: DADataSetting},
                        {path: "modelSetting", name: "modelSetting", component: DAModelSetting},
                        {path: "modelTrain", name: "modelTrain", component: DAModelTrain},
                        {path: "dataVisualize", name: "dataVisualize", component: DADataVisualize},
                    ],
                    meta: {
                        requireAuth: true,
                    }
                },

            ]
        },

        {
            path: '/personalAchievement',
            redirect: to => {
              // 手动重定向并传递查询参数
              return {
                path: '/knowledgeBase/textEdit',
                query: {
                  file_id: 'b9e766f1-7801-44b5-809a-0c9632c589a6',
                  editor_mode: 'preview'
                }
              };
            }
        },
    ]
})

export default router