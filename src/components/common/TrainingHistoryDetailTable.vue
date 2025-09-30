<template>
    <div class=" w-full h-full flex flex-col overflow-y-auto px-4 mb-4">
        <div v-for="(m, i) in body" :key="i" class=" w-full h-full flex flex-col border border-slate-300 shadow-xl p-3 rounded-xl mb-6 pb-4">
            <div v-for="(key, j) in head" :key="j">
                <div v-if="key == 'history_epoch'" class=" flex flex-row space-x-4">
                    <div class=" mb-3 text-md font-SiyuanHei-Regula text-main_color_1 font-semibold italic">{{m[j]}}</div>
                </div>
            </div>

            <div v-for="(key, k) in head" :key="k * 100 + 100" class=" flex flex-col mb-2">
                <div v-if="key != 'history_epoch'" class=" flex flex-row space-x-4">
                    <div class=" ml-4 text-neutral_color_2 text-sm font-semibold">{{key}}: </div>
                    <div class=" ml-4 text-neutral_color_3 text-sm">{{m[k]}}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "TrainingHistoryDetailTable",

    data() {
        return {
            head: [],
            body: []
        }
    },

    methods: {
        changeHeadAndBody(trainingHistory) {
            this.head = trainingHistory['head'];
            this.body = trainingHistory['body'];
        }
    }
}
</script>

<style>

</style>