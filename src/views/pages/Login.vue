<template>
  <v-container fluid class="fill-height bg-grey">
    <v-card class="mx-auto px-6 py-8" max-width="500" width="100%">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          type="email"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          type="password"
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores, mapState } from "pinia";
import { useAuthStore } from "@/stores";

import { getInitialRoute } from "@/navItems";

export default defineComponent({
  name: "login",
  data: () => ({
    form: false,
    email: "",
    password: "",
    loading: false,
  }),
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ["currentUser"]),
  },
  methods: {
    async onSubmit() {
      if (!this.form) return;

      this.loading = true;

      const data = {
        username: this.email,
        password: this.password,
      };

      await this.authStore.login(data).then(() => {
        // Mudar para quando as roles do sistema forem cadastradas
        // this.$router.push(getInitialRoute(this.currentUser.user));
        if (this.currentUser.user) {
          this.$router.push("users");
        }
      });
    },
    required(v: any) {
      return !!v || "Field is required";
    },
  },
});
</script>
