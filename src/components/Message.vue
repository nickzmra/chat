<template>
    <div class="container mx-auto flex bg-opacity-50 my-4 rounded-full" :class="isUser ? 'bg-blueGray-500' :'bg-gray-500'">
        <div>
            <!--<mdi:account class="bg-white rounded-full h-12 w-12 px-1"/>-->
            <img class="rounded-full h-12" :src="message.userPhotoURL" :alt="`Avatar of ${message.userName}`"/>
        </div>
        <div class="flex flex-grow">
            <div class="flex flex-grow items-center justify-between mx-4 font-thin text-xl text-white">
                <p>{{message.text}}</p>
                <p class="text-sm italic">{{message.userName}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {defineProps, computed, ref} from 'vue'
    import {authentication} from '~/helpers/useFirebase'

    const {user} = authentication()

    const isUser = computed(() => user.value.uid === props.message.userId)

    const props = defineProps({
        message: {
            type: Object,
            default: () => ({
                userName: '',
                userId: '',
                userPhotoURL: '',
                text: '',
                createdAt: '',
            }),
        },
    })
</script>