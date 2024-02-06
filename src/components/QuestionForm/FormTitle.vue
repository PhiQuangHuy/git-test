<template>
  <div class="header p-10 border border-gray-300 rounded">
    <div class="title-wrapper pb-5">
      <span class="block">Enter form title</span>
      <input
        type="text"
        class="form-title w-full text-2xl font-bold border outline-none p-2 border-gray-300 rounded"
        v-model="title.formTitle"
        required
      />
    </div>
    <div class="description-wrapper pt-5">
      <span class="block">Enter form description</span>
      <textarea
        type="text"
        class="form-title w-full text-2xl font-bold border outline-none p-2 border-gray-300 rounded"
        v-model="title.formDescription"
        required
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: Object,
});
</script>
