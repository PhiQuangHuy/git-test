<template>
  <div class="items border border-gray-300 rounded my-4 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg">
        Question {{ index + 1 }}{{ question.required === "true" ? "*" : "" }}:
        {{ question.question }}
      </h3>
      <p class="text-md">Answer type: {{ question.type }}</p>
    </div>
    <h4 class="block mb-2 text-md font-medium text-gray-900 dark:text-white">
      Select one or more of the answers below
    </h4>
    <ul class="list-none">
      <li
        v-for="(answer, answerIndex) in question.answers"
        :key="answerIndex"
        class="flex items-center mb-2"
      >
        <input
          :id="'question_' + index + answer"
          :disabled="!isEditing"
          type="checkbox"
          :value="answer"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="selectedAnswers"
          @change="selectAnswer(answer, question.question)"
        />
        <label
          :for="'question_' + index + answer"
          class="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >{{ answer }}</label
        >
      </li>
    </ul>
    <button @click="toggleEdit" class="bg-blue-500 text-white p-2 rounded mr-2">
      {{ isEditing ? "Save" : "Edit" }}
    </button>
    <button
      v-if="isEditing"
      @click="restartAnswers"
      class="bg-red-500 text-white p-2 rounded"
    >
      Restart
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import { FwbCheckbox } from "flowbite-vue";

const emits = defineEmits(["updateAnswer"]);

const props = defineProps({
  question: Object,
  index: Number,
});

const isEditing = ref(true);
const selectedAnswers = ref([]);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const selectAnswer = (answer, question) => {
  emits("updateAnswer", props.index, selectedAnswers.value);
};

const restartAnswers = () => {
  selectedAnswers.value = [];
  emits("updateAnswer", props.index, selectedAnswers.value);
};
</script>
