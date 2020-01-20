<template>
  <Provider>
    <div id="app">
      <router-view />
    </div>
  </Provider>
</template>

<script lang="ts">
import Vue from "vue";
import { createComponent } from "@vue/composition-api";
import Provider from "./components/Provider.vue";

export default createComponent({
  components: {
    Provider
  }
});
</script>

<style>
body {
  background-color: #f3f3f3;
}
</style>
