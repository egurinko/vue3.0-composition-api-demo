<template>
  <div class="list-container m-auto my-10 bg-white rounded p-10">
    <div class="text-center">
      Number of Working Todos
    </div>
    <svg class="m-auto mb-5" viewBox="0 0 500 500" width="100px" height="100px">
      <g id="UrTavla">
        <circle
          style="fill:url(#toning);stroke:#5a67d8;stroke-width:1.6871;stroke-miterlimit:10;"
          cx="250"
          cy="250"
          r="200"
        ></circle>
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          stroke="#5a67d8"
          stroke-width="2px"
          dy=".3em"
          font-size="100"
        >
          {{ numOfTodos }}
        </text>
      </g>
    </svg>
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
      <label class="custom-label flex mr-4">
        <div
          class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
        >
          <input
            type="checkbox"
            class="hidden"
            :checked="this.filterBy === 'All'"
            @click="changeFilterBy('All')"
          />
          <svg
            class="hidden w-4 h-4 text-green-600 pointer-events-none"
            viewBox="0 0 172 172"
          >
            <g
              fill="none"
              stroke-width="none"
              stroke-miterlimit="10"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode:normal"
            >
              <path d="M0 172V0h172v172z" />
              <path
                d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                fill="currentColor"
                stroke-width="1"
              />
            </g>
          </svg>
        </div>
        <span class="select-none">All</span>
      </label>
      <label class="custom-label flex mr-4">
        <div
          class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
        >
          <input
            type="checkbox"
            class="hidden"
            :checked="this.filterBy === 'Working'"
            @click="changeFilterBy('Working')"
          />
          <svg
            class="hidden w-4 h-4 text-green-600 pointer-events-none"
            viewBox="0 0 172 172"
          >
            <g
              fill="none"
              stroke-width="none"
              stroke-miterlimit="10"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode:normal"
            >
              <path d="M0 172V0h172v172z" />
              <path
                d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                fill="currentColor"
                stroke-width="1"
              />
            </g>
          </svg>
        </div>
        <span class="select-none">Working</span>
      </label>
      <label class="custom-label flex mr-4">
        <div
          class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
        >
          <input
            type="checkbox"
            class="hidden"
            :checked="this.filterBy === 'Done'"
            @click="changeFilterBy('Done')"
          />
          <svg
            class="hidden w-4 h-4 text-green-600 pointer-events-none"
            viewBox="0 0 172 172"
          >
            <g
              fill="none"
              stroke-width="none"
              stroke-miterlimit="10"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode:normal"
            >
              <path d="M0 172V0h172v172z" />
              <path
                d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                fill="currentColor"
                stroke-width="1"
              />
            </g>
          </svg>
        </div>
        <span class="select-none">Done</span>
      </label>
    </div>

    <div class="w-full" v-for="(todo, index) in filteredTodos" :key="index">
      <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
        <div class="w-8 text-center">
          <p class="text-3xl p-0 text-green-dark">&bull;</p>
        </div>
        <div class="w-4/5 py-3 px-1">
          <p class="hover:text-blue-dark">
            {{ todo.name }}
          </p>
        </div>
        <button
          class="button w-1/6 text-center p-3 bg-green-600 hover:bg-blue-dark text-white font-bold rounded ml-4 mb-4"
          @click="completeTodo(index)"
          v-if="!todo.completed"
        >
          Done
        </button>
        <button
          class="button w-1/6 text-center p-3 bg-green-600 hover:bg-blue-dark text-white font-bold rounded ml-4 mb-4 opacity-50 cursor-not-allowed"
          @click="completeTodo(index)"
          :disabled="todo.completed"
          v-if="todo.completed"
        >
          Done
        </button>
        <button
          class="button w-1/6 text-center p-3 bg-red-500 hover:bg-blue-dark text-white font-bold rounded ml-4 mb-4"
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

export type todo = {
  name: string;
  completed: boolean;
};

export type FilterBy = "All" | "Working" | "Done";

export type Data = {
  todos: todo[];
  newTodo: string;
  filterBy: FilterBy;
};

export default Vue.extend({
  data: (): Data => ({
    todos: [],
    newTodo: "",
    filterBy: "All"
  }),
  computed: {
    filteredTodos: function() {
      return this.todos.filter(todo => {
        if (this.filterBy === "Working") {
          return todo.completed === false;
        }
        if (this.filterBy === "Done") {
          return todo.completed === true;
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
      this.todos = [
        ...this.todos,
        {
          name: this.newTodo,
          completed: false
        }
      ];
      this.newTodo = "";
    },
    deleteTodo: function(index: number): void {
      this.todos = this.todos.filter((todo, i) => i !== index);
    },
    completeTodo: function(index: number): void {
      this.todos[index].completed = true;
    },
    changeFilterBy: function(filterBy: FilterBy): void {
      this.filterBy = filterBy;
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
