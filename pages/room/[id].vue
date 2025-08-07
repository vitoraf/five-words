<template>
     <div class="w-full md:w-3/5 items-center flex flex-col gap-3">
       
        <div class="pt-5 w-full flex gap-4 justify-center mt-5 items-center flex-col md:flex-row">
            <div class="text-center w-full mt-5">
                 <label for="playerName" class="flex flex-col w-full justify-center items-center">Digite seu nome
                    <input type="text" id="playerName" name="playerName" class="w-1/2 px-5 text-center py-2 rounded bg-slate-100 dark:bg-slate-700" v-model="store.user.name">
                </label>
            </div>
        </div>
        <div class=" w-full flex gap-4 justify-center mt-3 items-center flex-col md:flex-row text-slate-700 dark:text-slate-100 mb-5">
            <div class="flex flex-col text-center w-full items-center justify-center">
                <h2 class="text-md  text-center my-4">Escolha 5 palavras</h2>
                <form class="w-1/2 flex flex-col" @submit.prevent="handleStart">
                <input v-model="store.wordsList[0]" type="text" required class="w-full px-5 text-center py-2 rounded bg-slate-100 dark:bg-slate-700 mb-4" name="word1"/>    
                <input v-model="store.wordsList[1]" type="text" required class="w-full px-5 text-center py-2 rounded bg-slate-100 dark:bg-slate-700 mb-4" name="word2"/>    
                <input v-model="store.wordsList[2]" type="text" required class="w-full px-5 text-center py-2 rounded bg-slate-100 dark:bg-slate-700 mb-4" name="word3"/>    
                <input v-model="store.wordsList[3]" type="text" required class="w-full px-5 text-center py-2 rounded bg-slate-100 dark:bg-slate-700 mb-4" name="word4"/>    
                <input v-model="store.wordsList[4]" type="text" required class="w-full px-5 text-center py-2 rounded bg-slate-100 dark:bg-slate-700 mb-4" name="word5"/>    
                <div class="w-full" >
                    <BaseButton class="bg-gray-500 text-white hover:bg-gray-600 w-full md:w-full" type="submit">
                        Continuar
                        <Icon name="material-symbols:arrow-circle-right" width="32" height="32"/>
                    </BaseButton>
                </div>
            </form>
            </div>
        </div>
        
        <div class="w-1/2">
            <span class="mb-5">Código da sala:</span>
            <div class="flex flex-col items-center p-5 bg-slate-200 dark:bg-slate-700 rounded cursor-pointer" @click="copy(route.params.id)">
                {{ route.params.id }}
            </div>
            
        </div>
    </div>
</template>
    
<script setup >
// definePageMeta({
    //   layout: 'project'
    // })
//    const {status, data, send, open, close} = useWebSocket(`ws://${location.host}/api/websocket`)
   onMounted(()=>{
       store.room = route.params.id
      })
   const store = useWordsStore()
   const name = ref('')
   const wordsList = ref(Array(5).fill(''))
   const route = useRoute()
   const id = ref(route.params.id)
   const {text, copy} = useClipboard({source: id})
    function handleStart(){
        setTimeout(() => {
            navigateTo('/play')
        }, 1000)
    }
//    watch(data, (newValue) => {
//        history.value.push(`server: ${newValue}`)
//    })
//    function sendData(){
//     history.value.push(`client: ${wordList.value}`)
//        send(wordList.value)
//        wordList.value = ''
//    }
</script>
    
<style>
    
</style>