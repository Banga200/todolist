<script setup>
import Pencil from './icons/IconPencil.vue';
import Trash from './icons/IconTrash.vue';
import Check from './icons/IconCheck.vue';
import FullCheck from './icons/IconFullCheck.vue';
import CheckEdit from './icons/IconCheckEdit.vue';
import Close from './icons/IconClose.vue';
import { ref, computed } from "vue";
import { useTodoStore } from '../stores/todoStore';

const props = defineProps(['key','id', 'title', 'isComplete'])
const editInput = ref(false);
const store = useTodoStore();
const editFieldText = ref('');
// Computed 
const ColorBG = computed(() => props.isComplete)

// Functions
function toogleEdit() {
    editInput.value = !editInput.value
    editFieldText.value = ''
}
function deleteTodo(id) {
    store.deleteTodoByID(id)
}
function updateTodo(id, isCompleted) {
    store.updateTodoByID(id, isCompleted);

}
function confirmEdit(id) {
    if (editFieldText.value !== '') {
        store.editTodoByID(id, editFieldText.value)
        editFieldText.value = ''
        editInput.value = !editInput.value
    }

}
</script>
<template>
    
    <li class="todoitem__container" :class="{ isCompleted: ColorBG }" :key="props.key">
        <h5>{{ props.title }}</h5>
        <div class="edit__container" v-if="editInput">
            <input v-model="editFieldText" @keyup.enter="confirmEdit(props.id)" placeholder="Press Enter To Save" class="EditInput" />
            <Close width="40px" @click="toogleEdit"/>
        </div>
        <!-- options  -->
        <p v-if="props.isComplete">
            <FullCheck width="30px" />
        </p>
        <div class="todo__options__container">
            <button class="edit_button" @click="toogleEdit" v-if="!editInput" :disabled="props.isComplete">
                <Pencil />
            </button>
            <button class="confirmEdit_button" @click="confirmEdit(props.id)" v-else="editInput">
                <CheckEdit />
            </button>
            <button class="trash_button" @click="deleteTodo(props.id)">
                <Trash />
            </button>
            <button class="complete_button" @click="updateTodo(props.id, !props.isComplete)" v-if="!props.isComplete">
                <Check />
            </button>
        </div>
    </li>
</template>
