<template>
    <div class="w-full mb-4"  v-if="store.opponent.id !== ''">
        <h2 class="text-2xl text-center" v-if="store.state.winner === null">{{ store.state.turn === store.user.id ? 'Sua vez' : 'Vez do oponente' }}</h2>
        <h2 class="text-2xl text-center" v-else>{{ store.state.winner === store.user.id ? 'Você ganhou' : 'Você perdeu' }}</h2>
        
       
    </div>
    <div class="flex justify-center flex-col md:flex-row mt-10 gap-5 mb-5" v-if="store.opponent">
        <div class="w-full" v-show="store.state.turn === store.opponent.id || store.state.winner !== null">
            <h2 class="w-full" v-if="store.state.winner !== null">{{ store.user.name }}</h2>
            <!-- {{ store.user }} -->
            <WordList :words="store.wordsList" :active="false" user="opponent"></WordList>
        </div>
        <div class="w-full" v-show="store.state.turn === store.user.id || store.state.winner !== null">
            <h2 class="w-full" v-if="store.state.winner !== null">{{ store.opponent.name }}</h2>
            <!-- {{ store.opponent }} -->
            <WordList :words="store.opponent.words" :active="store.state.turn === store.user.id" user="player"></WordList>
        </div>
    </div>
    <div class="w-full" v-else>
        Aguardando oponente

    </div>
    <div class="mt-5" v-if="store.opponent">
        <form @submit.prevent="handleGuess" v-if="store.state.winner === null">
            <input type="text" class="mt-5 w-full px-5 text-center py-2 rounded bg-slate-100mb-4" name="word1" :disabled="store.state.turn !== store.user.id" v-model="guess" />
        </form>
    </div>
    <div class="mt-5" v-if="store.state.winner !== null">
        <BaseButton class="bg-slate-700 text-white hover:bg-slate-800 w-full md:w-full" @click="store.resetGame">Novo Jogo</BaseButton>


    </div>
       <!-- <WebSocket /> -->
</template>
    
<script setup >
    import { ref } from 'vue'
    import WordList from '@/components/palavras/WordList.vue'
    
    const store = useWordsStore()
    const guess = ref('')
    onBeforeMount(()=>{
        store.createOrJoinChannel('5words')
    })
    async function handleGuess() {
        await store.guessWord(guess.value)
        guess.value = ''
    }

</script>
    
<style>
    
</style>