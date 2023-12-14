<template>
  <v-row justify="center">
    <v-dialog
      v-model="isModalOpened"
      width="1024"
      @update:model-value="closeModal"
      persistent
    >
      <v-sheet width="800" class="mx-auto py-3 px-5">
        <div class="d-flex justify-end pb-4">
          <v-btn
            icon
            @click="closeModal"
            style="background: none; box-shadow: none"
          >
            <v-icon icon="mdi-close" size="large"></v-icon>
          </v-btn>
        </div>
        <v-form ref="form">
          <v-text-field
            class="mb-3"
            v-model="data.name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          />

          <v-select
            class="mb-3"
            v-model="data.email"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="Item"
            required
          />

          <v-checkbox
            v-model="data.box"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
          />

          <div class="d-flex justify-end">
            <div class="mr-2">
              <v-btn color="error" class="mt-4" block @click="reset">
                Resetar Formulário
              </v-btn>
            </div>
            <div>
              <v-btn color="success" class="mt-4" block @click="onSubmit">
                Cadastrar
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-sheet>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { mapState, mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "create-user-modal",
  emits: ["createUser", "closeModal"],
  data() {
    return {
      selectedRoles: [],
      optionsRoles: [],
      isModalOpened: true,
      data: {
        name: "",
        email: "",
        box: "",
      },
      name: "",
      nameRules: [
        (v: any) => !!v || "Name is required",
        (v: any) =>
          (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },

  methods: {
    // changeSelected(value: string) {
    //   if (value) {
    //     this.selectedRoles.push(value);
    //   }
    // },
    changePositionUp(index: number) {
      this.selectedRoles.splice(
        index - 1,
        0,
        this.selectedRoles.splice(index, 1)[0]
      );
    },
    changePositionDown(index: number) {
      this.selectedRoles.splice(
        index + 1,
        0,
        this.selectedRoles.splice(index, 1)[0]
      );
    },
    removeSelected(index: number) {
      this.selectedRoles.splice(index, 1);
    },
    showRoles() {
      if (this.selectedRoles?.length && this.optionsRoles?.length) {
        return true;
      }
      return false;
    },
    // async getAllRoles() {
    //   await this.storeGetAllRoles();
    //   for (let index = 0; index < this.roles.length; index++) {
    //     const element = this.roles[index];
    //     this.optionsRoles.push({
    //       value: element.name,
    //       text: element.name,
    //     });
    //   }
    // },
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
    async onSubmit(values: any) {
      const isValid = await this.validate();
      if (isValid) {
        const data = {
          ...values,
          roles: this.selectedRoles,
        };
        this.selectedRoles = [];
        this.$emit("createUser", data);
        this.closeModal();
      }
    },
    closeModal() {
      this.selectedRoles = [];
      this.$emit("closeModal");
    },
  },
  // created() {
  //   this.getAllRoles();
  // },
});
</script>
