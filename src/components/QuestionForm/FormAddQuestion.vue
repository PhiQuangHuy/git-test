<template>
  <form
    @submit.prevent=""
    class="question-wrapper p-5 border border-gray-300 rounded-md my-10"
  >
    <div class="mb-4">
      <span class="block">Enter your question</span>
      <input
        type="text"
        v-model="question.questionDetail"
        class="border border-gray-300 p-2 rounded w-full"
      />
    </div>
    <div class="mb-4">
      <span class="block">Enter your answer type for this question</span>
      <select
        class="border border-gray-300 p-2 rounded w-[50%]"
        v-model="question.selectedType"
      >
        <option
          v-for="(questionType, index) in questionTypes"
          :value="questionType.value"
          :key="index"
        >
          {{ questionType.label }}
        </option>
      </select>
    </div>
    <div v-if="question.selectedType === 'TEXT'" class="mb-4">
      <span>Required: </span>
      <select
        v-model="question.textType"
        class="border border-gray-300 p-2 rounded mr-1"
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>
      <select
        v-model="question.requiredAns"
        class="border border-gray-300 p-2 rounded mr-1"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button @click="saveQuestion" class="bg-blue-500 text-white p-2 rounded">
        Add question
      </button>
    </div>
    <div
      v-if="['SINGLE_CHOICE', 'MULTI_CHOICE'].includes(question.selectedType)"
      class="mb-4"
    >
      <div class="mb-4">
        <span class="block">Your answer choices</span>
          <div
            v-for="(_, index) in question.answers"
            :key="index"
            class="flex items-center mb-2"
          >
            <input
              type="text"
              placeholder="Enter your answer choice"
              v-model="question.answers[index]"
              class="border border-gray-300 p-2 rounded w-[50%]"
              required
            />
            <button
              @click="removeAnswer(index)"
              v-if="question.answers.length > 2"
              class="ml-2 bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
      </div>
      <span>Required: </span>
      <select
        v-model="question.requiredAns"
        class="border border-gray-300 p-2 rounded mr-1"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button
        @click="addAnotherAnswer"
        class="bg-green-500 text-white p-2 rounded w-[40%] mr-2"
      >
        Add another answer
      </button>
      <button
        @click="saveQuestion"
        class="bg-blue-500 text-white p-2 rounded w-[40%]"
      >
        Add question
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, defineEmits } from "vue";

const initialState = {
  selectedType: null,
  questionDetail: "",
  answers: null,
  textType: null,
  requiredAns: "false",
};

const question = reactive({ ...initialState });

watch(
  () => question.selectedType,
  (newVal) => {
    if (newVal === "TEXT") {
      question.answers = null;
      question.textType = "short";
    } else {
      question.answers = ["", ""];
      question.textType = null;
    }
  }
);

const addAnotherAnswer = () => {
  question.answers.push("");
};

const questionTypes = [
  { value: "TEXT", label: "Text Input" },
  { value: "SINGLE_CHOICE", label: "Single choice" },
  { value: "MULTI_CHOICE", label: "Multi choices" },
];

const removeAnswer = (index) => {
  question.answers.splice(index, 1);
};

const emit = defineEmits(["add-question"]);

const saveQuestion = () => {
  const newQuestion = {
    question: question.questionDetail,
    type: question.selectedType,
    required: question.requiredAns,
  };

  if (question.selectedType === "TEXT") {
    newQuestion.textType = question.textType;
  } else {
    newQuestion.answers = question.answers;
  }

  emit("add-question", newQuestion);
  Object.assign(question, initialState);
};
</script>
