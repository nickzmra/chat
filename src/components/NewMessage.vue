<template>
    <div class="absolute bottom-0 left-0 right-0 flex focus-within:ring-4 focus-within:ring-teal-600">
        <input 
        v-model="newMessage" 
        type="text" 
        class="flex-grow text-xl font-thin focus:outline-none"
        @change="send"/>
        <button class="bg-emerald-600 px-8 focus:outline-none" @click="send"><mdi:send /></button>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import {database} from '~/helpers/useFirebase'

    const {sendMessage} = database()

    const newMessage = ref(null)

    const send = () => {
        if (newMessage.value?.length > 0){
            sendMessage(newMessage.value)
            newMessage.value = null
        }
    }
</script>