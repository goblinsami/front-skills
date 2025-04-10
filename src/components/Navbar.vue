<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { ref } from 'vue'
import VueDraggable from 'vuedraggable'
import { computed } from 'vue'

const { toggleEditMode, isEditMode } = useUserStore()
const store = useUserStore()
const activeNavbarPosition = computed(() => store.activeNavbarPosition)

const todoSection = ref([
    { title: 'Tarea 1' },
])
const router = useRouter()
const navBar = ref(null)
const goBack = () => {
    router.back()
}
const editNavbar = () => {
    console.log('editNavbar')
    store.toggleEditMode()
}
const editMode = computed(() => store.isEditMode)

const position = ref('top')

const isDragging = ref(false)

const handleDrop = (event) => {
    console.log('Dropped:', event)
    // Lógica para manejar el drop si es necesario
}

const handleStart = () => {
    isDragging.value = true
}

const handleEnd = () => {
    isDragging.value = false
}
</script>
<template>


    <nav class="navbar" ref="navBar" :class="[editMode ? 'editMode' : '', 'nav_' + activeNavbarPosition]">
        <div class="button_block" :class="'btn_block_' + activeNavbarPosition">
            <a class="button" @click="goBack">Volver</a>

            <RouterLink class="button" to="/">Home</RouterLink>

            <RouterLink class="button" to="/board">Board</RouterLink>
        </div>
        <div class="button_block">
            <a class="button edit" @click="editNavbar">Edit</a>

        </div>
    </nav>


</template>
<style>
.button_block {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
}

.btn_block_left {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.btn_block_right {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

/* .editMode {
    background: rgba(246, 247, 214, 0.1) !important;
    border: dashed 1px #1b1b1b;
    opacity: 0.5;
    cursor: grab;

}
 */
.edit {
    border: none;
    opacity: 0;
    pointer-events: none;
    /* Evita que interfiera mientras está invisible */
    transition: opacity 0.5s ease;
}

.navbar:hover .edit {
    opacity: 0.8;
    pointer-events: auto;
    /* Se puede interactuar al hacer hover */
}

.navbar {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    gap: 1rem;

}

.nav_top {
    align-items: center;
    flex-direction: row;
}

.nav_left {
    height: 100vh;
    flex-direction: column;
}

.nav_right {
    height: 100vh;
    flex-direction: column;
}

.nav_bottom {
    flex-direction: row;
}

.button {
    background: #fff;
    margin-bottom: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background 0.2s ease;
    cursor: pointer;
    border: none;
    font-size: 1rem;
    width: 60px;
    text-align: center;

}

.button:hover {
    background: #f0f0f0;
}
</style>