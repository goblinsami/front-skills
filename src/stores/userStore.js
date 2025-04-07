// stores/counterStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    navbarPosition: {
      top: true,
      bottom: true,
      right: false,
      left: false,
    },
    editMode: false,
  }),
  actions: {
    toggleEditMode() {
      this.editMode = !this.editMode
    },
    setNavbarPosition(position) {
      // Reset all positions to false
      for (const key in this.navbarPosition) {
        this.navbarPosition[key] = false
      }
      this.navbarPosition[position] = true
    },
  },
  getters: {
    activeNavbarPosition: (state) => {
      return Object.keys(state.navbarPosition).find((pos) => state.navbarPosition[pos])
    },
    isEditMode: (state) => {
      return state.editMode
    },
  },
})
