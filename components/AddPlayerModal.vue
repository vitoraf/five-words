<template>
        <div class="w-full h-screen  p-5 md:p-20 bg-slate-900/80 fixed top-0 left-0  backdrop-blur-md flex justify-center modal-container z-10">
            <div class=" w-full md:w-1/2 bg-white dark:bg-slate-700 rounded modal-content flex flex-col p-5 h-fit shadow-md dark:text-slate-200">
                <div class="w-full flex items-center justify-between border-b-slate-400 border-solid border-b-1">
                    <h2 class="text-xl font-semibold">Adicionar jogador</h2>
                    <button class="p-3 cursor-pointer" @click="closeModal"><Icon name="material-symbols:close-rounded" width="48" height="48"/></button>
                </div>
           
                <div class="my-4">
                    <div class="mb-4">
                        <h3>Escolha um avatar:</h3>
                    <ul class="grid grid-cols-3 md:grid-cols-6 gap-5">
                        <BaseAvatarButton v-for="(avatar,index) in avatarList" :src="avatar" :key="avatar" @click="setAvatar(index)" :isActive="avatarIndex == index"></BaseAvatarButton>
                        <!-- <button class="size-16 p-3 cursor-pointer rounded-full bg-violet-600" @click="open"><Icon name="material-symbols:add-2-rounded" width="32" height="32"/></button> -->
                    </ul>
                    </div>
                    <div class="flex gap-5 flex-col">
                        <label for="name">Digite seu nome<br>
                            <input v-model="name" type="text" name="name" id="name" class="border-slate-400 border rounded w-full p-1 dark:bg-slate-500">
                        </label>

                    </div>
                </div>
                <div class="flex justify-between md:justify-end gap-2">
                    <BaseButton class="bg-gray-500 hover:bg-gray-600 text-white" @click="closeModal">Cancelar</BaseButton>
                    <BaseButton class="bg-violet-600 text-white hover:bg-violet-700" @click="addPlayer">Adicionar</BaseButton>
                </div>
            </div>
        </div>
</template>
<script setup>
const playersStore = usePlayersStore()
const { files, open, reset, onCancel, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
})
const name = ref('')
const avatarIndex = ref(0)
const newPlayer = ref({name: '', points: 0, avatar: '/img/female_main.svg'})
const avatarList = [
    '/img/female_main.svg',
    '/img/female_secondary.svg',
    '/img/female_highlight.svg',
    '/img/male_main.svg',
    '/img/male_secondary.svg',
    '/img/male_highlight.svg',
]
onChange((files) => {
  console.log(files)
})
function closeModal() {
    emit('closeModal')
}

function addPlayer() {
    if(name.value == ''){
        alert('Digite um nome para o jogador')
    }else{
        newPlayer.value.name = name.value
        playersStore.players.push(newPlayer.value)
        closeModal()
    }
}
function setAvatar(index) {
    newPlayer.value.avatar = avatarList[index]
    avatarIndex.value = index
}
const emit = defineEmits(['closeModal'])
</script>
<style  scoped>
  
</style>