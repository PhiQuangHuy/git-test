<template>
  <style-wrapper>
    <form-title :state="state" />
    <form-add-question @add-question="addQuestion" />
    <button @click="showQuestions" class="bg-green-500 text-white p-2 rounded">
      Show questions
    </button>
  </style-wrapper>
  <style-wrapper v-if="surveyQuestions.questions.length > 0">
    <question-list :surveyQuestions="surveyQuestions" :state="state" />
  </style-wrapper>
</template>

<script setup>
import FormTitle from "./components/QuestionForm/FormTitle.vue";
import FormAddQuestion from "./components/QuestionForm/FormAddQuestion.vue";
import QuestionList from "./components/QuestionList.vue";
import StyleWrapper from "./components/StyleWrapper.vue";
import { reactive, ref } from "vue";
// import axios from "axios";

// const fetchStatus = ref(true);
// const getSurveyQuestions = async () => {
//   try {
//     const data = await axios.get("http://10.124.1.67:8080/api/v1/survey/list");
//     console.log(data.data);
//   } catch (error) {
//     fetchStatus.value = false;
//   }
// };

// getSurveyQuestions();

const state = reactive({
  formTitle: "",
  formDescription: "",
});

const surveyQuestions = reactive({
  questions: [
    {
      question: "Enter your email",
      type: "TEXT",
      required: false,
      textType: "short",
    },
    {
      question: "Single choice question",
      type: "SINGLE_CHOICE",
      required: false,
      answers: ["Answer A", "Answer B", "Answer C", "Answer D"],
      other: true,
    },
    {
      question: "Multi choice question",
      type: "MULTI_CHOICE",
      required: false,
      answers: ["Answer A", "Answer B", "Answer C", "Answer D"],
      other: true,
    },
  ],
});

const addQuestion = (newQuestion) => {
  surveyQuestions.questions.push(newQuestion);
};

const showQuestions = () =>
  console.log(JSON.stringify(surveyQuestions.questions, null, "\t"));
</script>
