<template>
    <div class="h-full w-full mt-2 flex flex-col border border-neutral_color_6 shadow-sm rounded-xl p-6">
        <div class="overflow-auto" style="max-height: 31rem; max-width: 68rem">
            <div class="pb-2 text-sm font-SiyuanHei-Regula text-neutral_color_3">{{name}}</div>
            
            <table v-if="checkNullObject(tableData)" class="table-fixed border-collapse border border-neutral_color_6 text-left">
                <thead class="text-neutral_color_1">
                    <tr class="border-neutral_color_6 font-SiYuanHei-Bold">
                        <th v-for="(item, i) in tableData.head" :key="i" class="text-xs border p-2 pl-3 pr-16">{{item}}</th>
                    </tr>
                </thead>
                <tbody class="text-neutral_color_2">
                    <tr v-for="(list, i) in tableData.body" :key="i" class="even:bg-white odd:bg-neutral_color_8 border-neutral_color_6 font-SiyuanHei-Regular">
                        <td v-for="(item, j) in list" :key="j" class="text-xs border-l border-r p-2 pl-3 pr-16">{{item}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: [
        "name",
    ],
    data() {
        return {
            tableData: {}
        }
    },
    methods: {
        checkNullObject(data) {
            return Object.keys(data).length != 0;
        },
        setTableData(data) {
            this.tableData = data;
        }
    }
}

</script>

<style>

</style>