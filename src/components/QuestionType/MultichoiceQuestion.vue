<template>
  <div
    class="max-w-[45rem] p-4 rounded-md my-2 shadow-md first:mt-4 border-2 border-gray-200"
  >
    <div class="flex justify-between items-center mb-4">
      <p class="text-md my-1">
        Question {{ index + 1 }}{{ question.elRequired ? "*" : "" }}:
        {{ question.elLabel }}
      </p>
      <p class="text-sm">Answer type: {{ question.type }}</p>
    </div>
    <div class="border-b border-gray-200 my-2"></div>
    <h4 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Select one or more of the answers below
    </h4>
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
    <fwb-button color="default" size="sm" pill outline @click="restartAnswers">
      Restart
    </fwb-button>
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
    // selectedAnswers.value.splice(index, 1);
    selectedAnswers.value[index] = newValue;
  }
  if (newValue === "") {
    selectedAnswers.value[index] = newValue;
  }
});

const selectedAnswers = ref([]);

const selectAnswer = () => {
  // emits("updateAnswer", props.index, selectedAnswers.value);
  if (otherAnswer.value === "") {
    const nonEmptyAnswer = selectedAnswers.value.filter((ans) => ans !== "");
    selectedAnswers.value = nonEmptyAnswer;
  }
  emits("updateAnswer", props.index, selectedAnswers.value);
};

const restartAnswers = () => {
  selectedAnswers.value = [];
  otherAnswer.value = "";
  emits("updateAnswer", props.index, selectedAnswers.value);
};

watch(otherAnswer, () => {
  if (otherAnswer.value === "") {
    const nonEmptyAnswer = selectedAnswers.value.filter((ans) => ans !== "");
    selectedAnswers.value = nonEmptyAnswer;
  }
  emits("updateAnswer", props.index, selectedAnswers.value);
});
</script>

<!-- <template>
  <QuestionContainer :question="question" :index="index" @restart="restartAnswer">
    <ul class="list-none">
      <li v-for="(answer, answerIndex) in question.option" :key="answerIndex" class="flex items-center">
        <input
          :id="'question_' + index + answer"
          type="checkbox"
          :value="answer"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="selectedAnswers"
          @change="selectAnswer"
        />
        <label :for="'question_' + index + answer" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 m-3">{{ answer }}</label>
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
import { defineProps, ref, defineEmits } from "vue";
import QuestionContainer from "@/components/QuestionContainer.vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const selectedAnswers = ref([]);
const otherAnswer = ref("");

const emits = defineEmits(["updateAnswer"]);

const selectAnswer = () => {
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
</script> -->
