<template>
  <QuestionContainer
    :question="question"
    :index="index"
    @restart="restartAnswer"
  >
    <ul class="list-none">
      <li
        v-for="(answer, answerIndex) in question.option"
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
      <li v-if="question.elOther">
        <input
          :id="'question_' + index + '_other'"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="selectedAnswers"
          @change="selectAnswer"
          :value="otherAnswer"
        />
        <input
          type="text"
          v-model.trim="otherAnswer"
          class="ml-1 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-[25%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your other answer"
        />
      </li>
    </ul>
  </QuestionContainer>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch } from "vue";
import QuestionContainer from "@/components/QuestionList/QuestionContainer.vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const selectedAnswers = ref([]);
const otherAnswer = ref("");

const emits = defineEmits(["updateAnswer"]);

const selectAnswer = () => {
  // emits("updateAnswer", props.index, selectedAnswers.value);
  if (otherAnswer.value === "") {
    const nonEmptyAnswer = selectedAnswers.value.filter((ans) => ans !== "");
    selectedAnswers.value = nonEmptyAnswer;
  }
  emits("updateAnswer", props.index, selectedAnswers.value);
};

const restartAnswer = () => {
  selectedAnswers.value = [];
  otherAnswer.value = "";
  emits("updateAnswer", props.index, selectedAnswers.value);
};

watch(otherAnswer, (newValue, oldValue) => {
  if (otherAnswer.value === "") {
    const nonEmptyAnswer = selectedAnswers.value.filter(
      (ans) => ans !== oldValue
    );
    selectedAnswers.value = nonEmptyAnswer;
  }
  emits("updateAnswer", props.index, selectedAnswers.value);
});

watch(otherAnswer, (newValue, oldValue) => {
  const index = selectedAnswers.value.indexOf(oldValue);
  if (index !== -1) {
    selectedAnswers.value[index] = newValue;
  }
  if (newValue === "") {
    selectedAnswers.value[index] = newValue;
  }
});
</script>
