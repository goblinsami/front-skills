<script setup>
import { ref, onMounted, defineEmits } from 'vue'

// Definir props correctamente
const props = defineProps({ task: Object })

onMounted(() => {
    if (props.task.editMode) { // ✅ Funciona sin `toRefs`
        inputRef.value.focus()
    }
})
const editMode = ref(false)
const inputRef = ref(null)
const newTitle = ref('')

const emit = defineEmits(['update-title'])

const updateTitle = () => {
    emit('update-title', newTitle.value) // Emitir el nuevo título al padre
    console.log('emit')
}
</script>

<template>
    <div class="task">
        <h3> <span v-if="!task.editMode">{{ task.title }}</span>
            <input ref="inputRef" type="text" placeholder="Títutlo" v-else v-model="newTitle" @blur="updateTitle"
                @keyup.enter="updateTitle" />
        </h3>
        <small>{{ task.id }} {{ task.editMode }}</small>
    </div>
</template>

<style scoped>
.task {
    background: #333;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    cursor: grab;
    user-select: none;
    /* Evita que el texto se seleccione */

}
</style>
