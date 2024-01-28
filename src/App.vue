<template>
  <wrapper>
    <form-title :state="state" />
    <form-question @add-question="addQuestion" />
    <button @click="showQuestions">Show questions</button>
  </wrapper>
  <wrapper v-if="surveyQuestions.questions.length > 0">
    <question-list :surveyQuestions="surveyQuestions" :state="state" />
  </wrapper>
</template>

<script setup>
import FormTitle from "./components/QuestionForm/FormTitle.vue";
import FormQuestion from "./components/QuestionForm/FormQuestion.vue";
import QuestionList from "./components/QuestionList.vue";
import Wrapper from "./components/Wrapper.vue";
import { reactive } from "vue";

const state = reactive({
  formTitle: "",
  formDescription: "",
});

const surveyQuestions = reactive({
  questions: [],
});

const addQuestion = (newQuestion) => {
  surveyQuestions.questions.push(newQuestion);
};

const showQuestions = () => console.log(surveyQuestions.questions);
</script>
