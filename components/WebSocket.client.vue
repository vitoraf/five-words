<template>
    <div class="text-slate-200">
        <h1>WebSocket - Let's go!</h1>
        <form @submit.prevent="sendData">
            <input v-model="message" type="text" required />
            <button type="submit">Send</button>
        </form>
        <div class="mt-4">
      <p v-for="(msg, index) in messages" :key="index" class="p-1 border-b">{{ msg }}</p>
    </div>
        <!-- <div>
            <p v-for="entry in history">{{ entry }}</p>
        </div> -->
    </div>
</template>

<script setup lang='ts'>
//    const {status, data, send, open, close} = useWebSocket(`ws://${location.host}/api/websocket`)
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useWebSocket } from '~/utils/supabase'

const message = ref('')
const { messages, connect, sendMessage, disconnect } = useWebSocket('sala1')

onMounted(() => {
    connect()
})

onBeforeUnmount(() => {
    disconnect()
})

function sendData() {
    if (message.value.trim()) {
        sendMessage(message.value)
        message.value = ''
    }
}
</script>

<style></style>