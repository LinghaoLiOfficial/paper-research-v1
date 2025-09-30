<template>
  <div class="flex flex-col h-full">
    <!-- 如果 rows 为空或未传入，显示提示信息 -->
    <div v-if="rows.length === 0" class="text-center text-gray-500 py-4">
      
    </div>
    <!-- 如果 rows 有数据，显示表格 -->
    <div v-else class="flex-1 overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <!-- 表头 -->
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider"
            >
              {{ header.label }}
            </th>
            <!-- 新增删除按钮的表头 -->
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
              <!-- Actions -->
            </th>
          </tr>
        </thead>
        <!-- 表格内容 -->
        <tbody>
          <tr
            v-for="(row, rowIndex) in paginatedRows"
            :key="rowIndex"
            :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            @mouseover="hoveredRow = rowIndex"
            @mouseleave="hoveredRow = -1"
            @click="handleRowClick(row)"
            class="cursor-pointer hover:bg-gray-100 transition-colors relative"
          >
            <!-- 遍历表头，根据表头的 name 获取行数据 -->
            <td
              v-for="(header, cellIndex) in headers"
              :key="cellIndex"
              class="px-6 py-4 border-b border-gray-300 text-sm leading-5"
              :class="[hoveredRow === rowIndex && cellIndex === 1 ? 'text-blue-500' : 'text-gray-900' ]"
            >
              <span
                v-if="cellIndex === 1"
                @mouseover="showTooltip(row[header.name], rowIndex)"
                @mouseleave="hideTooltip"
              >
                {{ truncateText(row[header.name]) }}
              </span>
              <span v-else :class="                
              // 新增条件：当rowIndex=3时根据内容设置颜色
                {
                  'text-common_color_2 font-semibold': cellIndex === 3 && row[header.name] === 'core_input',
              }">
                {{ row[header.name] }}
              </span>

              <!-- 修正后的提示框 -->
              <div
                v-if="cellIndex === 1 && tooltip.visible && tooltip.rowIndex === rowIndex"
                class="absolute z-50 bg-white text-black text-xs px-2 py-1 rounded shadow-lg text-left"
                :style="{ 
                  top: '-30px',
                  left: '0',
                }"
              >
                {{ tooltip.text }}
              </div>
            </td>

            <!-- 新增删除按钮列 -->
            <td class="px-6 py-4 border-b border-gray-300 text-sm leading-5 relative">
              <button
                v-show="hoveredRow === rowIndex"
                @click.stop="handleDelete(row)"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition-colors text-sm"
              >
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页控件 -->
    <div v-if="rows.length > perPage" class="flex justify-center py-4">
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <a
          href="#"
          @click.prevent="changePage(currentPage - 1)"
          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span class="sr-only">Previous</span>
          <svg t="1738040717168" class="w-4 h-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1618" width="200" height="200"><path d="M629.291 840.832l60.331-60.331-268.501-268.501 268.501-268.501-60.331-60.331-328.832 328.832z" p-id="1619"></path></svg>
        </a>
        <a
          v-for="page in totalPages"
          :key="page"
          href="#"
          @click.prevent="changePage(page)"
          :class="{'bg-blue-50 border-blue-500 text-blue-600': currentPage === page, 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': currentPage !== page}"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        >
          {{ page }}
        </a>
        <a
          href="#"
          @click.prevent="changePage(currentPage + 1)"
          :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span class="sr-only">Next</span>
          <svg t="1738040671565" class="w-4 h-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="200" height="200"><path d="M689.621 512l-328.832-328.832-60.331 60.331 268.501 268.501-268.501 268.501 60.331 60.331z" p-id="1457"></path></svg>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxLength: 32,
      headers: [], // 表头数据
      rows: [], // 表格行数据
      hoveredRow: -1, // 当前悬停的行索引
      currentPage: 1, // 当前页码
      perPage: 8, // 每页显示的行数
      tooltip: {
        visible: false, // 是否显示提示框
        text: '', // 提示框内容
        rowIndex: -1, // 当前提示框所在的行索引
      },
    };
  },
  computed: {
    // 计算总页数
    totalPages() {
      return Math.ceil(this.rows.length / this.perPage);
    },
    // 计算当前页的数据
    paginatedRows() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.rows.slice(start, end);
    },
  },
  methods: {
    // 更新表头
    changeHeaders(headers) {
      this.headers = headers;
    },
    // 更新行数据
    changeRows(rows) {
      this.rows = rows;
      this.currentPage = 1; // 重置到第一页
    },
    // 截断文本
    truncateText(text) {
      if (typeof text !== 'string') return text; // 如果不是字符串，直接返回
      let length = 0;
      let truncatedText = '';
      for (let char of text) {
        length += char.charCodeAt(0) > 255 ? 2 : 1;
        if (length > this.maxLength) {
          truncatedText += '...';
          break;
        }
        truncatedText += char;
      }
      return truncatedText;
    },
    // 处理行点击事件
    handleRowClick(row) {
      this.$emit('listen', row);
    },
    // 切换页码
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    // 显示文字提示框
    showTooltip(text, rowIndex) {
      this.tooltip.visible = true;
      this.tooltip.text = text;
      this.tooltip.rowIndex = rowIndex;
    },
    // 隐藏文字提示框
    hideTooltip() {
      this.tooltip.visible = false;
      this.tooltip.text = '';
      this.tooltip.rowIndex = -1;
    },
    // 处理删除按钮点击事件
    handleDelete(row) {
      this.$emit('delete', row);
    },
  },
};
</script>

<style scoped>
.flex-1 {
  flex: 1;
}
</style>