<template>
    <div>
  
        <div v-if="isActive" class="fixed inset-0 flex items-center justify-center z-50">
            <div @click="close" class="absolute inset-0 bg-neutral_color_1 bg-opacity-75"></div>

            <div class="relative bg-white p-6 rounded-lg border z-50" style="width: 28rem;">
                <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_1">{{name}}</div>
                
                <div class=" flex flex-col items-center mt-4">
                    <div v-for="param in params" :key="param.id" class=" flex flex-row space-x-2 items-center mt-4">
                      <input v-model="param.value" type="text" class=" border border-main_color_1 rounded-xl shadow-inner h-8 outline-none text-main_color_1 text-center" :placeholder="param.label">
                    </div>

                    <div class="flex flex-row space-x-8 mt-10">
                        <button @click="submit()" class=" h-8 w-24 text-main_color_1 text-sm shadow-sm border border-neutral_color_6 rounded-xl pl-4 pr-4">确定</button>
                        <button @click="close()" class=" h-8 w-24 text-main_color_1 text-sm shadow-sm border border-neutral_color_6 rounded-xl pl-4 pr-4">取消</button>
                    </div>
                </div>

            </div>

        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "InputStrMessageBox",
    props: [
      "name",
    ],
    data() {
      return {
        isActive: false,
        params: [],
      };
    },
    methods: {
      changeData(params) {
        this.params = params;
      },
      open() {
        this.isActive = true;
      },
      close() {
        this.isActive = false;
      },
      submit() {
        this.$emit("listen", this.params);

        this.close();
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  