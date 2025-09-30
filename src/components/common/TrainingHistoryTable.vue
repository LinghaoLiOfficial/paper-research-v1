<template>
    <div class="h-full w-full flex flex-col px-4 pb-12">
        <div class=" overflow-auto">
            
            <table v-if="checkNullObject(tableData)" class="table-fixed border-collapse border border-neutral_color_6 text-left">
                <thead class="text-neutral_color_1">
                    <tr class="border-neutral_color_6 font-SiYuanHei-Bold">
                        <th v-for="(item, i) in tableData.head" :key="i" class="text-xs border p-2">{{item}}</th>
                    </tr>
                </thead>
                <tbody class="text-neutral_color_2">
                    <tr v-for="(mapping, i) in tableData.body" :key="i" @click="handleRowClick(mapping, i)" class=" cursor-pointer even:bg-white odd:bg-neutral_color_8 font-SiyuanHei-Regular" :class="[selectedRow == i ? ' border-2 border-main_color_2' : ' hover:border-2 hover:border-main_color_2 border border-neutral_color_6']">
                        <td v-for="(item, j) in mapping" :key="j">
                            <div v-if="typeof item === 'string'" class="text-xs border-x p-2">{{item}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrainingHistoryTable',
    props: [
        "name",
    ],
    data() {
        return {
            tableData: {},

            selectedRow: null,
        }
    },

    methods: {

        handleRowClick(row, index) {

            this.selectedRow = index;

            this.$emit("listen", row);
        },

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