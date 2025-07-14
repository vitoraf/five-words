<template>
    <div class="flex gap-2 justify-between w-full">
        <div class="flex gap-2 w-full">

            <template v-for="(letter, index) in wordSplit">
                <span class="border rounded flex size-8 justify-center items-center text-slate-200 p-2" v-if="index <= 0 || position <= 0">
                    {{ letter }}
                </span>
                <template v-if="index>0 && position > 0 && (index < data.index || position <= data.round) && data.position[position] && data.guesses[position] !== ''">
                    <span v-if="data.guesses[position] !== word && index <= data.index" class="border rounded flex size-8 justify-center items-center text-slate-200 p-2 border-red-800">{{ letter }}</span>
                    <span v-if="data.guesses[position] === word" class="border rounded flex size-8 justify-center items-center text-slate-200 p-2 border-green-500">{{ letter }}</span>

                </template>

                
                <!-- <span v-if="(position === data.round && index > 0 && position > 0 && index <= data.index) || ((store.state.winner !== data.id && store.state.winner !== null) && index > 0 && position > 0  (data.guesses[position] !== '' && data.guesses[position] !== word))" class="border rounded flex size-8 justify-center items-center text-slate-200 p-2 border-red-800">
                {{ letter }}
                </span>
                
                <span type="text" class="border rounded flex size-8 justify-center items-center text-slate-200 p-2 border-green-500"  v-if="(data.guesses[position] !== '' && data.guesses[position] === word  && position > 0 && index > 0) || (store.state.winner === data.id && index > 0 && position > 0)" maxlength="1">{{ letter }}</span> -->
                
    
            </template>

        </div>
        <div v-if="position>0 && store.normalizeWords(data.guesses[position].toLowerCase()) === store.normalizeWords(word.toLowerCase())">
             <span class="border border-green-500 rounded flex size-8 justify-center items-center text-green-500 p-2">
                <icon name="material-symbols:check" width="32" height="32"/>
             </span>
        </div>

    </div>
</template>
    
<script setup>
    const props = defineProps(['word', 'position', 'active', 'user'])
    const wordSplit = props.word.split('')
    
    const store = useWordsStore()

    const data = computed(() => {
        if (props.user === 'player') {
            return store.user
        }
        else{
            return store.opponent
        }
    })
    // watch(store, () => {
    //     if(!props.active && store.state.guesses[props.position]){
            
    //         if(store.state.guesses[props.position].length > 0) {
    //             let aux =  store.state.guesses[props.position][store.state.guesses[props.position].length - 1]
    //             console.log(aux)
    //             checkLetter(aux, store.state.guess.index)
    //         }
    //     }
    // })
    // function checkLetter(letter, index=1) {
    //     if(props.user === 'player') {
            
    //     }
        
    //     if(wordSplit[index] === letter) {
    //         list.value += 1
    //         status.value[index] = true
    //         currentLetter.value = ''
    //         if(index !== wordSplit.length - 1) {
    //             setTimeout(() => {
    //                 wordRef.value[index + 1].focus()
    //             }, 50);
    //         }else{
    //             setTimeout(() => {
    //                 wordRef.value[index].blur()
    //             }, 50)
    //             store.state.position[props.position + 1] = true
                
    //         }
    //     }else{
    //         setTimeout(() => {
    //             if(props.active){
    //                 store.setTurn(store.opponent.id)
    //             }
    //             currentLetter.value = ''
    //         }, 500)
    //          status.value[index] = false
    //     }
    //     if(props.active){
    //         store.guessLetter(letter, status.value[index], props.position, index)
        
    //     }
    // }
</script>
    
<style>
    
</style>