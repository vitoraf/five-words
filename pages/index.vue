<template>
     <section class="flex flex-col gap-5 justify-center items-center size-full">
        <BaseButton class="bg-gray-500 text-white hover:bg-gray-600 w-full md:w-full p-5" @click="handleStart">Começar um novo jogo</BaseButton>
        <BaseButton class="bg-gray-500 text-white hover:bg-gray-600 w-full md:w-full p-5" @click="()=>enterRoom = true">Entrar em uma sala</BaseButton>
        <BaseButton class="bg-gray-500 text-white hover:bg-gray-600 w-full md:w-full p-5" @click="()=>howToPlay = true">Como jogar?</BaseButton>
        <BaseModal v-if="enterRoom" title="Entrar em uma sala" @close="enterRoom = false">
           <div class="flex flex-col ">
            <label class="flex flex-col gap-2">
               Insira o código da sala
               <input type="text" v-model="room" class="w-full px-5 text-center py-2 rounded bg-slate-100 dark:bg-slate-700 mb-4" name="room"/>
            </label>
            <BaseButton class="bg-gray-500 text-white hover:bg-gray-600w-full" @click="()=>navigateTo('/room/'+room)">Entrar</BaseButton>
           </div>

        </BaseModal>
        <BaseModal v-if="howToPlay" title="Como jogar?" @close="howToPlay = false">
         <article>
            <p class="mb-5">
             Five Words é um jogo onde você escolhe 5 palavras e o seu adversário tenta adivinhar as palavras que você escolheu e vice-versa.
             Regras:</p>
             <ul>
               <li class="mb-3">- A primeira palavra é visível para o seu adversário e vice-versa. As palavras restantes são ocultas, sendo exibidas apenas a inicial.</li>
               <li class="mb-3">- A palavra seguinte tem que ser relacionada com a palavra anterior, mas não necessariamente todas devem estar ligadas. (Exemplo: Palavra 1: "Amarelo", Palavra 2: "Girassol", a palavra 3 deve ser relacionada a "Girassol", mas não a "Amarelo", uma boa palavra seria "Flor")</li>
                <li class="mb-3">- Cada jogador deve fazer um palpite da palavra do oponente. Caso ele acerte, ele pode tentar adivinhar a próxima palavra. Caso ele erre, ele perde a vez e uma letra da palavra é revelada.</li>
                <li class="mb-3">- Ganha o jogo quem acertar as cinco palavras primeiro</li>
             </ul>
         </article>
            
            
           
   
        </BaseModal>
     </section>
     
</template>
    
<script setup >
const enterRoom = ref(false)
const howToPlay = ref(false)

// definePageMeta({
//   layout: 'project'
// })
//    const {status, data, send, open, close} = useWebSocket(`ws://${location.host}/api/websocket`)
   
    const store = useWordsStore()
    const name = ref('')
    const wordsList = ref(Array(5).fill(''))

    function handleStart(){
        
        navigateTo('/room/'+crypto.randomUUID())
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