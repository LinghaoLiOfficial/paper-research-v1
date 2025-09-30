<template>
    <div class=" w-full flex flex-col border border-slate-300 shadow-sm p-3 rounded-xl">
        <div class="pb-4 text-sm font-SiyuanHei-Regula text-neutral_color_3">{{title}}</div>
        <div class=" flex flex-row space-x-4">
            <FolderNameDropdown @chooseFolderName="chooseFolderName" ref="FolderNameDropdown" :name="'选择数据集'"/>
            <DataFileNameDropdown ref="DataFileNameDropdown" :name="'选择风机时间序列数据'"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Block',

    props: [
        "title"
    ]
}
</script>

<style>

</style>