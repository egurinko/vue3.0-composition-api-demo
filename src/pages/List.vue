<template>
  <div class="flex p-10 bg-white mx-3 rounded">
    <div class="w-2/3 mb-4 relative">
      <input
        class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
        id="todo"
        type="text"
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
    >
      Add
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
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
