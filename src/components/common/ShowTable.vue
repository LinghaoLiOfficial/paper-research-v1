<template>
    <div class="h-full w-full mt-2 flex flex-col border border-neutral_color_6 shadow-sm rounded-xl p-6 items-center justify-center">
        <div class="overflow-auto min-h-0" style="max-height: 31rem; max-width: 68rem">
            
            <table class="table-fixed border-collapse border border-neutral_color_6 text-left">
                <thead class="text-neutral_color_1">
                    <tr class="border-neutral_color_6 font-SiYuanHei-Bold">
                        <th v-for="(item, i) in headers" :key="i" class="text-xs border p-2 pl-3 pr-16">{{item}}</th>
                    </tr>
                </thead>
                <tbody class="text-neutral_color_2">
                    <tr v-for="(list, i) in rows" :key="i" class="even:bg-white odd:bg-neutral_color_8 border-neutral_color_6 font-SiyuanHei-Regular">
                        <td v-for="(item, j) in list" :key="j" class="text-xs border-l border-r p-2 pl-3 pr-16 max-h-[50px] overflow-y-auto">{{item}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowTable',
    data() {
        return {
            headers: [],
            rows: []
        }
    },
    methods: {
        // 更新表头
        changeHeaders(headers) {
        this.headers = headers;
        },
        // 更新行数据
        changeRows(rows) {
        this.rows = rows;
        },
        checkNullObject(data) {
            return Object.keys(data).length != 0;
        }
    }
}

</script>

<style>

</style>