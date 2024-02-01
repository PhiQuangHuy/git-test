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
      Select answer below
    </h4>
    <ul class="border-none list-none">
      <li
        v-for="(answer, answerIndex) in question.answers"
        :key="answerIndex"
        class="flex items-center mb-2"
      >
        <fwb-radio
          :id="'question_' + index + answer"
          :name="'question_' + index"
          :value="answer"
          v-model="selectedAnswer"
          :label="answer"
        />
      </li>
      <li v-if="question.other">
        <input
          :id="'question_' + Number(question.answers.length) + '_'"
          type="radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="selectedAnswer"
          :value="otherAnswer"
        />
        <input
          type="text"
          v-model="otherAnswer"
          class="ml-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter other answer"
          @input="updateOtherAns"
        />
      </li>
    </ul>

    <fwb-button color="red" @click="restartAnswer"> Restart </fwb-button>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from "vue";
import { FwbRadio, FwbButton } from "flowbite-vue";

const emits = defineEmits(["updateAnswer"]);

const props = defineProps({
  question: Object,
  index: Number,
});
const otherAnswer = ref("");

const selectedAnswer = ref(null);

const restartAnswer = () => {
  otherAnswer.value = "";
  selectedAnswer.value = null;
  emits("updateAnswer", props.index, selectedAnswer.value);
};

watch(selectedAnswer, () => {
  emits("updateAnswer", props.index, selectedAnswer.value?.trim());
});

const updateOtherAns = () => {
  selectedAnswer.value = otherAnswer.value;
};

watch(otherAnswer, () => {
  if (selectedAnswer.value === otherAnswer.value) {
    emits("updateAnswer", props.index, selectedAnswer.value?.trim());
  }
});
</script>
