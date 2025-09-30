<template>
    <div class="bg-gray-100 rounded-lg p-4 shadow-inner">
        <div class="flex flex-col space-y-3">
            <div class="bg-white px-4 py-2 rounded-md shadow-sm flex justify-between items-center">
                <span class="ml-4 text-gray-600 flex-1 text-pretty" style="text-indent: 2em;">{{ content }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SingleTag',
    props: {
        content: {
            type: String,
            default: ""
        }
    }
}
</script>