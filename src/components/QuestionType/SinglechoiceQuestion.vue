<template>
  <div class="items border border-gray-300 rounded my-4 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg">
        Question {{ index + 1 }}{{ question.required ? "*" : "" }}:
        {{ question.question }}
      </h3>
      <p class="text-sm">Answer type: {{ question.type }}</p>
    </div>
    <h4 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Select answer below
    </h4>
    <ul class="border-none list-none">
      <li
        v-for="(answer, answerIndex) in question.answers"
        :key="answerIndex"
        class="flex items-center mb-2"
      >
        <fwb-radio
          :id="'question_' + index + answer"
          :disabled="!isEditing"
          :name="'question_' + index"
          :value="answer"
          v-model="selectedAnswer"
          :label="answer"
        />
      </li>
    </ul>
    <fwb-button @click="toggleEdit" color="blue" class="mr-1">
      {{ isEditing ? "Save" : "Edit" }}
    </fwb-button>
    <fwb-button color="red" v-if="isEditing" @click="restartAnswer">
      Restart
    </fwb-button>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from "vue";
import {
  FwbRadio,
  FwbButton,
  FwbListGroup,
  FwbListGroupItem,
} from "flowbite-vue";

const emits = defineEmits(["updateAnswer"]);

const props = defineProps({
  question: Object,
  index: Number,
});

const isEditing = ref(true);
const selectedAnswer = ref(null);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const restartAnswer = () => {
  selectedAnswer.value = null;
  emits("updateAnswer", props.index, selectedAnswer.value);
};

watch(selectedAnswer, (newValue) => {
  emits("updateAnswer", props.index, selectedAnswer.value);
});
</script>
