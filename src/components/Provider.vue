<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, createComponent } from "@vue/composition-api";
import store, { StoreKey } from "../store";

export default {
  setup() {
    provide(StoreKey, store());
    return {};
  }
};
</script>
