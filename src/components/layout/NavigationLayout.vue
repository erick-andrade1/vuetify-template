<template>
  <v-container>
    <v-navigation-drawer
      v-model="sidebarVisible"
      color="grey-lighten-2"
      class="border-none"
    >
      <v-list>
        <v-list-item class="mb-4">
          <v-img src="../../assets/logo-bionic.png" />
        </v-list-item>
        <div v-for="(item, i) in itemsSidebar" :key="i">
          <v-list-item
            v-if="$hasPermission(item.resource, item.action)"
            :value="item"
            :href="item.to"
            color="primary"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="grey-lighten-2" flat>
      <v-app-bar-nav-icon
        @click="sidebarVisible = !sidebarVisible"
      ></v-app-bar-nav-icon>
      <template #append>
        <v-btn icon class="mr-2">
          <v-badge :content="0">
            <v-icon icon="mdi-bell-outline" />
          </v-badge>
        </v-btn>

        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="surface-variant">
                <v-img
                  cover
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt=""
                ></v-img>
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item href="details" value="details">
              <template v-slot:prepend>
                <v-icon icon="mdi-account"></v-icon>
              </template>
              <v-list-item-title>Detalhes</v-list-item-title>
            </v-list-item>

            <v-list-item value="logout" @click="logout">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout"></v-icon>
              </template>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div
          class="text-black text-subtitle-2 d-flex justify-center"
          v-if="myUser"
        >
          {{ myUser.name }}
        </div>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import { mapStores, mapState } from "pinia";
import { defineComponent } from "vue";

import { useAuthStore } from "@/stores";

import nav from "../../navItems/_nav";

export default defineComponent({
  name: "navigation-layout",
  data: () => ({
    sidebarVisible: true,
    itemsSidebar: nav,
  }),
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ["myUser"]),
  },
  methods: {
    async logout() {
      await this.authStore.logout();
    },
  },
});
</script>
