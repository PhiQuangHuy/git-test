<template>
  <div class="list-wrapper" v-if="props.surveyQuestions.questions.length !== 0">
    <fwb-heading tag="h1" class="text-3xl">SURVEY QUESTION LIST</fwb-heading>
    <p>Description for survey</p>
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
  <div>
    <fwb-button gradient="green-blue" @click="submitSurvey">Submit</fwb-button>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import SinglechoiceQuestion from "./QuestionType/SinglechoiceQuestion.vue";
import MultichoiceQuestion from "./QuestionType/MultichoiceQuestion.vue";
import TextQuestion from "./QuestionType/TextQuestion.vue";
import { FwbHeading, FwbButton } from "flowbite-vue";

const requiredMessage = ref(null);

const props = defineProps({
  surveyQuestions: Object,
  state: Object,
});

const nullArray = [...Array(props.surveyQuestions.questions.length)].map(
  () => null
);

const answersForSurvey = reactive({ answers: nullArray });

const getComponentType = (questionType) => {
  switch (questionType) {
    case "SINGLE_CHOICE":
      return SinglechoiceQuestion;
    case "MULTI_CHOICE":
      return MultichoiceQuestion;
    case "SHORT":
    case "LONG":
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
    // el.required = el.required !== "false";
  });

  const checkRequired = response.filter((item) => {
    if (item.type === "MULTI_CHOICE") {
      return (
        item.required && (item.answer?.length === 0 || item.answer === null)
      );
    } else {
      return item.required && item.answer === null;
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
