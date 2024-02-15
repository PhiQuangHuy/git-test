<template>
  <!-- <style-wrapper>
    <form-title :title="title" />
    <form-add-question @add-question="addQuestion" />
    <button @click="showQuestions" class="bg-green-500 text-white p-2 rounded">
      Show questions
    </button>
  </style-wrapper> -->

  <question-list :surveyQuestions="surveyQuestions" :title="title" />

  <fwb-modal v-if="isError" @close="closeModal">
    <template #header> Fail to fetch data!!! Something went wrong. </template>
  </fwb-modal>
</template>

<script setup>
import QuestionList from "@/components/QuestionList/index.vue";
import { reactive, onMounted, ref } from "vue";
import instance from "@/service/instance";
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
    isError.value = true;
  }
};

const setFormContent = (titleSur, description, content) => {
  title.formTitle = titleSur;
  title.formDescription = description;
  surveyQuestions.questions = content;
};

onMounted(async () => {
  // const formData = await fetchData();
  const formData = {
    titleSur: "Survey Title",
    description: "Survey Description",
    content: [
      {
        elLabel: "Question Title",
        elType: "LONG",
        elRequired: false,
        formElId: 1,
      },
      {
        elLabel: "Question Title",
        elType: "CHECKBOX",
        elRequired: true,
        formElId: 2,
        option: ["Answer 1", "Answer 2", "Answer 3"],
        elOther: true,
      },
      {
        elLabel: "Question Title",
        elType: "RADIO",
        elRequired: false,
        formElId: 3,
        option: ["Answer 1", "Answer 2", "Answer 3"],
        elOther: true,
      },
    ],
  };
  const { titleSur, description, content } = formData;
  setFormContent(titleSur, description, content);
});

const addQuestion = (newQuestion) => {
  surveyQuestions.questions.push(newQuestion);
};

const showQuestions = () =>
  console.log(JSON.stringify(surveyQuestions.questions, null, "\t"));
</script>
