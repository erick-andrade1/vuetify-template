<template>
  <v-container fluid>
    <div class="bg-white">
      <div class="pb-2">
        <v-breadcrumbs :items="items" />
      </div>
      <div class="d-flex justify-start align-center pb-6 pl-2">
        <v-icon icon="mdi-arrow-left" class="mr-2" size="md" />
        <div class="text-h6">Cadastro de usuário</div>
      </div>
    </div>

    <v-card class="ma-5" density="comfortable" flat>
      <v-card-title class="pa-6">Contato principal</v-card-title>
      <hr />
      <v-form ref="form" class="pa-6">
        <v-row>
          <v-col cols="3">
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              <span style="color: red; font-size: 18px">*</span>
              <span class="ml-1">Primeiro nome</span>
            </div>
            <v-text-field
              v-model="data.firstName"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              density="compact"
            />
          </v-col>
          <v-col cols="3">
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              <span style="color: red; font-size: 18px">*</span>
              <span class="ml-1">Último nome</span>
            </div>
            <v-text-field
              v-model="data.lastName"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              density="compact"
            />
          </v-col>
          <v-col cols="3">
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              <span style="color: red; font-size: 18px">*</span>
              <span class="ml-1">Função</span>
            </div>
            <v-select
              v-model="data.function"
              density="compact"
              :items="['Gerente', 'Desenvolvedor', 'Técnico']"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              <span style="color: red; font-size: 18px">*</span>
              <span class="ml-1">Telefone</span>
            </div>
            <v-text-field
              v-model="data.phone"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              density="compact"
            />
          </v-col>
          <v-col cols="3">
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              <span style="color: red; font-size: 18px">*</span>
              <span class="ml-1">CPF</span>
            </div>
            <v-text-field
              v-model="data.cpf"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              density="compact"
            />
          </v-col>
          <v-col cols="3">
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              <span style="color: red; font-size: 18px">*</span>
              <span class="ml-1">E-mail</span>
            </div>
            <v-text-field
              v-model="data.email"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              density="compact"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end">
          <v-btn color="error" class="mt-4 mr-3" @click="reset" flat>
            Limpar Formulário
          </v-btn>
          <v-btn color="success" class="mt-4 mr-3" @click="validate" flat>
            Criar
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "create-user-form",
  data() {
    return {
      data: {},
      name: "",
      nameRules: [
        (v: any) => !!v || "Name is required",
        (v: any) =>
          (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      items: [
        {
          title: "Usuários",
          disabled: false,
          href: "users",
        },
        {
          title: "Cadastro",
          disabled: true,
          href: "create-user",
        },
      ],
    };
  },
  methods: {
    async validate() {
      const { valid } = await (this.$refs.form as any).validate();

      if (valid) return true;
    },
    reset() {
      (this.$refs.form as any).reset();
    },
    resetValidation() {
      (this.$refs.form as any).resetValidation();
    },
  },
});
</script>

<style scoped>
hr {
  color: #eeeeee !important;
  background-color: #eeeeee;
  border: none;
  height: 1px;
}
</style>
