<template>
  <div class="items border border-gray-300 rounded my-4 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg">Question {{ index + 1 }}{{ question.required  ? "*" : "" }}: {{ question.question }}</h3>
      <p class="text-md">
        Answer type: {{ question.type }}
        
      </p>
    </div>
    <div class="mt-2">
      <label
        :for="'question_' + index"
        class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >Enter your answer</label
      >
      <input
        v-if="question.textType === 'short'"
        :readonly="!isEditing"
        type="text"
        v-model="editedText"
        @input="updateAnswer"
        :id="'question_' + index"
        placeholder="Enter your answer"
        class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <textarea
        v-if="question.textType === 'long'"
        :readonly="!isEditing"
        type="text"
        class="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 mb-2 dark:focus:border-blue-500"
        v-model="editedText"
        :id="'question_' + index + answer"

        placeholder="Enter your answer"
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
