<template>
  <div class="list-wrapper" v-if="props.surveyQuestions.questions.length !== 0">
    <h2 class="text-2xl font-bold">SURVEY QUESTION LIST</h2>
    <component
      :is="getComponentType(question.type)"
      v-for="(question, index) in props.surveyQuestions.questions"
      :key="index"
      :question="question"
      :index="index"
      @updateAnswer="updateAnswer"
    />
  </div>
  <button @click="submitSurvey" class="bg-green-500 text-white p-2 rounded">
    Submit
  </button>
  <div>{{ requiredMessage }}</div>
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import SinglechoiceQuestion from "./QuestionType/SinglechoiceQuestion.vue";
import MultichoiceQuestion from "./QuestionType/MultichoiceQuestion.vue";
import TextQuestion from "./QuestionType/TextQuestion.vue";

const requiredMessage = ref("");

const props = defineProps({
  surveyQuestions: Object,
  state: Object,
});

const nullArray = [...Array(10)].map(() => null);

const answersForSurvey = reactive({ answers: nullArray });

const getComponentType = (questionType) => {
  switch (questionType) {
    case "SINGLE_CHOICE":
      return SinglechoiceQuestion;
    case "MULTI_CHOICE":
      return MultichoiceQuestion;
    case "TEXT":
      return TextQuestion;
    default:
      return null;
  }
};

const submitSurvey = () => {
  const response = props.surveyQuestions.questions.map(
    ({ question, type, textType, required }, i) => ({
      questionNo: i + 1,
      question,
      type,
      required,
      answer: answersForSurvey.answers[i] || null,
    })
  );

  const checkRequired = response.filter((item) => {
    if (item.type === "MULTI_CHOICE") {
      return item.answer?.length === 0 || item.answer === null;
    } else {
      return (
        item.required === "true" &&
        (item.answer === null || item.answer === undefined)
      );
    }
  });

  if (checkRequired.length === 0) {
    const data = {
      formTitle: props.state.formTitle,
      formDesc: props.state.formDescription,
      data: [...response],
    };

    console.log(JSON.stringify(data, null, "\t"));
    requiredMessage.value = "Your survey was successfully submitted";
  } else {
    const requiredQuestions = checkRequired.map((el) => el.questionNo);
    requiredMessage.value =
      "You must fill out the following questions " +
      requiredQuestions.join(", ");
  }
};

const updateAnswer = (index, answer) => {
  answersForSurvey.answers[index] = answer;
};
</script>
