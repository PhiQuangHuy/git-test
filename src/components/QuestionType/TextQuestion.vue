<template>
  <div class="items border border-gray-300 rounded my-4 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg">Question {{ index + 1 }}: {{ question.question }}</h3>
      <p class="text-sm">
        Answer type: {{ question.type }}
        {{ question.required === "true" ? "(required)" : "" }}
      </p>
    </div>
    <div class="mt-2">
      <input
        v-if="question.textType === 'short'"
        :readonly="!isEditing"
        type="text"
        class="border border-gray-300 p-2 rounded w-full"
        v-model="editedText"
        @input="updateAnswer"
      />
      <textarea
        v-if="question.textType === 'long'"
        :readonly="!isEditing"
        type="text"
        class="border border-gray-300 p-2 rounded w-full resize-none"
        v-model="editedText"
        @input="updateAnswer"
      />
    </div>
    <button @click="toggleEdit" class="bg-blue-500 text-white p-2 rounded mr-2">
      {{ isEditing ? "Save" : "Edit" }}
    </button>
    <button
      v-if="isEditing"
      @click="restartAnswer"
      class="bg-red-500 text-white p-2 rounded"
    >
      Restart
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const emits = defineEmits(["updateAnswer"]);

const isEditing = ref(true);
const editedText = ref("");
const originalAnswer = null;

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const restartAnswer = () => {
  editedText.value = originalAnswer;
  emits("updateAnswer", props.index, editedText.value);
};

const updateAnswer = () => {
  emits("updateAnswer", props.index, editedText.value);
};
</script>
