<template>
    <div class="flex flex-row w-full h-full">
      <div v-if="!isHidden" class="w-36 h-full bg-neutral_color_8 rounded-2xl rounded-l-none">
        <div class="flex justify-center">
          <ul class="flex flex-col">
            <!-- 动态渲染菜单项 -->
            <li
              v-for="(item, index) in pathList"
              :key="item.route"
              @click="choose(item.route)"
              class="flex flex-col"
            >
              <router-link :to="`${mainPath}/${item.route}`" class="flex flex-col">
                <!-- 当前选中状态 -->
                <div
                  v-if="option === item.route"
                  :class="['w-36 h-16 bg-gradient-to-br from-main_color_1 to-main_color_2 group flex items-center cursor-default justify-between pl-4 pr-4', 
                    index === 0 ? 'rounded-2xl rounded-l-none rounded-b-none' : ''
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <component :is="item.icon" class="icon h-6 w-6 fill-neutral_color_9" />
                    <div class="font-bold text-neutral_color_9 text-sm">{{ item.label }}</div>
                  </div>
                </div>
                <!-- 未选中状态 -->
                <div
                  v-else
                  class="w-36 h-16 group flex items-center cursor-default justify-between pl-4 pr-4"
                >
                  <div class="flex items-center space-x-2">
                    <component :is="item.icon" class="icon h-6 w-6 fill-neutral_color_5 group-hover:fill-neutral_color_1" />
                    <div class="font-bold text-neutral_color_5 group-hover:text-neutral_color_1 text-sm">{{ item.label }}</div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
  
      <router-view @choose="choose" class=""></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: "SideNavigator",
    props: {
      mainPath: {
        type: String,
        required: true, // 主路径，如 "/wtp"
      },
      pathList: {
        type: Array,
        required: true, // 菜单项列表
      },
    },
    data() {
      return {
        option: "", // 当前选中项
        isHidden: false,
      };
    },
    mounted() {
      this.loadOption();
    },
    methods: {
      loadOption() {
        this.option = this.$route.path.split("/")[2] || "";
      },
      choose(data) {
        this.option = data;
      },
      hideNavigator() {
        this.isHidden = true;
      },
    },
  };
  </script>
  
  <style>

  </style>
  