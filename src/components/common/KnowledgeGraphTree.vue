<template>
  <!-- 保持原有弹窗结构，移除点击事件 -->
  <div v-show="isActivate" class="w-full h-full fixed inset-0 bg-black bg-opacity-50 z-50">
    <div class="flex h-full w-full items-center justify-center">
      <div class="bg-white rounded-lg shadow-2xl p-6 w-10/12 h-5/6 relative">
        <div class=" absolute top-2 left-4 flex flex-row space-x-8">
          <button @click="generateMD" class="text-common_color_3 text-sm">
            ↓ 导出MD文档
          </button>

          <div class=" mt-1 flex flex-row space-x-2">
            <button @click="setDepth(1)" 
                    class="px-3 py-1 text-sm border rounded hover:bg-gray-50 aria-pressed:bg-blue-100"
                    :aria-pressed="currentDepth === 1 && currentMode === 'normal'">
              显示前一层节点
            </button>
            <button @click="setDepth(2)" 
                    class="px-3 py-1 text-sm border rounded hover:bg-gray-50 aria-pressed:bg-blue-100"
                    :aria-pressed="currentDepth === 2 && currentMode === 'normal'">
              显示前两层节点
            </button>
            <button @click="setDepth(999)" 
                    class="px-3 py-1 text-sm border rounded hover:bg-gray-50 aria-pressed:bg-blue-100"
                    :aria-pressed="currentDepth === 999 && currentMode === 'normal'">
              显示全部节点
            </button>

            <button @click="setDepthWithExplain(1)" 
                    class="px-3 py-1 text-sm border rounded hover:bg-gray-50 aria-pressed:bg-blue-100"
                    :aria-pressed="currentDepth === 1 && currentMode === 'explain'">
              显示前一层节点+主题解释
            </button>
            <button @click="setDepthWithExplain(2)" 
                    class="px-3 py-1 text-sm border rounded hover:bg-gray-50 aria-pressed:bg-blue-100"
                    :aria-pressed="currentDepth === 2 && currentMode === 'explain'">
              显示前两层节点+主题解释
            </button>
            <button @click="setDepthWithExplain(999)" 
                    class="px-3 py-1 text-sm border rounded hover:bg-gray-50 aria-pressed:bg-blue-100"
                    :aria-pressed="currentDepth === 999 && currentMode === 'explain'">
              显示全部节点+主题解释
            </button>
          </div>
        </div>

        <!-- 关闭按钮保留 -->
        <button @click="handleClose" class="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-4">×</button>

        <div class=" mt-10 w-full flex flex-col overflow-auto" style="height: 94%;">
          <div class="tree-container w-[800px] mx-auto font-mono text-sm mb-20">
            <!-- 自动展开所有节点 -->
            <tree-item :explain-mode="currentMode === 'explain'" :node="treeData" :depth="0" :max-depth="currentDepth" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      currentMode: 'normal',
      treeData: { id: 'root', label: 'Root', type: 'root', children: [] },
      isActivate: false,
      currentDepth: 999, // 默认显示全部层级
    }
  },
  methods: {
    activate(treeData) {
      this.isActivate = true
      this.treeData = this.deepClone(treeData)
    },

    setDepth(depth) {
      this.currentMode = 'normal'
      this.currentDepth = depth
      this.treeData = this.deepClone(this.treeData)
    },
    setDepthWithExplain(depth) {
      this.currentMode = 'explain'
      this.currentDepth = depth
      this.treeData = this.deepClone(this.treeData)
    },

    generateMD() {
      const mdContent = this.buildMarkdown(this.treeData);
      this.saveAsMarkdown(mdContent);
    },

    // 递归构建Markdown内容
    buildMarkdown(node, depth = 0) {
      let content = '';
      const indent = '  '.repeat(depth);

      if (depth === 0) {
        content += `# ${node.label}\n\n`;
      } else {
        const formattedLabel = node.type === '关键词' 
          ? `**${node.label}**` 
          : `*${node.label}*`;
        content += `${indent}- ${formattedLabel} [${node.type}]`;

        // 修正条件：基于currentMode和currentDepth
        if (this.currentMode === 'explain' && 
            depth <= this.currentDepth && 
            node.theme_explaining) {
          const explainContent = node.theme_explaining
            .split('\n')
            .map(line => `> ${line}`.trim())
            .join('\n' + indent + '  ');
          content += `\n${indent}  ${explainContent}`;
        }
        content += '\n';
      }

      if (node.children) {
        node.children.forEach(child => {
          content += this.buildMarkdown(child, depth + 1);
        });
      }

      return content;
    },

    // 文件保存方法
    saveAsMarkdown(content) {
      const blob = new Blob([content], { type: 'text/markdown' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `tree-${new Date().toISOString().slice(0,10)}.md`;
      link.click();
      URL.revokeObjectURL(link.href);
    },
    
    // 递归克隆数据（避免污染原始数据）
    deepClone(node) {
      return JSON.parse(JSON.stringify(node))
    },
    handleClose() {
      this.isActivate = false
      this.$emit('input', false)
    }
  },
  components: {
    TreeItem: {
      name: 'tree-item',
      props: ['explainMode', 'node', 'depth', 'maxDepth'],
      render(h) {
        const shouldRender = this.depth < this.maxDepth;
        // 修正显示条件：基于explainMode和maxDepth
        const showExplain = this.explainMode && this.depth <= this.maxDepth;

        return h('div', { class: 'relative' }, [
          h('div', { 
            class: ['node-item', this.nodeTypeClass],
            style: { marginLeft: `${this.depth * 16}px` }
          }, [
            `[${this.node.weight}] ${this.node.label}`,
            showExplain && this.node.theme_explaining && 
              h('div', { class: 'explain-text' }, this.node.theme_explaining)
          ]),
          shouldRender && h('div', { 
            class: 'children pl-4'
          }, this.node.children?.map(child => 
            h('tree-item', {
              props: {
                node: child,
                depth: this.depth + 1,
                maxDepth: this.maxDepth,
                explainMode: this.explainMode
              }
            })
          ))
        ]);
      },

      computed: {
        showExplain() {
          return this.explainMode && this.depth <= this.maxDepth
        },
        nodeTypeClass() {
          return {
            'text-common_color_8 font-medium': this.node.type === '论文',
            'text-common_color_6 font-semibold': this.node.type === '关键词',
            'pl-4': this.depth > 0 // 为连接线留出空间
          }
        }
      }
    }
  }
}
</script>

<style>

/* 强制显示所有元素 */
.tree-container {
  overflow: visible !important;
  height: auto !important;
}

/* 移除所有交互相关样式 */
.node-item {
  position: relative;
  padding: 4px 0;
}
.connector-lines {
  pointer-events: none;
}
.explain-text {
  @apply text-gray-600 text-xs leading-5 mt-1 pl-2;
  border-left: 2px solid #e5e7eb;
  max-width: 600px;
}
</style>