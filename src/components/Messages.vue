<template>
    <Message v-for="(m, index) in messages" :key="index" :message=m />
    <NewMessage />
</template>

<script setup>
    import {database} from '~/helpers/useFirebase'
    const {messages} = database()
</script>