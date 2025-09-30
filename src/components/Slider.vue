<template>
    <div class="mt-4 h-38 w-60 flex flex-col border border-neutral_color_6 shadow-sm rounded-xl p-4">
        <div class="h-full w-full flex flex-col items-center space-y-4">
            <div class="flex flex-row items-center space-x-4">
                <div class="text-sm font-SiyuanHei-Regula text-neutral_color_3">{{name}}</div>
                <div class="text-sm text-center border border-neutral_color_6 rounded-2xl p-1 pl-2 pr-2 text-neutral_color_3">{{value}}</div>
            </div>
            <input ref="input" type="range" class="cursor-pointer" oninput="this.style.setProperty('--percent', this.value)" min="0" :max="maxValue" step="1" v-model="value" @input="change">
            
            <button @click="activate()" class="h-8 w-14 text-main_color_1 text-sm border border-neutral_color_6 rounded-xl">保留</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Slider',
    props: [
        "name"
    ],
    data() {
        return {
            value: 0,
            maxValue: 100
        };
    },
    methods: {
        change(event) {
            this.value = event.target.value;
        },
        setMaxValue(data) {
            this.maxValue = data;
            this.$refs.input.style.setProperty('--num', this.maxValue);
        },
        activate() {
            this.$emit("setTableLen", this.value);
        }
    },
}
</script>
  

<style scoped>
    [type="range"] {
        -webkit-appearance: none;
        appearance: none;
        margin: auto;
        width: 200px;
        outline: 0;
        background-color: transparent;
        vertical-align: middle;
    }
    [type="range"]::-webkit-slider-runnable-track {
        display: flex;
        align-items: flex-start;
        position: relative;
        height: 5px;
        border-radius: 5px;
        background: linear-gradient(#00AFAF, #00AFAF), linear-gradient(#EAEAEA, #EAEAEA);
    background-repeat: no-repeat;
    background-size: calc(100% / var(--num, 0) * var(--percent, 0)), 100%;
    }
    [type="range"]::-webkit-slider-container {
        display: flex;
        height: 20px;
    }
    [type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 1px 3px 1px rgba(0, 0, 0, .25);
        transition: border-color .2s, background-color .2s;
        margin-top: -8px;
    }
    [type="range"]::-webkit-slider-thumb:active {
        background-color: #f7f9fa;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, .25);
    }
</style>
  