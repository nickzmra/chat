<template>
    <div class="bg-emerald-700 text-gray-300 py-3.5">
        <div class="container mx-auto flex justify-between items-center">
            <div class="brand flex space-x-1 text-3xl">
                <bx:bx-message-rounded-dots class="text-coolGray-700 m-1"/>
            <h1 class="font-thin">Text<span class="font-bold text-coolGray-700">Chat</span></h1>
        </div>
        <div class="menu">
            <div v-if="!isAuthenticated">
                <button 
                class="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-green-500" 
                @click="googlePopup">Login</button>
            </div>
            <div v-else class="flex items-center space-x-8">
                <p>Welcome, {{user?.displayName}}!</p>
                <button 
                class="bg-orange-700 text-white py-2 px-4 rounded-full hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-green-500" 
                @click="signOut">Logout</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
    import { authentication } from '~/helpers/useFirebase'

    const {isAuthenticated, user, googlePopup, signOut} = authentication()
</script>