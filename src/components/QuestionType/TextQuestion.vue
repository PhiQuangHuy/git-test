<!-- <template>
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

    <div class="mt-2">
      <div class="relative" v-if="question.elType === 'SHORT'">
        <input
          type="text"
          v-model.trim="editedText"
          @input="updateAnswer"
          :id="'question_' + index"
          class="mb-3 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          :for="'question_' + index"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >Enter your answer</label
        >
      </div>
      <fwb-textarea
        label="Enter your answer"
        v-if="question.elType === 'LONG'"
        type="text"
        v-model.trim="editedText"
        class="mb-3 resize-none"
        placeholder="Your answer"
        @input="updateAnswer"
      />
    </div>
    <fwb-button @click="restartAnswer" size="sm" outline color="default"
      >Restart</fwb-button
    >
  </div>
</template>

<script setup>
import { FwbButton, FwbTextarea } from "flowbite-vue";
import { defineProps, ref, defineEmits } from "vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const emits = defineEmits(["updateAnswer"]);

const editedText = ref("");
const originalAnswer = null;

const restartAnswer = () => {
  editedText.value = originalAnswer;
  emits("updateAnswer", props.index, editedText.value);
};

const updateAnswer = () => {
  emits("updateAnswer", props.index, editedText.value);
};
</script> -->

<template>
  <QuestionContainer
    :question="question"
    :index="index"
    @restart="restartAnswer"
  >
    <div class="mt-2">
      <div class="relative" v-if="question.elType === 'SHORT'">
        <input
          type="text"
          v-model.trim="editedText"
          @input="updateAnswer"
          :id="'question_' + index"
          class="mb-3 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          :for="'question_' + index"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >Enter your answer</label
        >
      </div>
      <fwb-textarea
        label="Enter your answer"
        v-if="question.elType === 'LONG'"
        type="text"
        v-model.trim="editedText"
        class="mb-3 resize-none"
        placeholder="Your answer"
        @input="updateAnswer"
      />
    </div>
  </QuestionContainer>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import QuestionContainer from "./QuestionContainer.vue";
import { FwbTextarea } from "flowbite-vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const editedText = ref("");

const emits = defineEmits(["updateAnswer"]);

const updateAnswer = () => {
  emits("updateAnswer", props.index, editedText.value);
};

const restartAnswer = () => {
  editedText.value = "";
  emits("updateAnswer", props.index, editedText.value);
};
</script>
