<template>
  <div class="list-wrapper" v-if="props.surveyQuestions.questions.length !== 0">
    <div class="w-full bg-blue-800 h-20"></div>
    <div class="p-5">
      <h1 class="w-full outline-none border-b-2 border-gray-200 text-2xl mb-2">
        SURVEY QUESTION LIST
      </h1>
      <p w-full outline-none border-b-2>Description for survey</p>
    </div>
    <div class="flex flex-col p-5">
      <component
        :is="getComponentType(question.elType)"
        v-for="(question, index) in props.surveyQuestions.questions"
        :key="index"
        :question="question"
        :index="index"
        @updateAnswer="updateAnswer"
      />

      <div class="text-red-600">{{ requiredMessage }}</div>
      <div>
        <fwb-button color="default" @click="submitSurvey">Submit</fwb-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import SinglechoiceQuestion from "./QuestionType/SinglechoiceQuestion.vue";
import MultichoiceQuestion from "./QuestionType/MultichoiceQuestion.vue";
import TextQuestion from "./QuestionType/TextQuestion.vue";
import { FwbButton } from "flowbite-vue";

const requiredMessage = ref(null);

const props = defineProps({
  surveyQuestions: Object,
  title: Object,
});

const nullArray = [...Array(props.surveyQuestions.questions.length)].map(
  () => null
);

const answersForSurvey = reactive({ answers: nullArray });

const getComponentType = (questionType) => {
  switch (questionType) {
    case "RADIO":
      return SinglechoiceQuestion;
    case "CHECKBOX":
      return MultichoiceQuestion;
    case "SHORT":
    case "LONG":
      return TextQuestion;
    default:
      return null;
  }
};

const formatAndCheckResponse = (questions, answers) => {
  console.log(questions);
  const response = questions.map(({ elRequired, formElId, elType }, i) => ({
    questionNo: i + 1,
    elRequired,
    formElId,
    elType,
    answer: answers[i] || null,
  }));
  console.log(response);

  response.forEach((el) => {
    if (el.elType === "CHECKBOX" && (!el.answer || el?.answer.length === 0)) {
      el.answer = null;
    }
  });

  const checkRequired = response.filter((item) => {
    if (item.elType === "CHECKBOX") {
      console.log(item);
      return (
        item.elRequired && (item.answer?.length === 0 || item.answer === null)
      );
    } else {
      return item.elRequired && item.answer === null;
    }
  });
  console.log(checkRequired);

  return { response, checkRequired };
};

const submitSurvey = () => {
  const { response, checkRequired } = formatAndCheckResponse(
    props.surveyQuestions.questions,
    answersForSurvey.answers
  );

  if (checkRequired.length === 0) {
    const content = response.map(({ answer, formElId , elType}) => ({
      formElId,
      elType,
      answer,
    }));
    const data = {
      formTitle: props.title.formTitle,
      formDesc: props.title.formDescription,
      data: [...content],
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
