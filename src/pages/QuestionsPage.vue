<template>
  <!-- <style-wrapper>
    <form-title :title="title" />
    <form-add-question @add-question="addQuestion" />
    <button @click="showQuestions" class="bg-green-500 text-white p-2 rounded">
      Show questions
    </button>
  </style-wrapper> -->
  <style-wrapper v-if="surveyQuestions.questions?.length > 0">
    <div
      class="sm:w-[40rem] flex flex-col sm:border sm:border-gray-300 sm:rounded-md sm:m-auto sm:shadow-2xl bg-white overflow-hidden"
    >
      <question-list :surveyQuestions="surveyQuestions" :title="title" />
    </div>
  </style-wrapper>
  <fwb-modal v-if="isError" @close="closeModal">
    <template #header> Fail to fetch data!!! Something went wrong. </template>
  </fwb-modal>
</template>

<script setup>
import FormTitle from "../components/QuestionForm/FormTitle.vue";
import FormAddQuestion from "../components/QuestionForm/FormAddQuestion.vue";
import QuestionList from "../components/QuestionList.vue";
import StyleWrapper from "../components/StyleWrapper.vue";
import { reactive, onMounted, ref } from "vue";
import instance from "../service/instance";
import { FwbModal } from "flowbite-vue";

const title = reactive({
  formTitle: "",
  formDescription: "",
});

const surveyQuestions = reactive({
  questions: [],
});

const isError = ref(false);
const closeModal = () => {
  isError.value = false;
};

const fetchData = async () => {
  try {
    const data = await instance.get("/api/v1/survey/11");
    return data.data;
  } catch (error) {
    console.log(error);
    isError.value = true
  }
};

const setFormContent = (titleSur, description, content) => {
  title.formTitle = titleSur;
  title.formDescription = description;
  surveyQuestions.questions = content;
};

onMounted(async () => {
  const formData = await fetchData();
  const { titleSur, description, content } = formData;
  setFormContent(titleSur, description, content);
});

const addQuestion = (newQuestion) => {
  surveyQuestions.questions.push(newQuestion);
};

const showQuestions = () =>
  console.log(JSON.stringify(surveyQuestions.questions, null, "\t"));
</script>
