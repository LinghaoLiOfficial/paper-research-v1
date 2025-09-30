<template>
  <div class=" h-full w-full">
    <!-- 顶部操作栏 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-4 sticky top-0">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- 搜索框 -->
        <div class="flex-grow w-full md:w-auto text-sm">

          <div class="relative">
            <input 
              v-model="searchQuery" 
              placeholder="搜索图片..."
              class="w-full py-2 pl-4 pr-4 rounded-lg border-2 border-gray-200 transition"
            >
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
          </div>
        </div>
        
        <!-- 上传按钮 -->
        <div class=" ml-8">
          <button 
            @click="showUploadModal = true"
            class="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform"
          >
            <i class="fas fa-cloud-upload-alt"></i>
            <span>上传图片</span>
          </button>
        </div>
        
        <!-- 操作按钮组 -->
        <div class="flex space-x-3">
          <button 
            @click="deleteSelected"
            :disabled="selectedImages.length === 0"
            :class="['flex items-center py-2 px-4 rounded-lg shadow-sm text-sm font-medium transition', 
                    selectedImages.length > 0 
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed']"
          >
            <i class="fas fa-trash-alt"></i>
            <span>删除</span>
          </button>
        </div>
      </div>
    </div>

    <div class=" w-full h-full pb-16 p-8 overflow-y-auto bg-white rounded-xl shadow-md">
      <!-- 图片网格 -->
      <div v-if="filteredImages.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        <div 
          v-for="(img, index) in filteredImages" 
          :key="img.id"
          class="image-card relative bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:bg-gray-100"
        >
          <div class="p-4">
            <!-- 图片 -->
            <div 
              @click="showImage(index)"
              class="overflow-hidden rounded-lg mb-3 cursor-pointer"
            >
              <img 
                :src="`${rootUrl}${img.thumbnail}`"
                :alt="img.name"
                class="w-full h-48 object-cover transform transition duration-300"
              >
            </div>
            
            <!-- 图片信息 -->
            <div>
              <h3 class="font-medium text-gray-800 truncate">{{ img.name }}</h3>
              <div class="text-xs text-gray-500 mt-2">
                上传于 {{ img.date }}
              </div>
              <div class="text-xs text-gray-500 mt-1">
                由 {{ img.user }} 上传
              </div>
            </div>
            
            <!-- 选择复选框 -->
            <div class="absolute top-4 right-4 z-10">
              <input 
                type="checkbox" 
                v-model="selectedImages"
                :value="img.id"
                class="h-5 w-5 border-gray-300 bg-white" 
              >
            </div>
            
          </div>
        </div>
      </div>
      
      <!-- 无图片提示 -->
      <div v-else class="bg-white rounded-xl shadow-md py-16 text-center">
        <div class="text-gray-400 mb-4">
          <i class="fas fa-images text-6xl mb-4"></i>
          <h3 class="text-xl font-medium text-gray-700">没有找到匹配的图片</h3>
          <p class="text-gray-500 mt-2">尝试调整检索词或上传新图片</p>
        </div>
        <button 
          @click="showUploadModal = true"
          class="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <i class="fas fa-cloud-upload-alt mr-2"></i>上传图片
        </button>
      </div>

    </div>
    

    
    <!-- 大图预览模态框 -->
    <transition name="fade">
      <div v-if="isViewerOpen" class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
        <div class="relative max-w-6xl w-full max-h-[90vh]">
          <button 
            @click="closeViewer"
            class="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full z-50 transition"
          >
            <svg t="1750827274219" class="icon w-4 h-4 fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2163"><path d="M584.127 514.61L910.316 840.8c20.01 20.01 20.082 52.467 0 72.549-20.011 20.011-52.468 20.082-72.55 0L511.579 587.16 185.39 913.348c-20.011 20.011-52.467 20.082-72.55 0-20.01-20.011-20.081-52.467 0-72.55L439.1 514.54 112.91 188.35c-20.01-20.01-20.081-52.467 0-72.549 20.012-20.01 52.468-20.082 72.55 0l326.188 326.189 326.188-326.189c20.011-20.01 52.468-20.082 72.55 0 20.01 20.011 20.081 52.468 0 72.55L584.126 514.61z" p-id="2164"></path></svg>
            <i class="fas fa-times text-xl"></i>
          </button>
          
          <!-- 导航按钮 -->
          <button 
            v-if="currentIndex > 0"
            @click="prevImage"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full z-50"
          >
            <svg t="1750827115154" class="icon w-4 h-4 fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1044"><path d="M288.3 544.1c0.6 0.8 1.4 1.7 2.1 2.5l360.5 394.9c19.6 21.5 52.9 23 74.4 3.4 21.5-19.6 23-52.9 3.4-74.4L400.4 510.7 729 151.9c19.6-21.4 18.2-54.7-3.3-74.4-21.4-19.6-54.7-18.2-74.4 3.3L290.2 475.1c-18 19.6-18.3 49.1-1.9 69z" p-id="1045"></path></svg>
            <i class="fas fa-chevron-left"></i>
        </button>
          <button 
            v-if="currentIndex < filteredImages.length - 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full z-50"
          >
            <svg t="1750827212820" class="icon w-4 h-4 fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1191"><path d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z" p-id="1192"></path></svg>
            <i class="fas fa-chevron-right"></i>
          </button>
          
          <!-- 主图片 -->
          <transition name="fade" mode="out-in">
            <div :key="currentIndex" class="flex items-center justify-center w-full h-full">
              <img 
                :src="`${rootUrl}${filteredImages[currentIndex].large}`" 
                :alt="filteredImages[currentIndex].name"
                class="max-h-[90vh] max-w-full object-contain"
                :style="{ transform: `scale(${scale}) rotate(${rotation}deg)` }"
              >
            </div>
          </transition>
          
          <!-- 图片信息 -->
          <div class="absolute bottom-4 left-0 right-0 text-center text-white">
            <div class="inline-block bg-black bg-opacity-50 px-6 py-2 rounded-full">
              {{ filteredImages[currentIndex].name }} 
              ({{ currentIndex + 1 }}/{{ filteredImages.length }})
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="absolute bottom-4 right-4 flex space-x-2">
            <button 
              @click="zoomIn"
              class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full"
              title="放大"
            >
              <svg t="1750827371343" class="icon w-4 h-4 fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1342"><path d="M1009.152 923.328c19.776 19.328 19.648 50.816-0.256 70.272-19.712 19.52-51.84 19.52-71.616 0.128l-254.848-265.536c-162.944 137.856-408.32 131.776-561.92-19.072-161.216-157.952-160.512-414.784 1.536-573.568 161.856-158.912 423.744-159.616 584.896-1.536 150.144 147.2 159.744 380.224 29.312 539.84 3.584 2.24 7.168 4.992 11.136 8.768L1009.152 923.328 1009.152 923.328zM752 424.128c0-189.952-153.92-344-343.936-344S64 234.176 64 424.128c0 190.016 154.048 343.936 344.064 343.936S752 614.144 752 424.128L752 424.128zM621.376 450.944 434.624 450.944l0 186.432c0 19.264-15.616 34.88-34.816 34.88-19.264 0-34.944-15.616-34.944-34.88L364.864 450.944 179.008 450.944C159.68 450.944 144 435.392 144 416c0-19.264 15.68-34.944 35.008-34.944l185.856 0L364.864 195.072c0-19.328 15.68-34.944 34.944-34.944 19.2 0 34.816 15.616 34.816 34.944l0 185.984 186.752 0c19.264 0 34.88 15.68 34.88 34.944C656.256 435.392 640.64 450.944 621.376 450.944L621.376 450.944z" p-id="1343"></path></svg>
              <i class="fas fa-search-plus"></i>
            </button>
            <button 
              @click="zoomOut"
              class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full"
              title="缩小"
            >
              <svg t="1750827410994" class="icon w-4 h-4 fill-white" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1489"><path d="M1010.176 925.248c19.712 19.392 19.584 50.688-0.128 70.144-20.032 19.52-52.032 19.52-71.552 0.256l-254.784-265.408c-162.688 137.728-407.936 131.648-561.472-18.816-161.024-158.08-160.32-414.656 1.472-573.376 161.792-158.784 423.616-159.488 584.448-1.536 150.08 147.072 159.552 379.904 29.248 539.456 3.648 2.176 7.232 4.992 11.136 8.832L1010.176 925.248 1010.176 925.248zM753.344 426.432c0-189.824-153.856-343.68-343.808-343.68-189.824 0-343.744 153.856-343.744 343.68 0 189.888 153.92 343.68 343.744 343.68C599.488 770.112 753.344 616.32 753.344 426.432L753.344 426.432zM196.736 450.176c-19.328 0-34.88-14.144-34.88-31.808 0-17.664 15.616-31.872 34.88-31.872l441.792 0c19.328 0 34.88 14.208 34.88 31.872 0 17.6-15.552 31.808-34.88 31.808L196.736 450.176 196.736 450.176z" p-id="1490"></path></svg>
              <i class="fas fa-search-minus"></i>
            </button>
            <button 
              @click="rotateImage"
              class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full"
              title="旋转"
            >
              <svg t="1750827473609" class="icon w-4 h-4 fill-white" viewBox="0 0 1118 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584"><path d="M165.238899 508.178506C164.450369 456.442676 171.767779 404.485842 187.244542 353.863631 266.138632 95.812692 533.436225-51.353028 784.380224 25.368251 1035.324219 102.08953 1174.62994 373.566359 1095.735851 631.617298 1016.84176 889.66824 749.544168 1036.833959 498.600172 960.11268 424.134741 937.346313 357.837833 896.870788 303.973868 842.276436 291.310328 829.441176 291.396506 808.495802 304.166356 795.493625 316.936205 782.491452 337.554042 782.356136 350.217582 795.191397 396.640587 842.243889 453.73137 877.098901 517.975091 896.740177 734.436966 962.919213 965.320335 835.802028 1033.557737 612.607541 1101.795139 389.413057 981.467179 154.919792 765.005305 88.740755 548.543428 22.561718 317.660056 149.678904 249.422655 372.873388 235.597198 418.094418 229.294871 464.461039 230.4403 510.559881L311.240978 429.759202C323.584094 417.416085 343.892513 417.712357 356.601099 430.420946 369.309686 443.129535 369.605959 463.437952 357.262842 475.781068L230.778782 602.265128C229.273826 605.769679 227.098877 609.041396 224.251145 611.889128 211.908029 624.232245 191.59961 623.935974 178.891024 611.227385L40.825428 473.16179C28.11684 460.453206 27.820569 440.144784 40.163685 427.801668 52.506801 415.458551 72.815218 415.754827 85.523806 428.463411L165.238899 508.178506Z" p-id="2585"></path></svg>
              <i class="fas fa-redo"></i>
            </button>
            <button 
              @click="downloadImage(`${rootUrl}${filteredImages[currentIndex].large}`)"
              class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full"
              title="下载"
            >
              <svg t="1750827571240" class="icon w-4 y-4 fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4436"><path d="M544.256 605.184l244.224-244.224a31.744 31.744 0 0 1 45.056 45.056l-295.424 295.424a36.864 36.864 0 0 1-51.2 0L190.464 406.528a31.744 31.744 0 1 1 45.056-45.056l244.224 244.224V111.104a32.256 32.256 0 1 1 64 0zM153.6 902.656a32.256 32.256 0 0 1 0-64h716.8a32.256 32.256 0 0 1 0 64z" p-id="4437"></path></svg>
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- 上传图片模态框 -->
    <transition name="fade">
      <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-md font-semibold text-gray-800">上传图片</h3>
              <button @click="closeUploadModal" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <div class="p-6">
            <!-- 图片预览区域 -->
            <div v-if="uploadedPreviews.length > 0" class="mb-6 overflow-y-auto max-h-60">
              <h4 class="font-medium text-gray-700 mb-3 text-sm">已选择图片</h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div 
                  v-for="(preview, index) in uploadedPreviews" 
                  :key="index" 
                  class="relative"
                >
                  <img 
                    :src="preview" 
                    alt="预览" 
                    class="w-full h-24 object-cover rounded-lg"
                  >
                  <button 
                    @click="removePreview(index)" 
                    class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 拖拽上传区域 -->
            <div 
              class="upload-area rounded-lg p-4 text-center transition cursor-pointer"
              @dragover.prevent="handleDragOver"
              @dragleave.prevent="handleDragLeave"
              @drop.prevent="handleDrop"
              :class="{ 'dragover': isDragging }"
              @click="triggerFileInput"
            >
              <div class="mb-4 text-blue-500">
                <i class="fas fa-cloud-upload-alt text-sm"></i>
              </div>
              <h4 class="font-medium text-gray-700 mb-2 text-sm">拖放图片到这里</h4>
              <p class="text-gray-500 text-sm mb-2">支持JPG、PNG格式</p>
              <p class="text-gray-500 text-sm">或</p>
              <button class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition text-sm">
                选择文件
              </button>
              <input 
                type="file" 
                ref="fileInput" 
                @change="handleFileChange" 
                class="hidden" 
                accept="image/*" 
                multiple
              >
            </div>
            
          </div>
          
          <div class="flex justify-end p-6 bg-gray-50 rounded-b-2xl space-x-3">
            <button 
              @click="closeUploadModal"
              class="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition text-sm"
            >
              取消
            </button>
            <button 
              @click="uploadImages" 
              :disabled="isUploading || uploadedFiles.length === 0"
              class="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition disabled:opacity-50 text-sm"
            >
              <span class=" text-sm" v-if="!isUploading">上传图片</span>
              <span class=" text-sm" v-else>上传中...</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as im from '@/api/im'

// 日期格式化函数
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
}

// 生成唯一ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// 获取当前日期字符串
function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export default {
  name: 'ImageGallery',
  data() {
    return {
      rootUrl: "",
      searchQuery: '',
      selectedImages: [],
      isViewerOpen: false,
      showUploadModal: false,
      currentIndex: 0,
      scale: 1,
      rotation: 0,
      isDragging: false,
      uploadedFiles: [],
      isUploading: false,
      images: [],
      uploadedPreviews: []
    };
  },
  computed: {
    filteredImages() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return this.images.filter(img => 
          img.name.toLowerCase().includes(query) || img.user.toLowerCase().includes(query)
        );
      }
      return this.images;
    }
  },
  mounted() {
    this.rootUrl = process.env.VUE_APP_FLASK_API;
    this.refreshImageList();
  },
  methods: {
    // 大图预览相关方法
    showImage(index) {
      // 确保索引正确
      const filteredIndex = this.images.findIndex(img => 
        img.id === this.filteredImages[index].id
      );
      
      if (filteredIndex !== -1) {
        this.currentIndex = filteredIndex;
        this.isViewerOpen = true;
        this.resetImage();
      }
    },
    closeViewer() {
      this.isViewerOpen = false;
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.resetImage();
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.resetImage();
      }
    },
    zoomIn() {
      if (this.scale < 3) {
        this.scale += 0.1;
      }
    },
    zoomOut() {
      if (this.scale > 0.2) {
        this.scale -= 0.1;
      }
    },
    rotateImage() {
      this.rotation += 90;
    },
    resetImage() {
      this.scale = 1;
      this.rotation = 0;
    },
    
    // 选择相关方法
    selectAllImages() {
      if (this.selectedImages.length === this.images.length) {
        this.selectedImages = [];
      } else {
        this.selectedImages = this.images.map(img => img.id);
      }
    },
    async deleteSelected() {
      try {
        console.log(this.selectedImages);
        const resp = await im.deleteImagesAPI(this.selectedImages);
        const content = resp.data;
        if (content.check) {
          this.$message.success("删除成功");
          this.refreshImageList();
        }
      } catch (error) {
        this.$message.error(`删除失败: ${error.message}`);
      }
    },
    deleteImage(id) {
      this.images = this.images.filter(img => img.id !== id);
      this.selectedImages = this.selectedImages.filter(imgId => imgId !== id);
    },
    
    // 上传相关方法
    closeUploadModal() {
      this.showUploadModal = false;
      this.isDragging = false;
      this.uploadedFiles = [];
      this.uploadedPreviews = [];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleDragOver() {
      this.isDragging = true;
    },
    handleDragLeave() {
      this.isDragging = false;
    },
    handleDrop(e) {
      this.isDragging = false;
      this.handleFiles(e.dataTransfer.files);
    },
    handleFileChange(e) {
      this.handleFiles(e.target.files);
    },
    handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.match('image.*')) {
          this.uploadedFiles.push(files[i]);
          this.createImagePreview(files[i]);
        }
      }
    },
    createImagePreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedPreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removePreview(index) {
      this.uploadedPreviews.splice(index, 1);
      this.uploadedFiles.splice(index, 1);
    },

    // 异步上传图片到后端
    async uploadImages() {
      if (this.uploadedFiles.length === 0) return;
      
      this.isUploading = true;
      
      try {
        const formData = new FormData();
        this.uploadedFiles.forEach(file => {
          formData.append("images[]", file);
        });
        
        // 调用后端API上传图片
        const resp = await im.IMUploadImagesAPI(formData);
        const content = resp.data;
        
        if (content.check) {
          this.$message.success("上传成功");
          
          // 清空上传文件和预览
          this.closeUploadModal();
          
          // 刷新图片列表
          this.refreshImageList();
        } else {
          this.$message.warning(content.message || "上传失败，请重试");
        }
      } catch (error) {
        this.$message.error(`上传失败: ${error.message}`);
      } finally {
        this.isUploading = false;
      }
    },

    async refreshImageList() {
      try {
        const resp = await im.getAllImagesAPI();
        const content = resp.data;
        this.images = content.data.images || [];
      } catch (error) {
        this.$message.error(`获取图片列表失败: ${error.message}`);
      }
    },
    
    // 其他工具方法
    formatDate,
    async downloadImage(url) {
      try {
        
        // 使用 fetch 获取图片
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('下载失败，网络请求错误');
        }
        
        // 获取图片的 blob 数据
        const blob = await response.blob();
        
        // 从响应头获取文件名
        const contentDisposition = response.headers.get('content-disposition');
        let fileName = `image-${Date.now()}.png`;
        
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/i);
          if (match && match[1]) {
            fileName = decodeURIComponent(match[1]);
          }
        }
        
        // 创建可下载的 URL
        const blobUrl = URL.createObjectURL(blob);
        
        // 创建下载链接并触发点击
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        
        // 清理资源
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
                
      } catch (error) {
        // 处理下载失败
        this.$message.error(`下载失败: ${error.message}`);
        
        // 失败时回退到原始方法
        const fallbackLink = document.createElement('a');
        fallbackLink.href = url;
        fallbackLink.download = `image-${Date.now()}.png`;
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.image-card:hover .overlay {
  opacity: 1;
}
.upload-area {
  border: 2px dashed #d1d5db;
  transition: all 0.3s ease;
}
.upload-area:hover, .upload-area.dragover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}
</style>