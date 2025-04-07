<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import VueDraggable from 'vuedraggable'
import { useUserStore } from '../stores/userStore'
const { setNavbarPosition } = useUserStore()

// Secciones con tareas
const todoSection = ref([
  { id: uuidv4(), title: 'Tarea 1' },
  { id: uuidv4(), title: 'Tarea 2' }
])
const inProgressSection = ref([
  { id: uuidv4(), title: 'Tarea 3' }
])
const doneSection = ref([
  { id: uuidv4(), title: 'Tarea 4' }
])
const todoColumn = ref(null)
const inProgressColumn = ref(null)
const doneColumn = ref(null)
const columns = [todoColumn, inProgressColumn, doneColumn];

const dragSound = new Audio('/sounds/drag.mp3');
const dropSound = new Audio('/sounds/drop.mp3');



const cleanColumns = () => {
  columns.forEach(column => {
    if (column.value) {
      column.value.$el.classList.remove('highlight')
    }
  })
}
const handleMouseDown = (event) => {
  // Aquí puedes manejar el evento de mouse down
  dragSound.play();

}
const handleStart = (event) => {
  // Aquí puedes manejar el evento de inicio de arrastre

  console.log(todoColumn.value.$el.classList)

  document.body.classList.add('dragging-cursor');
  event.from.classList.add('highlight');

}
const handleMove = (event) => {
  cleanColumns()
  event.to.classList.add('highlight');
}

const handleEnd = (event) => {
  // Aquí puedes manejar el evento de finalización de arrastre
  console.log('Drag ended:', event)
  dropSound.play();

  cleanColumns()

  document.body.classList.remove('dragging-cursor')

}

</script>

<template>
  <h1>Vue Kanban Board
    <div class="d-flex">
      <button @click="setNavbarPosition('top')">top</button>
      <button @click="setNavbarPosition('left')">left</button>
      <button @click="setNavbarPosition('right')">right</button>
      <button @click="setNavbarPosition('bottom')">bottom</button>
    </div>
  </h1>
  <div class="kanban">
    <!-- To Do -->
    <div class="column ">
      <h2>To Do</h2>
      <VueDraggable ref="todoColumn" id="todo" class="task-list" v-model="todoSection" :group="'tasks'" item-key="id"
        :force-fallback="true" :animation="200" @start="handleStart" @move="handleMove" @end="handleEnd">
        <template #item="{ element }">
          <div class="task" @mousedown="handleMouseDown">{{ element.title }}</div>
        </template>
      </VueDraggable>
    </div>

    <!-- In Progress -->
    <div class="column">
      <h2>In Progress</h2>
      <VueDraggable ref="inProgressColumn" id="inprogress" class="task-list" v-model="inProgressSection"
        :group="'tasks'" item-key="id" :force-fallback="true" :animation="200" @start="handleStart" @move="handleMove"
        @end="handleEnd">
        <template #item="{ element }">
          <div class="task" @mousedown="handleMouseDown">{{ element.title }}</div>
        </template>
      </VueDraggable>
    </div>

    <!-- Done -->
    <div class="column">
      <h2>Done</h2>
      <VueDraggable ref="doneColumn" id="done" class="task-list" v-model="doneSection" :group="'tasks'" item-key="id"
        :force-fallback="true" :animation="200" @start="handleStart" @move="handleMove" @end="handleEnd">
        <template #item="{ element }">
          <div class="task" @mousedown="handleMouseDown">{{ element.title }}</div>
        </template>
      </VueDraggable>
    </div>
  </div>
</template>

<style scoped></style>
