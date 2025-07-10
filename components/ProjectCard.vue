<template>
    <NuxtLink :to="link" class="w-full md:w-1/2 lg:w-1/3 flex-1 bg-slate-100 dark:bg-slate-700 rounded shadow hover:shadow-lg dark:hover:bg-slate-600">
        <img :src="img" alt="" class="w-full">    
        <div class="px-5 py-8">
            <h2 class="text-2xl dark:text-slate-200">{{ name }}</h2>
        </div>
        </NuxtLink>
</template>
<script setup>
const props = defineProps(['name', 'link', 'img'])
</script>