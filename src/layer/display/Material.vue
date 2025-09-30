<template>
    <div class=" flex flex-col h-full w-full overflow-x-hidden">
        <div class=" flex flex-col h-full w-full items-center">
            <div class=" mt-20 flex flex-row space-x-10" :class="[codeOrDesign == 1 ? 'pl-4' : '']">
                <div @click="toCode" class=" tsext-md hover:text-_color_2 hover:border-_color_2 cursor-pointer border rounded-2xl p-1 px-2 pl-3" :class="[codeOrDesign == 0 ? ' text-_color_2 border-_color_2' : ' text-neutral_color_1 border-neutral_color_1']" style="letter-spacing: 0.2rem;">编程</div>
                <div @click="toDesign" class=" text-md hover:text-_color_2 hover:border-_color_2 cursor-pointer border rounded-2xl p-1 px-2 pl-3" :class="[codeOrDesign == 1 ? ' text-_color_2 border-_color_2' : ' text-neutral_color_1 border-neutral_color_1']" style="letter-spacing: 0.2rem;">设计</div>
            </div>

            <div v-if="codeOrDesign == 1" class=" flex flex-col h-full w-full items-center p-20">
                
                <div class="flex flex-row space-x-6 w-full h-full">
                    <div class=" flex-1 w-full h-full">
                        <div v-for="image in imageList" :key="image.imgPath">
                            <div v-if="image.id % 4 == 1" class=" w-full h-100 flex items-center justify-center flex-col cursor-default mb-8">
                                <img :src="'data:image/jpeg;base64,' + image.img" class="max-w-full max-h-full object-contain rounded-xl border" />
                                <div class=" px-4 py-2">{{image.imgInfo}}</div>
                            </div>
                        </div>
                    </div>
                    <div class=" flex-1 w-full h-full">
                        <div v-for="image in imageList" :key="image.imgPath">
                            <div v-if="image.id % 4 == 2" class=" w-full h-100 flex items-center justify-center flex-col cursor-default mb-8">
                                <img :src="'data:image/jpeg;base64,' + image.img" class="max-w-full max-h-full object-contain rounded-xl border" />
                                <div class=" px-4 py-2">{{image.imgInfo}}</div>
                            </div>
                        </div>
                    </div>
                    <div class=" flex-1 w-full h-full">
                        <div v-for="image in imageList" :key="image.imgPath">
                            <div v-if="image.id % 4 == 3" class=" w-full h-100 flex items-center justify-center flex-col cursor-default mb-8">
                                <img :src="'data:image/jpeg;base64,' + image.img" class="max-w-full max-h-full object-contain rounded-xl border" />
                                <div class=" px-4 py-2">{{image.imgInfo}}</div>
                            </div>
                        </div>
                    </div>
                    <div class=" flex-1 w-full h-full">
                        <div v-for="image in imageList" :key="image.imgPath">
                            <div v-if="image.id % 4 == 0" class=" w-full h-100 flex items-center justify-center flex-col cursor-default mb-8">
                                <img :src="'data:image/jpeg;base64,' + image.img" class="max-w-full max-h-full object-contain rounded-xl border" />
                                <div class=" px-4 py-2">{{image.imgInfo}}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Material',
    components: {

    },
    data() {
        return {
            codeOrDesign: 0,
            imageList: null
        }
    },
    created() {
        this.getDesignImageAndTextAPI();
    },
    methods: {
        toMain() {
            this.$router.push({path: "/login"});
        },
        toPersonal() {

        },
        toAchievement() {

        },
        toCode() {
            this.codeOrDesign = 0;
        },
        toDesign() {
            this.codeOrDesign = 1;
        },
        async getDesignImageAndTextAPI() {
            await axios.get(`${process.env.VUE_APP_FLASK_API}/getDesignImageAndText`)
            .then(resp => {
                if (resp.status == 200) {
                    let check = resp.data.check;

                    if (check) {
                        let imageList = resp.data.imageList;
                        this.imageList = imageList;
                    }
                }
                else {
                    this.$message.error("数据接收失败 GET:/getDesignImageAndText");
                }
            })
            .catch(error => {
                this.$message.error(error.message);
            })
        },
    },
}
</script>

<style>

</style>