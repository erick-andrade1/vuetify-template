<template>
  <v-container>
    <!-- <v-navigation-drawer
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

            <v-list-item-title v-text="item.name" />
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar color="bg-white" height="55" flat>
      <template v-slot:prepend>
        <v-avatar size="180">
          <v-img
            class="mx-2"
            src="../../assets/logo-bionic.png"
            alt="logo"
            max-height="180"
            max-width="180"
            contain
          />
        </v-avatar>
      </template>

      <v-tabs align-tabs="title" v-model="tab" mobile-breakpoint="xs">
        <v-tab
          v-for="(item, i) in itemsSidebar"
          :key="i"
          :value="item.to"
          :href="item.to"
        >
          <div v-if="$hasPermission(item.resource, item.action)">
            <v-icon :icon="item.icon" class="mr-2" />
            {{ item.name }}
          </div>
        </v-tab>
      </v-tabs>

      <template v-slot:append>
        <div class="d-none d-md-flex">
          <v-btn rounded variant="flat" size="50">
            <v-icon icon="mdi-magnify" />
          </v-btn>

          <v-btn rounded variant="flat" size="50">
            <v-icon icon="mdi-help-circle-outline" />
          </v-btn>

          <v-btn rounded variant="flat" size="50">
            <v-icon icon="mdi-bell-outline" />
          </v-btn>
        </div>

        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn rounded variant="text" v-bind="props" v-if="!isMobile()">
              <div
                class="text-black text-subtitle-1 d-flex justify-center"
                v-if="myUser"
              >
                {{ myUser.name }}
              </div>
            </v-btn>
            <v-btn icon v-bind="props" v-else>
              <v-avatar color="brown" size="small">
                <span class="text-truncate">{{ myUser.name }}</span>
              </v-avatar>
            </v-btn>
          </template>

          <v-list style="font-size: 13px !important">
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
      </template>
    </v-app-bar>

    <!-- <v-app-bar app class="mt-5">
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Your Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title class="d-none d-sm-flex">
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title @click="tab = index">{{
              item
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    -->
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
    tab: "",
    drawer: false,
    // tab: 0,
    // items: ["web", "shopping", "videos", "images", "news"],
  }),
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ["myUser"]),
  },
  methods: {
    isMobile() {
      if (window.matchMedia("(max-width: 767px)").matches) {
        return true;
      }
      return false;
    },
    async logout() {
      await this.authStore.logout();
    },
    getCurrentRoute() {
      this.tab = this.$route.path;
    },
  },
  created() {
    this.getCurrentRoute();
  },
});
</script>

<style lang="scss" scoped>
.v-slide-group-item--active {
  color: #1e88e5;
}
a {
  font-size: 13px !important;
}
</style>
