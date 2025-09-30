<template>
    <div>
  
        <div v-if="isActive" class="fixed inset-0 flex items-center justify-center z-50">
            <div @click="close" class="absolute inset-0 bg-neutral_color_1 bg-opacity-75"></div>

            <div class="relative bg-white p-6 rounded-lg border z-50" style="width: 28rem;">
                <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_1">{{name}}</div>
                
                <div class=" flex flex-col items-center mt-4">
                    <div class=" flex flex-row space-x-2 items-center">
                        <div class=" rounded-xl h-8 text-neutral-900 text-center">{{strToShow}}</div>
                    </div>

                    <div class="flex flex-row space-x-8 mt-10">
                        <button @click="submit()" class=" h-8 w-24 text-neutral-50 bg-red-500 text-sm shadow-sm rounded-xl pl-4 pr-4">确定</button>
                        <button @click="close()" class=" h-8 w-24 text-main_color_1 text-sm shadow-sm border border-neutral_color_6 rounded-xl pl-4 pr-4">取消</button>
                    </div>
                </div>

            </div>

        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ConfirmMessageBox",
    props: [
      "name",
      "strToShow"
    ],
    data() {
      return {
        isActive: false,
      };
    },
    methods: {
      open() {
        this.isActive = true;
      },
      close() {
        this.isActive = false;
      },
      submit() {
        this.$emit("listen", true);

        this.close();
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  