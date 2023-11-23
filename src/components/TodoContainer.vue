<script setup>
import TodoItems from './todoitems.vue';
import { useTodoStore } from '../stores/todoStore';
import { ref, computed } from 'vue';

const store = useTodoStore();
const titleInput = ref('')

// Add New Todo 
function addNewTodo() {
    if (titleInput.value !== '') {
        store.addTodo(titleInput.value)
    }
    titleInput.value = ''
    
}
</script>
<template>
    <div class="todolist__container">
        <div class="field__container">
            <input placeholder="Enter Your Todo" @keyup.enter="addNewTodo" v-model="titleInput" />
            <button @click="addNewTodo">Add</button>
        </div>
        <div class="todoItems__container">
            <TransitionGroup  name="fade" tag="ul" class="container" appear>
                <TodoItems v-for="(todo,i) in store.getTodoList" :key="todo.title" :title="todo.title" :isComplete="todo.isCompleted" :id="todo.id"/>
            </TransitionGroup>
        </div>
    </div>
</template>