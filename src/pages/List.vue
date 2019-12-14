<template>
  <div class="list-container m-auto my-10 bg-white rounded p-10">
    <div class="text-center">
      Number of Todos
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

    <div class="w-full" v-for="(todo, index) in todos" :key="index">
      <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
        <div class="w-8 h-10 text-center">
          <p class="text-3xl p-0 text-green-dark">&bull;</p>
        </div>
        <div class="w-4/5 h-10 py-3 px-1">
          <p class="hover:text-blue-dark">
            {{ todo.name }}
          </p>
        </div>
        <button
          class="w-1/6 h-10 text-right p-3 bg-green-600 hover:bg-blue-dark text-white font-bold rounded ml-4 mb-4"
          @click="completeTodo"
        >
          Done
        </button>
        <button
          class="w-1/6 h-10 text-right p-3 bg-red-500 hover:bg-blue-dark text-white font-bold rounded ml-4 mb-4"
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

export type todo = {
  id: number;
  name: string;
  completed: boolean;
};

export type Data = {
  todos: todo[];
  newTodo: string;
};

export default Vue.extend({
  data: (): Data => ({
    todos: [
      {
        id: 0,
        name: "Learning the way to integrate Vue3.0 to 2.0",
        completed: true
      },
      {
        id: 1,
        name: "Learning how to use Vue 3.0 composition API",
        completed: false
      },
      {
        id: 2,
        name: "Learning store pattern of Vue3.0",
        completed: false
      }
    ],
    newTodo: ""
  }),
  computed: {
    numOfTodos: function(): number {
      return this.todos.length;
    }
  },
  methods: {
    addTodo: function(): void {
      this.todos = [
        ...this.todos,
        {
          id: this.todos.length,
          name: this.newTodo,
          completed: false
        }
      ];
      this.newTodo = "";
    },
    deleteTodo: function(id: number): void {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    completeTodo: function(id: number): void {
      this.todos[id].completed = true;
    }
  }
});
</script>

<style scoped>
.list-container {
  max-width: 800px;
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
