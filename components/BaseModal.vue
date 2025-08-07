<template>
    <div class="w-full h-screen  p-5 md:p-20 bg-slate-900/80 fixed top-0 left-0  backdrop-blur-md flex justify-center modal-container z-10">
        <div class="w-1/2 max-h-screen bg-slate-600 rounded p-5 flex flex-col ">
            <div class="w-full flex justify-between font-bold text-lg">
                {{ title }}
                <button class="cursor-pointer p-2" @click="$emit('close')"><Icon name="material-symbols:close-rounded" width="32" height="32"/></button>
            </div>
            <div class="w-full h-max-96 overflow-y-auto">
                <slot>
                </slot>

            </div>

        </div>
    </div>
        

</template>
    
<script setup lang='ts'>
    const props = defineProps(['title'])
</script>
    
<style>
    
</style>