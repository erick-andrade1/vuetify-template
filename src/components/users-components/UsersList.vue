<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-table v-if="users && users.result.length > 0">
    <thead style="background-color: #bc9878; color: white">
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
  </div>
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
    isMobile() {
      if (window.matchMedia("(max-width: 767px)").matches) {
        return true;
      }
      return false;
    },
  },
});
</script>
