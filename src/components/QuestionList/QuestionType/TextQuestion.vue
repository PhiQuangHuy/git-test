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
import QuestionContainer from "@/components/QuestionList/QuestionContainer.vue";
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
