import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", () => {
  // States 
  const todoList = ref([]);
  // Getters 
  const getTodoList = computed(() => todoList.value);

  // Actions
 function getTodoFromLocal() {
  console.log('todos')
    const todos = JSON.parse(localStorage.getItem("todos"))
    console.log(todos)
    todoList.value = todos
  }
  // Add method 
  function addTodo(payload) {
    const newID = todoList.value.length + 1;
    const todo = {
      id: newID,
      title: payload,
      isCompleted: false
    }
    todoList.value.unshift(todo);
    storeTodoLocally()
  }
  // Edit Todo method 
  function editTodoByID(id, title) {
    const findTodo = todoList.value.find((item) => {
      return item.id === id
    })
    findTodo.title = title
    
    storeTodoLocally()
  }
  // Delete Todo method 
  function deleteTodoByID(id) {
    const indexOfItem = todoList.value.map((element) => element.id).indexOf(id)
    console.log(indexOfItem)
    todoList.value.splice(indexOfItem, 1)
    storeTodoLocally()
  }
  // Update Todo method
  function updateTodoByID(id, isCompleted) {
    const findTodo = todoList.value.find((item) => {
      return item.id === id
    })
    findTodo.isCompleted = isCompleted
    storeTodoLocally()
  }
  // Store Todos in localStorage every action 
  function storeTodoLocally() {
    localStorage.setItem('todos', JSON.stringify(todoList._rawValue))
  }
  return {getTodoList ,getTodoFromLocal, addTodo, editTodoByID, deleteTodoByID, updateTodoByID}
});
