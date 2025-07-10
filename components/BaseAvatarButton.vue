<template>
    <button class="rounded-full size-full" :class="isActive ? 'border-4 border-violet-600' : 'border-4 border-transparent'">
        <img :src="src" alt="" width="64" class="w-full">
    </button>
</template>
<script setup>
const props= defineProps({
    src: String,
    isActive: Boolean
})
</script>