<template>
  <v-app v-if="myUser !== undefined && isNotEmpty()">
    <NavigationLayout />
    <v-main>
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
