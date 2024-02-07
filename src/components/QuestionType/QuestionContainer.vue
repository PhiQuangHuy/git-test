<template>
  <div
    class="max-w-[45rem] p-4 rounded-md my-2 shadow-md first:mt-4 border-2 border-gray-200"
  >
    <div class="flex justify-between items-center mb-4">
      <p class="text-md my-1">
        Question {{ index + 1 }}{{ question.elRequired ? "*" : "" }}:
        {{ question.elLabel }}
      </p>
      <p class="text-sm">Answer type: {{ question.elType }}</p>
    </div>
    <div class="border-b border-gray-200 my-2"></div>
    <slot></slot>
    <fwb-button @click="restart" size="sm" outline color="default"
      >Restart</fwb-button
    >
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { FwbButton } from "flowbite-vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const emits = defineEmits(["restart"]);

const restart = () => {
  emits("restart");
};
</script>
