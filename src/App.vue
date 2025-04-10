<script setup>
import { computed, ref } from 'vue'
import Navbar from './components/Navbar.vue';
import { useUserStore } from './stores/userStore'
import VueDraggable from 'vuedraggable'
import { storeToRefs } from 'pinia';

const store = useUserStore()
const activeNavbarPosition = computed(() => store.activeNavbarPosition)
const before = computed(() => store.activeNavbarPosition === 'top' || store.activeNavbarPosition === 'left')
const after = computed(() => !before.value)
const editMode = computed(() => store.isEditMode)

const topSectionModel = ref([{ title: 'Navbar', id: 1 }])
const leftSectionModel = ref([])
const rightSectionModel = ref([])
const bottomSectionModel = ref([])

const handleEnd = (event) => {
  // Aquí puedes manejar el evento de inicio de arrastre
  console.log(event.to.id)
  store.setNavbarPosition(event.to.id)
  /*   store.toggleEditMode() */
}
</script>
<template>
  <main style="display: flex; width: 100%" :class="['container_' + activeNavbarPosition]">
    <Navbar v-if="before && !editMode" />
    <section :class="['container_' + activeNavbarPosition, 'content']">
      <router-view />
    </section>
    <Navbar v-if="after" />
    <section v-if="editMode">
      <VueDraggable @end="handleEnd" :force-fallback="true" id="top" class="top-section" v-model="topSectionModel"
        :group="'navbar'" item-key="id">
        <template #item="{ element }">
          <Navbar />
        </template>
      </VueDraggable>
      <VueDraggable @end="handleEnd" :force-fallback="true" id="right" class="right-section" v-model="rightSectionModel"
        :group="'navbar'" item-key="id">
        <template #item="{ element }">
          <Navbar />
        </template>
      </VueDraggable>
      <VueDraggable @end="handleEnd" :force-fallback="true" id="left" class="left-section" v-model="leftSectionModel"
        :group="'navbar'" item-key="id">
        <template #item="{ element }">
          <Navbar />
        </template>
      </VueDraggable>
      <VueDraggable @end="handleEnd" :force-fallback="true" id="bottom" class="bottom-section"
        v-model="bottomSectionModel" :group="'navbar'" item-key="id">
        <template #item="{ element }">
          <Navbar />
        </template>
      </VueDraggable>

    </section>
  </main>
</template>

<style>
.content {
  padding: 82px
}

.top-section {
  position: absolute;
  border: 1px dashed red;
  /* background-color: rgba(170, 82, 82, 0.2); */
  height: 100px;
  width: 100%;
  top: 0;
  left: 0
}

.bottom-section {
  position: absolute;
  border: 1px dashed red;
  /* background-color: rgba(170, 82, 82, 0.2); */
  height: 100px;
  width: 100%;
  bottom: 0;
  left: 0
}

.right-section {
  position: absolute;
  border: 1px dashed red;
  /* background-color: rgba(170, 82, 82, 0.2); */
  width: 100px;
  height: 100%;
  right: 0;
  top: 0;
}

.left-section {
  position: absolute;
  border: 1px dashed red;
  /* background-color: rgba(170, 82, 82, 0.2); */
  width: 100px;
  height: 100%;
  left: 0;
  top: 0;
}

.container_top {
  flex-direction: column;
  justify-content: center;
}

.container_bottom {
  flex-direction: column;
  justify-content: center;
  height: 100vh;

}

.container_left {
  flex-direction: row;
  width: 90%;
}

.container_right {
  flex-direction: row;
  width: 100%;
}

.no-select {
  user-select: none;
}
</style>