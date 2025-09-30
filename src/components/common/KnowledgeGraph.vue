<template>
  <div ref="mindmap" class=" mindmap-container w-full h-full overflow-hidden"></div>
</template>

<script>
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'KnowledgeGraph',
  props: {
    // 能否编辑
    canEdit: {
      type: Boolean,
      default: true
    },
    // 矩形初始宽度
    rectWidth: {
      type: Number,
      default: 200
    },
    // 能否编辑
    isKnowledgeGraph: {
      type: Boolean,
      default: false
    },
    // 节点是否移动到画布x轴的子节点中间
    willNodeMoveToXCenter: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      data: {},
      colors: [
        '#1783FF',
        '#F08F56',
        '#D580FF',
        '#00C9C9',
        '#7863FF',
        '#DB9D0D',
        '#60C42D',
        '#FF80CA',
        '#2491B3',
        '#17C76F',
      ],
      typeColors: {
        '关键词': '#8AD7A9',
        '论文': '#6BA2EC',
        'default': '#909399'
      },
      // 垂直间距
      verticalPitch: 50,
      // 水平间距
      horizontalPitch: this.rectWidth + 60,
      // 矩形初始高度
      rectHeight: 40,
      // 文本行高
      lineHeight: 1.2,
      // 文本字体大小
      fontSize: 12,
      // 行最小字符数
      minCharsPerLine: 5,
      // 缩放最小比例
      scaleMin: 0.1,
      // 缩放最大比例
      scaleMax: 10,

      // 单行文本所在矩形的高度
      singleLineTextRectHeight: null,
      selectedNode: null,
      svg: null,
      g: null,
      root: null,
      treeLayout: null,
      colorMap: null,
      screenWidth: null,
      screenHeight: null,
      isEditing: false
    };
  },
  mounted() {
  },
  beforeDestroy() {
    // 关闭键盘监听
    document.removeEventListener('keydown', this.handleKeydown);
    // 关闭剪贴板监听
    if (this.canEdit) {
      document.removeEventListener('paste', this.handlePasteImage);
    }
    // 清除所有图内容
    this.clearAll();
  },
  methods: {
    changeData() {
      this.$emit("listen", this.data);
    },
    listenImage(formData) {
      this.$emit("listenImage", formData);
    },
    init(data) {
      // 清除所有图内容
      this.clearAll();

      this.data = data;

      // 初始化图谱
      this.initMindMap();
      // 开启键盘监听
      document.addEventListener('keydown', this.handleKeydown);
      // 开启剪贴板监听
      if (this.canEdit) {
        document.addEventListener('paste', this.handlePasteImage);
      }
    },
    // 清除全部
    clearAll() {
      // 清空所有全局变量
      this.data = {}
      this.svg = null;
      this.g = null;
      this.root = null;
      this.treeLayout = null;
      this.colorMap = null;
      this.selectedNode = null;
      this.screenWidth = null;
      this.screenHeight = null;
      this.isEditing = false;

      // 清空现有D3图形
      d3.select(this.$refs.mindmap).selectAll('*').remove();
    },
    // 删除节点
    deleteNode() {
      // 找到当前选中节点在 this.data 中的对应节点
      const selectedDataNode = this.findDataNode(this.data, this.selectedNode.data);
      // 找到对应父节点
      const parentDataNode = this.findParentDataNode(this.data, selectedDataNode);

      if (parentDataNode && parentDataNode.children) {
        // 从父节点的 children 中移除选中的节点
        const index = parentDataNode.children.indexOf(selectedDataNode);
        if (index !== -1) {
          parentDataNode.children.splice(index, 1);
        }
      }

      // 更新图谱
      this.updateMindMap();

      // 将选中的节点设置为父节点
      if (this.selectedNode.parent) {
        this.selectedNode = this.selectedNode.parent;
      } else {
        // 如果没有父节点（例如根节点），则清空选中的节点
        this.selectedNode = null;
      }

      this.changeData();

      // 移除所有节点的框选样式
      this.g.selectAll('.background-rect').classed('background-rect-selected', false);
      // 为当前节点的透明矩形添加框选样式
      if (this.selectedNode) {
        d3.select(`.node-${this.selectedNode.data.id}`).select('.background-rect').classed('background-rect-selected', true);
      }

    },
    // 处理剪贴板图片粘贴
    async handlePasteImage() {

      const that = this;

      try {
        // 从剪贴板读取数据
        const clipboardItems = await navigator.clipboard.read();
        // 获取图片名字
        const imageName = `${uuidv4()}.png`;
        let blob;
        for (const item of clipboardItems) {
          // 查找图片类型的数据
          const imageType = item.types.find(type => type.startsWith('image/'));
          if (imageType) {
            blob = await item.getType(imageType); // 获取图片的 Blob 数据
            const reader = new FileReader(); // 创建文件读取器

            // 读取图片文件为 Data URL
            let imageUrl;
            reader.onload = (e) => {
              imageUrl = e.target.result; // 获取图片的 Data URL

              // 创建 Image 对象以获取图片的真实尺寸
              const img = new Image();
              img.src = imageUrl;

              img.onload = () => {
                // 获取图片的真实宽高
                const imageWidth = that.rectWidth - 20;
                const imageHeight = imageWidth / img.width * img.height;

                // 创建新的图片节点
                const newNode = {
                  id: uuidv4(),
                  imageUrl: imageUrl,
                  imageName: imageName,
                  imageWidth: imageWidth,
                  imageHeight: imageHeight,
                  local: true,
                };

                // 找到当前选中节点在 this.data 中的对应节点
                const selectedDataNode = this.findDataNode(this.data, this.selectedNode.data);

                // 将新节点添加到当前选中节点的子节点中
                if (selectedDataNode && selectedDataNode.children) {
                  selectedDataNode.children.push(newNode);
                } else if (selectedDataNode) {
                  selectedDataNode.children = [newNode];
                }

                // 更新图谱
                this.updateMindMap();

                // 选择新节点
                this.selectedNode = this.root.descendants().find(d => d.data === newNode);
                // 移除所有节点的框选样式
                this.g.selectAll('.background-rect').classed('background-rect-selected', false);
                // 为当前节点的透明矩形添加框选样式
                d3.select(`.node-${this.selectedNode.data.id}`)
                  .select('.background-rect')
                  .classed('background-rect-selected', true);
              };

              // 图片加载错误反馈
              img.onerror = (error) => {
                console.error('图片加载失败:', error);
              };
            };

            // 读取图片文件
            reader.readAsDataURL(blob);

            // 上传图片
            const formData = new FormData();
            formData.append('file', blob, imageName); // 添加图片文件到 FormData

            this.listenImage(formData);
            setTimeout(() => {
              this.changeData();
            }, 100);

            // 只处理第一个图片
            break; 
          }
        }

      } catch (error) {
        console.error('读取剪贴板数据时发生错误:', error);
        this.$message.error('粘贴图片失败，请重试');
      }
    },
    // 在当前节点后面插入新的节点
    insertCurrentLayerNextNode() {

      const newNode = {
        id: uuidv4(),
        label: '新节点'
      };

      // 找到当前选中节点在 this.data 中的对应节点
      const selectedDataNode = this.findDataNode(this.data, this.selectedNode.data);
      // 找到对应父节点
      const parentDataNode = this.findParentDataNode(this.data, selectedDataNode);

      if (parentDataNode) {
        const index = parentDataNode.children.indexOf(selectedDataNode);
        if (index !== -1) {
          parentDataNode.children.splice(index + 1, 0, newNode);
        } else {
          parentDataNode.children.push(newNode);
        }
      } else {
        // 如果是根节点不添加新的节点
      }

      // 更新图谱
      this.updateMindMap();

      // 选择新节点
      this.selectedNode = this.root.descendants().find(d => d.data === newNode);
      // 移除所有节点的框选样式
      this.g.selectAll('.background-rect').classed('background-rect-selected', false);
      // 为当前节点的透明矩形添加框选样式
      d3.select(`.node-${this.selectedNode.data.id}`).select('.background-rect').classed('background-rect-selected', true);

      // 进入编辑模式
      this.editText(d3.select(`.node-${this.selectedNode.data.id}`), this.selectedNode);

    },
    // 在下一层级末尾插入新的节点
    insertNextLayerNode() {

      const newNode = {
        id: uuidv4(),
        label: '新节点'
      };

      // 找到当前选中节点在 this.data 中的对应节点
      const selectedDataNode = this.findDataNode(this.data, this.selectedNode.data);

      if (selectedDataNode && selectedDataNode.children) {
        selectedDataNode.children.push(newNode);
      } else if (selectedDataNode) {
        selectedDataNode.children = [newNode];
      }

      // 更新图谱
      this.updateMindMap();

      // 选择新节点
      this.selectedNode = this.root.descendants().find(d => d.data === newNode);
      // 移除所有节点的框选样式
      this.g.selectAll('.background-rect').classed('background-rect-selected', false);
      // 为当前节点的透明矩形添加框选样式
      d3.select(`.node-${this.selectedNode.data.id}`).select('.background-rect').classed('background-rect-selected', true);

      // 进入编辑模式
      this.editText(d3.select(`.node-${this.selectedNode.data.id}`), this.selectedNode);

    },
    // 在data中查找相应文本的节点
    findDataNode(dataNode, targetNode) {
      if (dataNode === targetNode) {
        return dataNode;
      }
      if (dataNode.children) {
        for (const child of dataNode.children) {
          const result = this.findDataNode(child, targetNode);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
    // 寻找父节点
    findParentDataNode(dataNode, targetNode) {
      if (dataNode.children && dataNode.children.includes(targetNode)) {
        return dataNode;
      }
      if (dataNode.children) {
        for (const child of dataNode.children) {
          const result = this.findParentDataNode(child, targetNode);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
    // 处理键盘监听
    handleKeydown(event) {

      // 添加方向键处理逻辑
      if (event.key === 'ArrowLeft' && this.selectedNode && !this.isEditing) {
        event.preventDefault();
        // 左方向键选中当前节点的父节点
        if (this.selectedNode.parent) {
          this.selectedNode = this.selectedNode.parent;
          // 移除所有节点的框选样式
          this.g.selectAll('.background-rect').classed('background-rect-selected', false);
          // 为当前节点的透明矩形添加框选样式
          if (this.selectedNode) {
            d3.select(`.node-${this.selectedNode.data.id}`).select('.background-rect').classed('background-rect-selected', true);
          }
        }
      } else if (event.key === 'ArrowRight' && this.selectedNode && !this.isEditing) {
        event.preventDefault();
        // 右方向键选中当前节点的第一个子节点
        if (this.selectedNode.children && this.selectedNode.children.length > 0) {
          this.selectedNode = this.selectedNode.children[0];
          // 移除所有节点的框选样式
          this.g.selectAll('.background-rect').classed('background-rect-selected', false);
          // 为当前节点的透明矩形添加框选样式
          if (this.selectedNode) {
            d3.select(`.node-${this.selectedNode.data.id}`).select('.background-rect').classed('background-rect-selected', true);
          }
        }
      } else if (event.key === 'ArrowUp' && this.selectedNode && !this.isEditing) {
        event.preventDefault();
        // 上方向键选中当前节点的上一个兄弟节点
        const siblings = this.selectedNode.parent ? this.selectedNode.parent.children : [];
        const index = siblings.indexOf(this.selectedNode);
        if (index > 0) {
          this.selectedNode = siblings[index - 1];
          // 移除所有节点的框选样式
          this.g.selectAll('.background-rect').classed('background-rect-selected', false);
          // 为当前节点的透明矩形添加框选样式
          if (this.selectedNode) {
            d3.select(`.node-${this.selectedNode.data.id}`).select('.background-rect').classed('background-rect-selected', true);
          }
        }
      } else if (event.key === 'ArrowDown' && this.selectedNode && !this.isEditing) {
        event.preventDefault();
        // 下方向键选中当前节点的下一个兄弟节点
        const siblings = this.selectedNode.parent ? this.selectedNode.parent.children : [];
        const index = siblings.indexOf(this.selectedNode);
        if (index < siblings.length - 1) {
          this.selectedNode = siblings[index + 1];
          // 移除所有节点的框选样式
          this.g.selectAll('.background-rect').classed('background-rect-selected', false);
          // 为当前节点的透明矩形添加框选样式
          if (this.selectedNode) {
            d3.select(`.node-${this.selectedNode.data.id}`).select('.background-rect').classed('background-rect-selected', true);
          }
        }
      }
      // 编辑需要权限
      else if (this.canEdit) {
        if (event.key === 'Tab' && this.selectedNode && !this.isEditing) {
          event.preventDefault();
          this.insertNextLayerNode();
        }
        else if (event.key === 'Enter' && this.selectedNode && !this.isEditing && this.selectedNode.parent) {
          event.preventDefault();
          this.insertCurrentLayerNextNode();
        }
        else if (event.key === 'Backspace' && this.selectedNode && !this.isEditing) {

          // 根节点删除判断
          if (!this.selectedNode.parent) {
            this.$message.warning("根节点无法直接删除");
            return;
          }

          event.preventDefault();
          this.deleteNode();
        }
        else if (event.ctrlKey && event.key === 'v' && this.selectedNode && !this.isEditing) {

          event.preventDefault();
          this.handlePasteImage();
        }
        else if (this.selectedNode && this.selectedNode.data.imageUrl && !this.isEditing) {
          // 处理图片放大缩小
          const imageElement = d3.select(`.node-${this.selectedNode.data.id}`).select('image');
          const currentWidth = parseFloat(imageElement.attr('width'));
          const currentHeight = parseFloat(imageElement.attr('height'));
          const currentX = parseFloat(imageElement.attr('x'));
          const currentY = parseFloat(imageElement.attr('y'));

          if (event.key === 'w') {
            // 放大图片
            const newWidth = currentWidth * 1.1;
            const newHeight = currentHeight * 1.1;
            
            // 计算新的x和y坐标，使图片居中缩放
            const newX = currentX - (newWidth - currentWidth) / 2;
            const newY = currentY - (newHeight - currentHeight) / 2;

            imageElement
              .attr('width', newWidth)
              .attr('height', newHeight)
              .attr('x', newX)
              .attr('y', newY);

          } else if (event.key === 's') {
            // 缩小图片
            const newWidth = currentWidth * 0.9;
            const newHeight = currentHeight * 0.9;
            
            // 计算新的x和y坐标，使图片居中缩放
            const newX = currentX + (currentWidth - newWidth) / 2;
            const newY = currentY + (currentHeight - newHeight) / 2;

            imageElement
              .attr('width', newWidth)
              .attr('height', newHeight)
              .attr('x', newX)
              .attr('y', newY);
          }

        }

      }
    },
    // 聚集到特定节点
    moveNodeToCenter(node) {
      if (node == null) {
        return;
      }

      const scale = 1;

      const nodeX = node.x;
      const nodeY = node.y;

      const centerX = this.screenWidth / 2;
      const centerY = this.screenHeight / 2;

      const translateX = centerX - nodeY * scale; // 考虑缩放
      const translateY = centerY - nodeX * scale;

      const transform = d3.zoomIdentity
        .translate(translateX, translateY)
        .scale(scale); // 应用缩放

      // 使用过渡实现动画效果
      this.svg.transition()
          .duration(700) // 动画时长（毫秒）
          .call(d3.zoom().transform, transform);

      this.g.attr('transform', transform.toString());
    },
    // 编辑节点的文本
    editText(node, d) {

      // 获取text文本信息
      const textElement = node.select('text');
      
      const textBBox = textElement.node().getBBox();

      // 删除现有的文本元素
      textElement.remove();

      //创建foreignObject用于嵌入HTML
      const fo = node.append('foreignObject')
        .attr('x', -this.rectWidth / 2)
        .attr('y', textBBox.y - 10)
        .attr('width', this.rectWidth)
        .attr('height', textBBox.height + 20);

      //创建textarea用于编辑
      const textarea = fo.append('xhtml:textarea')
        .attr('class', 'node-edit-textarea')
        .style('width', '100%')
        .style('height', '100%')
        .style('border', 'none')
        .style('padding', '4px')
        .style('font-size', `${this.fontSize}px`)
        .style('resize', 'none')
        .style('outline', 'none')
        .style('background', 'transparent')
        .style('box-sizing', 'border-box')
        .text(d.data.label); // 设置初始文本

      this.isEditing = true;

      // 聚焦文本
      textarea.node().focus();
      // 选中文本
      textarea.node().select();

      textarea.on('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault(); // 阻止默认换行行为
          textarea.node().blur(); // 触发失焦事件
        }
      });

      // 监听textarea的失焦事件，箭头函数可确保this指向Vue实例
      textarea.on('blur', () => {
        const newText = textarea.node().value;
        d.data.label = newText;
        // 移除 foreignObject
        fo.remove();

        this.updateMindMap();

        this.changeData();

        setTimeout(() => {
          this.isEditing = false
        });
      }, 100);

    },
    // 更新root和data变量【实现数据合并】
    updateRootAndData() {
      // 临时保存旧节点的属性
      const oldNodeMap = new Map();
      if (this.root) {
        this.root.descendants().forEach(d => {
          oldNodeMap.set(d.data.id, {
            actualHeight: d.actualHeight,
            x: d.x,
            y: d.y
          })
        })
      };

      // 生成新root
      this.root = d3.hierarchy(this.data);

      // 合并旧节点属性到新root
      if (oldNodeMap.size > 0) {
        this.root.descendants().forEach(d => {
          const oldNode = oldNodeMap.get(d.data.id);
          if (oldNode) {
            // 保留已有属性
            d.actualHeight = oldNode.actualHeight;
            d.x = oldNode.x;
            d.y = oldNode.y;
          }
        })
      }

      // 仅对新分支应用布局计算
      this.treeLayout(this.root);

    },
    // 初始化配置svg和g
    setupGraph() {

      this.screenWidth = this.$refs.mindmap.clientWidth;
      this.screenHeight = this.$refs.mindmap.clientHeight;

      this.svg = d3.select(this.$refs.mindmap)
        .append('svg')
        .attr('width', this.screenWidth)
        .attr('height', this.screenHeight)
        // 添加缩放事件
        .call(
          d3.zoom()
            .scaleExtent([this.scaleMin, this.scaleMax])
            .on('zoom', (event) => {
              this.g.attr('transform', event.transform);
            })
        )
        // 添加屏幕空白处单击事件
        .on('click', (event) => {
          // 如果点击的不是节点或连接线，则取消框选
          if (!event.target.classList.contains('node') && !event.target.classList.contains('link')) {
            this.selectedNode = null;
            this.g.selectAll('.background-rect').classed('background-rect-selected', false);
          }
        });

      // 创建 g 元素，用于包裹所有节点和连接线
      this.g = this.svg.append('g');

      // 设置图的布局
      this.treeLayout = d3.tree()
        .nodeSize([this.verticalPitch, this.horizontalPitch]);

    },
    // 更新颜色分配
    updateColorMap() {
      // 为每个分支的节点簇分配颜色

      this.colorMap = new Map();
      let colorIndex = 0;

      // 如果只有一个根节点不需要设定颜色
      if (!("children" in this.root)) {
        return;
      }

      this.root.children.forEach(child => {
        const color = this.colors[colorIndex % this.colors.length];
        this.colorMap.set(child, color);
        colorIndex++;
        child.descendants().forEach(descendant => {
          if (descendant !== child) {
            this.colorMap.set(descendant, color);
          }
        });
      });
    },
    // 更新绘制节点
    updateDrawNodes() {
      const that = this;

      // 绑定数据并处理新增、更新和移除的节点
      this.g.selectAll('.node')
        .data(this.root.descendants(), d => d.data.id)
        .join(
          enter => {
            // 处理新增节点
            const newNodes = enter.append('g')
              .attr('class', d => `node node-${d.data.id}`)
              .on('mouseover mouseout mouseup mousedown', (event) => {
                event.stopPropagation();
              })
              .on('click', function (event, d) {
                // 选择节点
                event.stopPropagation();
                that.selectedNode = d;

                // 移除所有节点的框选样式
                that.g.selectAll('.background-rect').classed('background-rect-selected', false);
                // 为当前节点的透明矩形添加框选样式
                d3.select(this).select('.background-rect').classed('background-rect-selected', true);

                // 调用外部的节点选择函数
                if (that.isKnowledgeGraph) {
                  that.$emit("clickNode", that.selectedNode);
                }
              })
              .on('dblclick', function (event, d) {
                if (that.canEdit) {
                  event.stopPropagation();

                  // 编辑节点文本
                  if (that.canEdit) {
                    that.editText(d3.select(this), d);
                  }
                }
              });

            // 绘制新增节点的矩形和文本
            this.updateDrawNodeRect(newNodes);

            this.updateDrawTextOrImage(newNodes);

            if (this.isKnowledgeGraph) {
              // 绘制类型标签
              newNodes.each(function(d) {
                // 类型标签容器
                const tag = d3.select(this).append('g')
                  .attr('class', 'node-type-tag')
                  .attr('transform', (d) => {
                    return `translate(${-that.rectWidth / 2 - 10},${-20 - 10})`;
                  })
                // 背景圆角矩形
                tag.append('rect')
                  .attr('rx', 8)
                  .attr('ry', 8)
                  .attr('height', 20)
                  .attr('fill', d => that.typeColors[d.data.type] || that.typeColors.default)

                // 类型文本
                tag.append('text')
                  .attr('x', 8)
                  .attr('y', 14)
                  .style('font-size', '10px')
                  .style('fill', 'black')
                  .text(d.data.type || ' ');

                // 动态调整宽度
                const textNode = tag.select('text').node();
                if (textNode) {
                  const textWidth = textNode.getComputedTextLength();
                  tag.select('rect').attr('width', textWidth + 16);
                };

              });

              // 绘制权重标签
              newNodes.each(function(d) {
                // 权重标签容器
                const tag = d3.select(this).append('g')
                  .attr('class', 'node-weight-tag')
                  .attr('transform', (d) => {
                    return `translate(${-that.rectWidth / 2 + 50},${-20 - 10})`;
                  })
                // 背景圆角矩形
                tag.append('rect')
                  .attr('rx', 8)
                  .attr('ry', 8)
                  .attr('height', 20)
                  .attr('fill', d => that.typeColors[d.data.type] || that.typeColors.default)

                // 类型文本
                tag.append('text')
                  .attr('x', 8)
                  .attr('y', 14)
                  .style('font-size', '10px')
                  .style('fill', 'black')
                  .text(d.data.weight || ' ');

                // 动态调整宽度
                const textNode = tag.select('text').node();
                if (textNode) {
                  const textWidth = textNode.getComputedTextLength();
                  tag.select('rect').attr('width', textWidth + 16);
                };

              });
            }

            return newNodes;
          },
          update => {

            if (this.isKnowledgeGraph) {
              // 更新类型标签
              update.select('.node-type-tag').each(function(d) {
                const tag = d3.select(this);
                tag.select('text').text(d.data.type || ' ');
                
                const textNode = tag.select('text').node();
                if (textNode) {
                  const textWidth = textNode.getComputedTextLength();
                  tag.select('rect').attr('width', textWidth + 16);
                }
              });

              // 更新权重标签
              update.select('.node-weight-tag').each(function(d) {
                const tag = d3.select(this);
                tag.select('text').text(d.data.weight || ' ');
                
                const textNode = tag.select('text').node();
                if (textNode) {
                  const textWidth = textNode.getComputedTextLength();
                  tag.select('rect').attr('width', textWidth + 16);
                }
              });
            }

            // 处理更新节点
            this.updateDrawTextOrImage(update);

            return update;
          },
          exit => {
            // 处理移除节点
            return exit.remove();
          }
        );
    },
    // 更新绘制节点矩形
    updateDrawNodeRect(nodes) {

      const that = this;

      nodes.each(function(d) {

        d3.select(this).append('rect')
        .attr('class', 'background-rect')
        .attr('width', that.rectWidth) // 使用变量设置矩形宽度
        .attr('height', that.rectHeight) // 矩形高度
        .attr('x', -that.rectWidth / 2) // 水平居中
        .attr('y', -that.rectHeight / 2) // 垂直居中
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('fill-opacity', 0.2) // 设置背景不透明度
        .attr('stroke', 'none'); // 去掉边框
      })

      // 更新所有节点的背景矩形颜色
      this.g.selectAll('.node').select('rect')
        .attr('fill', d => this.colorMap.get(d) || '#ccc');

    },
    // 更新绘制节点的文本或图片
    updateDrawTextOrImage(nodes) {

      const that = this;

        // 添加文字（支持分段）
        nodes.each(function (d) {
          
          // 如果有图片只绘制图片
          if (d.data.imageUrl) {
            
            // 使用本地blob还是后端图片
            const xlink = d.data.local ? d.data.imageUrl : `${process.env.VUE_APP_FLASK_API}/${d.data.imageUrl}`;

            d3.select(this).append('image')
              .attr('xlink:href', xlink)
              .attr('x', -that.rectWidth / 2 + 10)
              .attr('y', -that.rectHeight / 2 + 10)
              .attr('width', d.data.imageWidth)
              .attr('height', d.data.imageHeight);

            d3.select(this).select('rect')
              .attr('height', parseFloat(d.data.imageHeight) + 20);

            // 保存实际高度以便于连接线的位置计算
            d.actualHeight = parseFloat(d.data.imageHeight) + 20;

          }
          else {

            const node = d3.select(this);

            // 更新多段文本
            const textElement = that.updateMultipleText(d, node);

            // 动态获取文本的实际尺寸
            const bbox = textElement.node().getBBox();
            const currentHeight = bbox.height;

            // 获取单行文字所在矩形高度
            if (that.singleLineTextRectHeight === null && currentHeight - 15 < 1) {
              that.singleLineTextRectHeight = that.rectHeight + currentHeight - 15;
            }

            d3.select(this).select('text')
              .attr('height', that.rectHeight + currentHeight - 15);
            d3.select(this).select('rect')
              .attr('height', that.rectHeight + currentHeight - 15);

            // 保存实际高度以便于连接线的位置计算
            d.actualHeight = that.rectHeight + currentHeight - 15;
          }
          
        });

    },
    // 绘制连接线
    drawLines() {

      // 清空之前存在的连接线
      this.g.selectAll('.link').remove();

      // 自定义连接线逻辑（改为曲线）
      const links = this.g.selectAll('.link')
      .data(this.root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('stroke-width', 2)
      .attr('stroke', d => this.colorMap.get(d.target) || '#ccc')
      .attr('d', d => {

        const parentX = d.source.y + this.rectWidth / 2;
        const parentY = d.source.x + (d.source.actualHeight - this.rectHeight) / 2;
        const childX = d.target.y - this.rectWidth / 2;
        const childY = d.target.x + (d.target.actualHeight - this.rectHeight) / 2;

        // 使用 d3.path() 绘制贝塞尔曲线
        const path = d3.path();
        path.moveTo(parentX, parentY); // 起点
        path.bezierCurveTo(
          parentX + 50, parentY, // 控制点 1：向右延伸
          childX - 50, childY, // 控制点 2：向左延伸
          childX, childY // 终点
        );
        return path.toString();
      });
    },
    // 调整布局所用递归调整所有子节点
    recurrentMoveNodeAndChildren(node, offset) {
      // 移动当前节点
      // 横向树布局x和y交换
      node.x += offset;

      // 递归修改子节点
      if (node.children) {
        node.children.forEach(child => {
          this.recurrentMoveNodeAndChildren(child, offset);
        });
      }

    },
    // 文本块变化后重新调整图布局
    adjustLayout() {

      const that = this;

      // 按深度分组
      const depthGroups = {};
      d3.selectAll('.node').each(function(d) {
        const depth = d.depth;
        if (!depthGroups[depth]) {
          depthGroups[depth] = [];
        }
        depthGroups[depth].push(d);
      });

      // 获取所有深度并按从大到小排序
      const depths = Object.keys(depthGroups).sort((a, b) => b - a);

      // 从深到浅遍历层级
      depths.forEach(depth => {

        // 跳过根节点
        if (depth === 0) return;

        // 当前深度的所有节点
        const nodesAtDepth = depthGroups[depth];
        // 当前深度的节点总数
        const siblingCount = nodesAtDepth.length;

        // 遍历当前深度的每个节点
        nodesAtDepth.forEach((node, index) => {
          const currentHeight = d3.select(`.node-${node.data.id}`).select('rect').attr('height');

          // 只更改多段文本节点
          if (currentHeight > that.singleLineTextRectHeight) {
            const offset = currentHeight - that.singleLineTextRectHeight;

            // 判断当前节点在当前深度的位置
            if (index < siblingCount / 2) {
              // 如果节点在当前深度的上半部分，则向上移动
              // 移动当前节点及其子节点
              that.recurrentMoveNodeAndChildren(node, -offset);

              // 移动当前深度上方的所有节点及其子节点
              for (let i = 0; i < index; i++) {
                const siblingNode = nodesAtDepth[i];
                that.recurrentMoveNodeAndChildren(siblingNode, -offset);
              }
            } else {
              // 如果节点在当前深度的下半部分，则向下移动

              // 移动当前深度下方的所有节点及其子节点
              for (let i = index + 1; i < siblingCount; i++) {
                const siblingNode = nodesAtDepth[i];
                that.recurrentMoveNodeAndChildren(siblingNode, offset);
              }
            }
          }
        })
      });

      // 调整每个节点的x值为子节点平均
      if (this.willNodeMoveToXCenter) {
        this.root.descendants().reverse().forEach(node => {
          if (node.children?.length > 0) {
            // 计算子节点的垂直中心点（考虑各自高度）
            const childCenters = node.children.map(child => 
              child.x + child.actualHeight / 2
            );
            const avgCenter = d3.mean(childCenters);

            // 计算父节点需要的左上角坐标（使父节点中心对齐子节点平均中心）
            node.x = avgCenter - node.actualHeight / 2;
          }
        });
      }

      // 更新节点位置
      // 横向树布局交换x和y
      this.svg.selectAll('.node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

      // 更新连接线
      this.drawLines();

    },
    // 初始化图谱
    initMindMap() {
      this.setupGraph();
      
      this.updateMindMap();

      this.moveNodeToCenter(this.root);
    },
    // 更新图谱
    async updateMindMap() {
      this.updateRootAndData();

      this.updateColorMap();
      this.updateDrawNodes();

      this.adjustLayout();
    },
    // 更新多段文本
    updateMultipleText(d, node) {
      const text = d.data.label.trim(); // 节点的文本内容
      const maxCharsPerLine = Math.floor((this.rectWidth - 20) / (this.fontSize * 0.6)); // 动态计算每行最大字符数
      let lineCount = 0;

      // 先删除原有旧文本
      node.select('text').remove();

      // 创建文本元素
      const textElement = node.append('text')
        .attr('text-anchor', 'middle') // 文本水平居中
        .attr('dy', '0.31em') // 文本垂直对齐（微调）
        .attr('fill', '#000') // 文本颜色
        .on('mouseover mouseout mouseup mousedown', (event) => {
            event.stopPropagation();
          })
        .on('dblclick', function(event, d) {
          // 有编辑权限才能编辑文本
          if (this.canEdit) {
            event.stopPropagation();
            this.editText(d3.select(this.parentNode), d);
          }
        });

      // 根据节点层级设置字体大小和加粗样式
      if (d.depth === 0) {
        // 根节点：字体增大加粗
        textElement.style('font-size', '12px').style('font-weight', 'normal');
      } else if (d.depth === 1) {
        // 第二层节点：字体稍大稍加粗
        textElement.style('font-size', '12px').style('font-weight', 'normal');
      } else {
        // 其他节点：保持默认样式
        textElement.style('font-size', '12px').style('font-weight', 'normal');
      }

      // 判断文本是否包含中文
      const containsChinese = /[\u4e00-\u9fa5]/.test(text);

      if (containsChinese) {
        // 中文分段模式：只按字符数量分段
        let currentLine = '';
        let currentLineWidth = 0;

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const charWidth = /[\u4e00-\u9fa5]/.test(char) ? 2 : 1;
          currentLine += char;
          currentLineWidth += charWidth;

          if (currentLineWidth >= maxCharsPerLine || i === text.length - 1) {
            if (i < text.length - 1 && /[^\w\s]/.test(text[i + 1])) {
              currentLine += text[i + 1];
              currentLineWidth += /[\u4e00-\u9fa5]/.test(text[i + 1]) ? 2 : 1;
              i++;
            }

            if (currentLineWidth >= this.minCharsPerLine || i === text.length - 1) {
              textElement.append('tspan')
                .attr('x', 0)
                .attr('dy', lineCount === 0 ? 0 : this.lineHeight * this.fontSize)
                .text(currentLine.trim());
              currentLine = '';
              currentLineWidth = 0;
              lineCount++;
            }
          }
        }

        if (currentLine !== '') {
          textElement.append('tspan')
            .attr('x', 0)
            .attr('dy', lineCount === 0 ? 0 : this.lineHeight * this.fontSize)
            .text(currentLine.trim());
        }
      } else {
        // 英文分段模式：按空格和标点符号分段
        const words = text.split(/(\s+|\p{P})/u); // 按空格和标点符号分割
        let currentLine = '';
        let currentLineWidth = 0;

        words.forEach(word => {
          const wordWidth = word.replace(/[\p{P}]/u, '').length;
          if (currentLineWidth + wordWidth > maxCharsPerLine) {
            if (currentLine !== '') {
              textElement.append('tspan')
                .attr('x', 0)
                .attr('dy', lineCount === 0 ? 0 : this.lineHeight * this.fontSize)
                .text(currentLine.trim());
              lineCount++;
              currentLine = '';
              currentLineWidth = 0;
            }
            if (wordWidth > maxCharsPerLine) {
              // 处理长单词的拆分逻辑（可选）
              currentLine = word;
              currentLineWidth = wordWidth;
            } else {
              currentLine = word;
              currentLineWidth = wordWidth;
            }
          } else {
            currentLine += word;
            currentLineWidth += wordWidth;
          }
        });

        if (currentLine !== '') {
          textElement.append('tspan')
            .attr('x', 0)
            .attr('dy', lineCount === 0 ? 0 : this.lineHeight * this.fontSize)
            .text(currentLine.trim());
        }
      }

      // 修正字体y值偏移
      // let yTextShift;
      // if (d.depth == 0) yTextShift = 20;
      // else if (d.depth == 1) yTextShift = 11;
      // else yTextShift = 5;

      // node.select('text')
      //   .attr('y', yTextShift);

      node.select('text')
      .attr('y', 5);

      return textElement;
    }
  },
};
</script>

<style>

.node-type-tag text {
  font-weight: 500;
  font-family: Arial, sans-serif;
  user-select: none;
  pointer-events: none;
}

.node-weight-tag text {
  font-weight: 500;
  font-family: Arial, sans-serif;
  user-select: none;
  pointer-events: none;
}

.node-type-tag rect {
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0));
}

.node-weight-tag rect {
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0));
}

.link {
  fill: none;
}

.node text {
  font: 12px sans-serif;
}

.background-rect-selected {
  stroke: #58C4FF; /* 框选颜色 */
  stroke-width: 2px; /* 框选边框宽度 */
}

</style>