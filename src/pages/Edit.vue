<template>
  <div class="list-container m-auto my-10 bg-white rounded p-10">{{ todos[0].name }}</div>
</template>

<script lang="ts">
import Vue from "vue";
import { createComponent, inject } from "@vue/composition-api";
import { StoreKey, Store } from "../store";

export default createComponent({
  setup(props, context) {
    const store = inject(StoreKey);
    if (!store) return;

    const { todos } = store;

    return { todos };
  }
});
</script>

<style scoped>
.list-container {
  max-width: 800px;
}
</style>
