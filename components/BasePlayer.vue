<script setup >
const store = usePlayersStore()
const props = defineProps(['name', 'points', 'avatar', 'index'])
</script>

<template>
    <li class="flex w-full items-center gap-5 mb-5 dark:text-white">
        <img :src="avatar" width="64">
        <div class="w-full text-xl flex justify-between items-center ">
            {{name}}
            <BaseButton class="bg-red-600 text-white p-2" title="Excluir" v-show="store.editActive" @click="store.removePlayer(index)"><Icon name="material-symbols:delete" width="12" height="12"/></BaseButton>
        </div>
        <div class="flex gap-2 items-center">
            <BaseButton class="bg-violet-500 text-white" @click="store.removePoint(index)"><Icon name="material-symbols:remove-rounded" width="32" height="32"/></BaseButton>
            {{ points }}
            <BaseButton class="bg-violet-500 text-white"@click="store.addPoint(index)" ><Icon name="material-symbols:add-2-rounded" width="32" height="32"/></BaseButton>
            
        </div>
        <!-- avatar -->
        <!-- Nome -->
         <!-- pontos -->
    </li>
</template>