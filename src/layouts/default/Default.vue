<template>
  <v-app v-if="myUser !== undefined && isNotEmpty()">
    <NavigationLayout />
    <v-main style="background-color: #f5f5f5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores";

import NavigationLayout from "@/components/layout/NavigationLayout.vue";

export default defineComponent({
  name: "default-layout",
  components: {
    NavigationLayout,
  },
  computed: {
    ...mapState(useAuthStore, ["myUser"]),
  },
  methods: {
    isNotEmpty() {
      if (Object.keys(this.myUser).length) {
        return true;
      }
      return false;
    },
  },
});
</script>
<style>
body {
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 10px;
}

.v-container {
  padding: 0 !important;
  box-sizing: border-box;
}
</style>
