<template>
    <div class=" flex w-full h-full p-2">
        <div ref="graphContainer" class=" mr-2 h-full flex-1 border border-gray-300 rounded-lg"></div>
    
        <div class=" h-full w-80 flex flex-col ml-auto border border-slate-300 shadow-sm p-2 pt-8 rounded-xl">

            <div class=" flex flex-col">
                <div v-if="selectedNode" class="pb-2 ml-4 mb-6 text-xl font-SiyuanHei-Regula text-neutral_color_3">节点属性</div>
                <div v-if="selectedNode" class=" flex w-min px-3 py-1 ml-6 mb-2 flex-col items-center justify-center rounded-full" :style="{ backgroundColor: nodeColor[selectedNode['label']] }">
                    <p class=" text-sm font-SiyuanHei-Regula text-white font-semibold">{{selectedNode['label']}}</p>
                </div>
                <NodeInfoTable ref="NodeInfoTable" @update="update"></NodeInfoTable>
            </div>
            <div v-if="selectedNode" class=" flex flex-col flex-1">
                <div class=" flex flex-col items-center mt-auto mb-10">
                    <DeleteNodeButton :name="'删除'" @activate="deleteNode(selectedNode['id'])"></DeleteNodeButton>
                </div>
            </div>

            <div v-if="!selectedNode">
                <div class="pb-2 ml-4 mb-6 text-xl font-SiyuanHei-Regula text-neutral_color_3">概览</div>
                <div v-for="v, k in labelCount" :key="k" class=" flex w-min flex-row px-3 py-1 ml-6 mb-2 items-center justify-center rounded-full" :style="{ backgroundColor: nodeColor[k] }">
                    <div class=" flex flex-row">
                        <p class=" text-sm font-SiyuanHei-Regula text-white font-semibold">{{k}}</p>
                        <p class=" text-sm font-SiyuanHei-Regula text-white font-semibold">({{v}})</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import * as d3 from "d3";
import NodeInfoTable from '@/components/personal_study_boosting/NodeInfoTable.vue'
import DeleteNodeButton from "./DeleteNodeButton.vue";
import * as psb from '@/api/personal_study_boosting/psb'

export default {
    
    name: "KnowledgeGraph",

    components: {
        NodeInfoTable,
        DeleteNodeButton
    },

    data() {
        return {
            edgeLengthUnit: 100,
            edgeWidth: 2,
            nodeRadius: 50,
            nodeBorderWidth: 6,
            chosenBorderWidth: 12,

            displayInfoFilterList: [
                'label',
                'index',
                'x',
                'y',
                'vx',
                'vy',
                'name',
                'id',
                'momentum'
            ],

            nodes: [],
            links: {},
            nodeColor: null,
            nodeEdgeColor: null,
            labelCount: {},

            chosenNodeId: null,

            selectedNode: null, // 当前选中的节点
            svg: null,
            g: null,
            zoom: null
        };
    },

    methods: {

        async deleteNode(nodeId) {
            try {

                const resp = await psb.deleteNodeAPI(nodeId);
                const content = resp.data;

                if (content.check) {
                    this.$message.success("删除成功");
                    this.delete();
                }
                else {
                    this.$message.warning("删除失败");
                }

            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        changeGraph(nodes, links, nodeColor, nodeEdgeColor, labelCount) {
            
            this.nodes = nodes;
            this.links = links;
            this.nodeColor = nodeColor;
            this.nodeEdgeColor = nodeEdgeColor;
            this.labelCount = labelCount;

            this.createGraph();
        },

        displayNodeInfo() {
            let filteredObject = {"id": this.selectedNode["id"]};
            for (let k in this.selectedNode) {
                if (k.includes('name') && !k.includes('id') && !this.displayInfoFilterList.includes(k)) {
                    filteredObject[k] = this.selectedNode[k];
                }
            }

            let filteredObject1 = {};
            for (let k1 in this.selectedNode) {
                if (!k1.includes('name') && !k1.includes('id') && !this.displayInfoFilterList.includes(k1)) {
                    filteredObject1[k1] = this.selectedNode[k1];
                }
            }

            // 合并两个对象
            const mergedObject = { ...filteredObject, ...filteredObject1 };

            this.$refs.NodeInfoTable.changeTableData(mergedObject);
        },

        createGraph() {
            const width = this.$refs.graphContainer.clientWidth;
            const height = this.$refs.graphContainer.clientHeight;

            const borderRadius = this.nodeRadius + this.chosenBorderWidth / 2 + this.nodeBorderWidth / 2;

            this.svg = d3.select(this.$refs.graphContainer)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            this.g = this.svg.append("g");
  
            this.zoom = d3.zoom()
                // .scaleExtent([0.5, 5])
                .on("zoom", (event) => {
                this.g.attr("transform", event.transform);
                });

            this.svg.call(this.zoom);

            // 添加点击空白处清除选中节点的事件监听
            this.svg.on("click", () => {
                this.closeModal();
            });

            const link = this.g.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(this.links)
                .enter().append("line")
                .attr("stroke-width", this.edgeWidth)
                .attr("x1", d => this.getNodeById(d.source).x)
                .attr("y1", d => this.getNodeById(d.source).y)
                .attr("x2", d => this.getNodeById(d.target).x)
                .attr("y2", d => this.getNodeById(d.target).y);

            const nodeGroup = this.g.append("g")
                .selectAll("g")
                .data(this.nodes)
                .enter().append("g")
                .attr("cursor", "pointer")
                .on("mouseover", function () {
                    d3.select(this).select(".border-circle").attr("r", borderRadius); // 增加边框圆圈的半径
                })
                .on("mouseout", function () {
                    d3.select(this).select(".border-circle").attr("r", 0); // 恢复边框圆圈的半径
                })
                .on("click", (event, d) => {
                    event.stopPropagation(); // 阻止点击事件传播到父元素

                    this.showNodeDetails(d);
                });

            nodeGroup.append("circle")
                .attr("class", "border-circle")
                .attr("r", 0) // 边框圆圈的半径
                .attr("fill", "none") // 不填充颜色
                .attr("stroke", "#00D5D5") // 边框颜色
                .attr("stroke-opacity", 0.3)
                .attr("stroke-width", this.chosenBorderWidth); // 边框宽度

            nodeGroup.append("circle")
                .attr("r", this.nodeRadius) // 主圆圈的半径
                .attr("fill", d => this.nodeColor[d.label] || "#ccc")
                .attr("stroke", d => this.nodeEdgeColor[d.label] || "#ccc") // 边框颜色
                .attr("stroke-width", this.nodeBorderWidth); // 边框宽度

            nodeGroup.append("text")
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(d => d.name)
                .style("fill", "#333939")
                .style("pointer-events", "none") // 禁用文本点击事件，防止干扰节点点击
                .call(this.truncateText); // 应用文本截断

            const simulation = d3.forceSimulation(this.nodes)
                .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => Math.pow(2, d.momentum) * this.edgeLengthUnit))
                .force("charge", d3.forceManyBody().strength(-300))
                .force("center", d3.forceCenter(width / 2, height / 2));

            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                nodeGroup
                    .attr("transform", d => translate(${d.x},${d.y}));
            });

            if (this.chosenNodeId != null) {
                this.chooseNodeOnId(this.chosenNodeId);
            }
        },

        chooseNodeOnId(nodeId) {
            const node = this.OnNodeIdGetNode(nodeId);
            this.showNodeDetails(node);
        },

        // 处理文本溢出的函数
        truncateText(selection) {
            selection.each(function() {
                const text = d3.select(this);
                const textLength = text.node().getComputedTextLength();
                const maxLength = 50; // 最大长度（以像素为单位）

                if (textLength > maxLength) {
                text.text(function(d) {
                    return d.name.length > 16 ? d.name.slice(0, 16) + '...' : d.name;
                });
                }
            });
        },

        // 聚焦到特定节点的方法
        focusOnNode(node) {
            const scale = 1;  // 放大倍数

            const width = this.$refs.graphContainer.clientWidth;
            const height = this.$refs.graphContainer.clientHeight;

            const x = -node.x * scale + width / 2;
            const y = -node.y * scale + height / 2;

            // 使用d3.zoomIdentity和transform来平移和缩放
            this.svg.transition()
            .duration(750)
            .call(
                this.zoom.transform,
                d3.zoomIdentity.translate(x, y).scale(scale)
            );
        },

        getNodeById(id) {
            return this.nodes.find(node => node.id === id);
        },

        showNodeDetails(node) {
            this.selectedNode = node;

            this.focusOnNode(this.selectedNode); // 点击时聚焦到该节点
            this.displayNodeInfo();
        },
        
        closeModal() {
            this.selectedNode = null;
            this.$refs.NodeInfoTable.changeTableData({});
        },

        clearAll() {
            d3.select(this.$refs.graphContainer).selectAll('*').remove();
        },

        OnNodeIdGetNode(nodeId) {
            const node = this.nodes.find(node => node.id == nodeId);

            return node || null;
        },

        delete() {

            this.clearAll();

            this.selectedNode = null

            this.svg = null;
            this.g = null;
            this.zoom = null;

            this.$emit("getMyAllNodes");
        },

        update(nodeId) {

            this.chosenNodeId = null;

            this.clearAll();

            this.svg = null;
            this.g = null;
            this.zoom = null;

            this.$emit("getMyAllNodes");
        }

    }
};
</script>

<style scoped>

.node-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>
】