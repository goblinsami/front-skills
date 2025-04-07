<script setup>
import { useUserStore } from '../stores/userStore'

import { useRouter } from 'vue-router'
import { ref } from 'vue'
import VueDraggable from 'vuedraggable'
import { computed } from 'vue'

const store = useUserStore()
const { setNavbarPosition } = useUserStore()
</script>
<template>
    <h1>Home</h1>
    <button @click="setNavbarPosition('top')">top</button>
    <button @click="setNavbarPosition('left')">left</button>
    <button @click="setNavbarPosition('right')">right</button>
    <button @click="setNavbarPosition('bottom')">bottom</button>
</template>
<style>
h1 {
    color: #333;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
}
</style>