<template>
  <wrapper>
    <div>
      <FormTittle :state="state" />
      <question-list :surveyQuestions="surveyQuestions" @deleteQuestion="deleteQuestion" />
      <button class="submit-btn" @click="submitSurvey" v-if="surveyQuestions.questions.length > 0">Submit Survey Form</button>
    </div>

    <form-question @add-question="addQuestion" />
  </wrapper>
</template>

<script setup>
import FormTittle from './components/FormTittle.vue'
import FormQuestion from './components/FormQuestion.vue'
import QuestionList from './components/QuestionList.vue'
import Wrapper from './components/Wrapper.vue'
import { reactive } from 'vue'

const state = reactive({
  formTitle: '',
  formDescription: ''
})

const surveyQuestions = reactive({
  questions: []
})

const addQuestion = (newQuestion) => {
  surveyQuestions.questions.push(newQuestion)
}

const submitSurvey = () => {
  const data = {
    title: state.formTitle,
    desc: state.formDescription,
    formContent: surveyQuestions
  }
  console.log(JSON.stringify(data, null, '\t'))
}

const deleteQuestion = (index) => {
  surveyQuestions.questions.splice(index, 1)
}
</script>

<style scoped></style>
