<template>
    <section class="w-full flex flex-col items-center" >
    <div class="w-full" v-if="store.opponent === undefined">
        Aguardando oponente

    </div>
    <div class="flex justify-center flex-col md:flex-row mt-10 gap-5 mb-5" v-else>
        <div class="w-full mb-4" >
            <h2 class="text-2xl text-center" v-if="store.state.winner === null">{{ store.state.turn === store.user.id ? 'Sua vez' : 'Vez do oponente' }}</h2>
            <h2 class="text-2xl text-center" v-else>{{ store.state.winner === store.user.id ? 'Você ganhou' : 'Você perdeu' }}</h2>
            
           
        </div>
        <div class="w-full" v-show="store.state.turn === store.opponent.id || store.state.winner !== null">
            <h2 class="w-full" v-if="store.state.winner !== null">{{ store.opponent.name }}</h2>
            <!-- {{ store.user }} -->
            <WordList :words="store.wordsList" :active="false" user="opponent"></WordList>
        </div>
        <div class="w-full" v-show="store.state.turn === store.user.id || store.state.winner !== null">
            <h2 class="w-full" v-if="store.state.winner !== null">{{ store.user.name }}</h2>
            <!-- {{ store.opponent }} -->
            <WordList :words="store.opponent.words" :active="store.state.turn === store.user.id" user="player"></WordList>
        </div>
        <div class="mt-5">
            <form @submit.prevent="handleGuess" v-if="store.state.winner === null">
                <input type="text" class="mt-5 w-full px-5 text-center py-2 rounded bg-slate-100mb-4" name="word1" :disabled="store.state.turn !== store.user.id" v-model="guess" />
            </form>
        </div>
        <div class="mt-5" v-if="store.state.winner !== null">
            <BaseButton class="bg-gray-500 text-white hover:bg-gray-600 w-full md:w-full" @click="store.resetGame">Novo Jogo</BaseButton>
    
    
        </div>
        <Transition name="fade">
            <div class="w-full text-center absolute top-0 left-0" v-if="store.showAlert">
               Palpite de {{ store.opponent.name }}: {{ store.currentGuess}}
            </div>
        </Transition>
    </div>
    
    </section>
       <!-- <WebSocket /> -->
</template>
    
<script setup >
    definePageMeta({
  layout: 'game'
})
    import { ref } from 'vue'
    import WordList from '@/components/palavras/WordList.vue'
    
    const store = useWordsStore()
    const guess = ref('')
    onBeforeMount(()=>{
        store.createOrJoinChannel()
    })
    async function handleGuess() {
        await store.guessWord(guess.value)
        guess.value = ''
    }

</script>
    
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
    
</style>