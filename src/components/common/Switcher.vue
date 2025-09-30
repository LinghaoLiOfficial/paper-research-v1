<template>
    <div class=" flex flex-col">
        <div 
        @click="toggleSwitch"
        class="relative inline-block w-10 h-5 transition duration-200 ease-linear rounded-full"
        :class="isActive ? ' bg-main_color_2' : 'bg-gray-300'"
        >

            <span 
            class="absolute left-0 w-5 h-5 border-2 transition-all duration-200 ease-linear transform bg-white rounded-full"
            :class="isActive ? 'translate-x-5 border-main_color_1' : 'translate-x-0 border-neutral_color_5'"
            ></span>

        </div>
    </div>
</template>
  
<script>
  export default {
    name: "Switcher",
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isActive: false,
        };
    },
    
    methods: {
        toggleSwitch() {
            if (!this.disabled) {
                this.isActive = !this.isActive;

                this.$emit("listen", this.isActive);
            } 
        },

        init(isActive) {
            this.isActive = isActive;
        },
    },
  };
</script>
  
<style scoped>
</style>
  