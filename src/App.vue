<script setup>
import { computed } from 'vue'
import Navbar from './components/Navbar.vue';
import { useUserStore } from './stores/userStore'

const store = useUserStore()
const activeNavbarPosition = computed(() => store.activeNavbarPosition)
const before = computed(() => store.activeNavbarPosition === 'top' || store.activeNavbarPosition === 'left')
const after = computed(() => !before.value)
const editMode = computed(() => store.isEditMode)

</script>
<template>
  <main style="display: flex;" :class="['container_' + activeNavbarPosition]">
    <Navbar v-if="before" />
    <section :class="'container' + '_' + activeNavbarPosition">
      <router-view />
    </section>
    <Navbar v-if="after" />

  </main>
</template>

<style>
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