<template>
  <div class="items border border-gray-300 rounded my-4 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg">
        Question {{ index + 1 }}{{ question.required ? "*" : "" }}:
        {{ question.question }}
      </h3>
      <p class="text-sm">Answer type: {{ question.type }}</p>
    </div>
    <h4 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Select one or more of the answers below
    </h4>
    <ul class="list-none">
      <li
        v-for="(answer, answerIndex) in question.answers"
        :key="answerIndex"
        class="flex items-center"
      >
        <input
          :id="'question_' + index + answer"
          type="checkbox"
          :value="answer"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="selectedAnswers"
          @change="selectAnswer"
        />
        <label
          :for="'question_' + index + answer"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 m-3"
          >{{ answer }}</label
        >
      </li>
      <li v-if="question.other">
        <input
          :id="'question_' + Number(question.answers.length) + '_'"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="selectedAnswers"
          @change="selectAnswer"
          :value="otherAnswer"
        />
        <input
          type="text"
          v-model="otherAnswer"
          class="mb-2 px-2.5 pb-2.5 pt-4 ml-2 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Enter other answer"
        />
      </li>
    </ul>
    <fwb-button color="red" @click="restartAnswers"> Restart </fwb-button>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch } from "vue";
import { FwbButton } from "flowbite-vue";

const emits = defineEmits(["updateAnswer"]);

const props = defineProps({
  question: Object,
  index: Number,
});

const otherAnswer = ref("");

watch(otherAnswer, (newValue, oldValue) => {
  const index = selectedAnswers.value.indexOf(oldValue);
  if (index !== -1) {
    selectedAnswers.value.splice(index, 1);
  }
});

const selectedAnswers = ref([]);

const selectAnswer = () => {
  emits("updateAnswer", props.index, selectedAnswers.value);
  console.log(selectedAnswers.value);
};

const restartAnswers = () => {
  selectedAnswers.value = [];
  emits("updateAnswer", props.index, selectedAnswers.value);
};
</script>
