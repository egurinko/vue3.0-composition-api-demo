<template>
  <div class="list-container m-auto my-10 bg-white rounded p-10">
    <div class="text-center my-10">
      Number of Working Todos : {{ numOfTodos }}
    </div>
    <div class="flex mb-10">
      <div class="w-2/3 mb-4 relative">
        <input
          class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
          id="todo"
          type="text"
          v-model="newTodo"
          autofocus
        />
        <label
          for="todo"
          class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
          >Todo</label
        >
      </div>
      <button
        class="w-1/3 bg-indigo-600 hover:bg-blue-dark text-white font-bold rounded ml-4 mb-4"
        @click="addTodo"
      >
        Add
      </button>
    </div>
    <div class="flex mb-10">
      <p class="mr-4">
        Filter By
      </p>
      <input
        type="checkbox"
        class="mx-1 mt-1"
        :checked="this.filterBy === 'All'"
        @click="handleClickFilterBy('All')"
      />
      <span class="select-none mr-4">All</span>
      <input
        type="checkbox"
        class="mx-1 mt-1"
        :checked="this.filterBy === 'Working'"
        @click="handleClickFilterBy('Working')"
      />
      <span class="select-none mr-4">Working</span>
      <input
        type="checkbox"
        class="mx-1 mt-1"
        :checked="this.filterBy === 'Done'"
        @click="handleClickFilterBy('Done')"
      />
      <span class="select-none mr-4">Done</span>
    </div>

    <div class="w-full" v-for="(todo, index) in filteredTodos" :key="index">
      <div class="flex my-1 hover:bg-blue-lightest rounded">
        <div class="w-4/5 py-3 px-1">
          <p>・{{ todo.name }}</p>
        </div>
        <button
          class="button w-1/6 text-center p-3 bg-green-600 text-white font-bold rounded ml-4 mb-4 "
          :class="{
            'cursor-not-allowed': todo.completed,
            'opacity-50': todo.completed
          }"
          :disabled="todo.completed"
          @click="completeTodo(index)"
        >
          Done
        </button>
        <button
          class="button w-1/6 text-center p-3 bg-yellow-500 text-white font-bold rounded ml-4 mb-4"
          :class="{
            'cursor-not-allowed': todo.completed,
            'opacity-50': todo.completed
          }"
          :disabled="todo.completed"
          @click="goEditTodo(index)"
        >
          Edit
        </button>
        <button
          class="button w-1/6 text-center p-3 bg-red-500 text-white font-bold rounded ml-4 mb-4"
          @click="deleteTodo(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import todos from "../utils/todos";
import { FilterByEnum, Data, FilterBy } from "./types/List";

export default Vue.extend({
  data: (): Data => ({
    todos: [],
    newTodo: "",
    filterBy: FilterByEnum.ALL
  }),
  computed: {
    filteredTodos: function() {
      return this.todos.filter(todo => {
        if (this.filterBy === FilterByEnum.WORKING) {
          return !todo.completed;
        }
        if (this.filterBy === FilterByEnum.DONE) {
          return todo.completed;
        }
        return todo;
      });
    },
    numOfTodos: function(): number {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  mounted(): void {
    this.init();
  },
  methods: {
    init: function(): void {
      this.getTodos();
    },
    addTodo: function(): void {
      const newTodo = { name: this.newTodo, completed: false };
      this.todos = [...this.todos, newTodo];

      this.newTodo = "";
    },
    deleteTodo: function(index: number): void {
      this.todos = this.todos.filter((todo, i) => i !== index);
    },
    completeTodo: function(index: number): void {
      this.todos[index].completed = true;
    },
    handleClickFilterBy: function(filterBy: FilterBy): void {
      this.filterBy = filterBy;
    },
    goEditTodo: function(index: number): void {
      this.$router.push(`/todos/${index}/edit`);
    },
    getTodos: function(): void {
      setTimeout(() => {
        this.todos = [...todos];
      }, 1000);
    }
  }
});
</script>

<style scoped>
.list-container {
  max-width: 800px;
}
.button {
  height: 40px;
}
.custom-label input:checked + svg {
  display: block !important;
}
.input {
  transition: border 0.2s ease-in-out;
  min-width: 280px;
}

.input:focus + .label,
.input:active + .label,
.input.filled + .label {
  font-size: 0.75rem;
  transition: all 0.2s ease-out;
  top: -0.1rem;
  color: #667eea;
}

.label {
  transition: all 0.2s ease-out;
  top: 0.4rem;
  left: 0;
}
</style>
