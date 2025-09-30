<template>
    <div v-if="checkNullObject(tableData)" class="mt-1 flex flex-col border border-neutral_color_6 shadow-sm rounded-xl p-3 h-full w-full">
        <div class="flex flex-col w-full h-full justify-center items-center">
            <div class="overflow-auto" style="max-width: 70rem; max-height: 24rem;">           
                <table class="table-fixed border-collapse border border-neutral_color_6 text-left text-pretty">
                    <thead class="text-neutral_color_1">
                        <tr class="border-neutral_color_6 font-SiYuanHei-Bold">
                            <th v-if="checkNullObject(tableData)" class="text-xs border p-2 pl-3 pr-16 font-Georgia-Italic text-side_color_1">[index]</th>
                            <th v-for="(item, i) in tableData.head" :key="i" class="text-xs border p-2 pl-3 pr-16 text-neutral_color_1">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody class="text-neutral_color_2">
                        <tr v-for="(list, i) in tableData.body" :key="i" class="even:bg-white odd:bg-neutral_color_8 border-neutral_color_6 font-SiyuanHei-Regular">
                            <td class="text-xs border-l border-r p-2 pl-3 pr-16">{{i}}</td>
                            <td v-for="(item, j) in list" :key="j" class="text-xs border-l border-r p-2 pl-3 pr-16">{{item}}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>

        <div class="flex flex-row items-center pt-5 space-x-12 pb-1 justify-center">
            <div class="flex items-center flex-row space-x-2">
                <div class="text-sm font-SiyuanHei-Regula text-main_color_1">总行数</div>
                <div class="flex items-center text-sm font-SiyuanHei-Regula text-neutral_color_3 border border-neutral-300 rounded-full pl-2 pr-2">{{tableData.info.rowNum}}</div>
            </div>

            <div class="flex items-center flex-row space-x-2">
                <div class="text-sm font-SiyuanHei-Regula text-main_color_1">总列数</div>
                <div class="flex items-center text-sm font-SiyuanHei-Regula text-neutral_color_3 border border-neutral-300 rounded-full pl-2 pr-2">{{tableData.info.colNum}}</div>
            </div>

            <div class="flex items-center flex-row space-x-2">
                <div class="text-sm font-SiyuanHei-Regula text-main_color_1">重复的行数</div>
                <div class="flex items-center text-sm font-SiyuanHei-Regula text-neutral_color_3 border border-neutral-300 rounded-full pl-2 pr-2">{{tableData.info.repeatedRowNum}}</div>
            </div>

            <div class="flex items-center flex-row space-x-2">
                <div class="text-sm font-SiyuanHei-Regula text-main_color_1">存在缺失值的列</div>
                <div class="flex items-center text-sm font-SiyuanHei-Regula text-neutral_color_3 border border-neutral-300 rounded-full pl-2 pr-2 text-pretty">{{tableData.info.nullColList}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DataframeTable',
    props: [
        "name",
    ],
    data() {
        return {
            tableData: {}
        }
    },
    methods: {
        // 判断Object对象是否为空
        checkNullObject(data) {
            return Object.keys(data).length != 0;
        },
        changeData(data) {
            this.tableData = data;
        }
    }
}

</script>

<style>

</style>