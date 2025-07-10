<template>
    <div class="flex gap-2 flex-col w-full">
        <template v-for="word, index in words" :key="word">
            <!-- {{ word }} -->
            <BaseWord :word="word" :position="index"  :active="active && user === 'player'? store.user.position[index] : store.opponent.position[index]" :user="user"/>

        </template>
    </div>
</template>

<script setup>
//    const {status, data, send, open, close} = useWebSocket(`ws://${location.host}/api/websocket`)
import { ref, onMounted, onBeforeUnmount } from 'vue'

import BaseWord from '@/components/palavras/BaseWord.vue'
const store = useWordsStore()
const position = ref([true, true, false, false, false])

defineProps({
    words: Object,
    active: Boolean,
    user: String
})

function nextWord(index) {
    position.value[index + 1] = true
}
</script>

<style></style>