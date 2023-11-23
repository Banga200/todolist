<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useTodoStore } from './stores/todoStore';
import {onMounted} from "vue"
const store = useTodoStore();

onMounted(() => {store.getTodoFromLocal()})
</script>

<template>
  <RouterView />
</template>

