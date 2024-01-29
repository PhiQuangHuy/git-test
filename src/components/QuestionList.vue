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
  <div class="text-red-600">{{ requiredMessage }}</div>
  <div class="">
    <button
      @click="submitSurvey"
      class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      type="button"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import SinglechoiceQuestion from "./QuestionType/SinglechoiceQuestion.vue";
import MultichoiceQuestion from "./QuestionType/MultichoiceQuestion.vue";
import TextQuestion from "./QuestionType/TextQuestion.vue";

const requiredMessage = ref(null);

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

const formatAndCheckResponse = (questions, answers) => {
  const response = questions.map(({ question, type, required }, i) => ({
    questionNo: i + 1,
    question,
    type,
    required,
    answer: answers[i] || null,
  }));

  response.forEach((el) => {
    if (el.type === "MULTI_CHOICE" && (!el.answer || el.answer.length === 0)) {
      el.answer = null;
    }
    el.required = el.required !== "false";
  });

  const checkRequired = response.filter((item) => {
    if (item.type === "MULTI_CHOICE") {
      return (
        item.required === true &&
        (item.answer?.length === 0 || item.answer === null)
      );
    } else {
      return item.required === true && item.answer === null;
    }
  });

  return { response, checkRequired };
};

const submitSurvey = () => {
  const { response, checkRequired } = formatAndCheckResponse(
    props.surveyQuestions.questions,
    answersForSurvey.answers
  );

  if (checkRequired.length === 0) {
    const data = {
      formTitle: props.state.formTitle,
      formDesc: props.state.formDescription,
      data: [...response],
    };

    console.log(JSON.stringify(data, null, "\t"));
    requiredMessage.value = null;
  } else {
    const requiredQuestions = checkRequired.map((el) => el.questionNo);
    requiredMessage.value =
      "You must fill out the following questions: " +
      requiredQuestions.join(", ");
  }
};

const updateAnswer = (index, answer) => {
  answersForSurvey.answers[index] = answer;
};
</script>
