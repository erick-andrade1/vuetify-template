<!-- eslint-disable vue/no-mutating-props -->
<template>
  <!-- <v-table v-if="users && users.result.length > 0">
    <thead>
      <tr>
        <th class="text-left text-subtitle-1">Nome</th>
        <th class="text-left text-subtitle-1">Email</th>
        <th class="text-left text-subtitle-1">Data de criação</th>
        <th class="text-left text-subtitle-1">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users.result" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ formatDate(user.createdAt) }}</td>
        <td>
          <v-menu
            transition="scale-transition"
            v-if="$hasPermissions(['update', 'delete'], 'users')"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                variant="tonal"
                icon="mdi-dots-vertical"
                size="small"
                v-bind="props"
              ></v-btn>
            </template>

            <v-list>
              <v-list-item
                value="update"
                v-if="$hasPermission('update', 'users')"
                @click="callUpdate(user.id)"
              >
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item
                value="delete"
                v-if="$hasPermission('delete', 'users')"
                @click="callDelete(user.id)"
              >
                <v-list-item-title>Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div class="d-flex justify-end pt-3">
    <v-pagination
      v-if="users && users.result.length > 0"
      v-model="users.currentPage"
      :total-visible="3"
      v-on:next="onPageChange"
      v-on:prev="onPageChange"
      :length="users.totalPages"
      rounded="circle"
    ></v-pagination>
  </div> -->
  <div
    class="d-flex justify-space-between bg-white mb-1 mt-1 pa-5"
    style="width: 100%"
  >
    <div class="text-h6">Consulta de usuários</div>
    <v-btn
      class="text-none text-subtitle-1"
      color="primary"
      @click="callCreate(true)"
      variant="flat"
    >
      Cadastrar usuário
    </v-btn>
  </div>

  <div
    class="d-flex justify-space-between bg-white mb-1 mt-1 pa-5"
    style="width: 100%"
  >
    <v-text-field
      v-model="filter.params.nameLike"
      clearable
      density="compact"
      hide-details
      placeholder="Pesquise o nome do usuário"
      append-inner-icon="mdi-magnify"
      style="max-width: 300px"
      variant="outlined"
    />
    <v-btn border class="text-none" variant="text" style="font-weight: 400">
      Exibir filtros
    </v-btn>
  </div>
  <v-data-table
    v-if="users && users.result.length > 0"
    :headers="headers"
    :items="users.result"
    item-key="users"
    :items-per-page="users.itensPerPage"
    v-model:page="users.currentPage"
    fixed-header
    height="300"
  >
    <template v-slot:item="{ item }: any">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ formatDate(item.createdAt) }}</td>
        <td v-if="$hasPermissions(['update', 'delete'], 'users')">
          <v-icon
            size="small"
            class="me-2"
            v-if="$hasPermission('update', 'users')"
            @click="callUpdate(item.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            v-if="$hasPermission('delete', 'users')"
            @click="callDelete(item.id)"
          >
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </template>
    <!-- <template v-slot:bottom>
      <div class="d-flex justify-space-between">
        <div class="pt-2 align-center pl-2">
          <v-text-field
            :model-value="users.itensPerPage"
            class="pa-2"
            hide-details
            density="compact"
            style="max-width: 300px"
            min="-1"
            max="15"
            type="number"
            variant="outlined"
            @update:model-value="users.itensPerPage = parseInt($event, 10)"
          ></v-text-field>
        </div>
        <div class="pt-2">
          <v-pagination
            class=""
            v-model="users.currentPage"
            :total-visible="3"
            v-on:next="onPageChange"
            v-on:prev="onPageChange"
            :length="users.totalPages"
          ></v-pagination>
        </div>
      </div>
    </template> -->
  </v-data-table>
</template>

<script lang="ts">
// import { IUserListDTO, ResultPaginate } from 'core';
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "users-list",
  emits: {
    onPageChange(value: number) {
      return value;
    },
    callUpdate(id: string) {
      return id;
    },
    callDelete(id: string) {
      return id;
    },
    callUpdatePassword(id: string) {
      return id;
    },
    callCreate(value: boolean) {
      return value;
    },
  },
  // props: {
  //   users: {
  //     required: false,
  //     type: Object as PropType<ResultPaginate<IUserListDTO>>,
  //   },
  // },
  props: {
    users: {
      required: false,
      type: Object,
    },
    filter: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      headers: [
        { title: "Nome", value: "name" },
        { title: "E-mail", value: "email" },
        { title: "Data de criação", value: "createdAt" },
        {
          title: "Ações",
          value: "actions",
          children: [],
        },
      ],
    };
  },
  methods: {
    formatDate(date: Date) {
      const formatedDate = new Date(date);
      return formatedDate.toLocaleString();
    },
    onPageChange(value: number) {
      this.$emit("onPageChange", value);
    },
    callUpdate(id: string) {
      this.$emit("callUpdate", id);
    },
    callDelete(id: string) {
      this.$emit("callDelete", id);
    },
    callUpdatePassword(id: string) {
      this.$emit("callUpdatePassword", id);
    },
    callCreate(value: boolean) {
      this.$emit("callCreate", value);
    },
    isMobile() {
      if (window.matchMedia("(max-width: 767px)").matches) {
        return true;
      }
      return false;
    },
  },
});
</script>
