<template>
  <div class="items border border-gray-300 rounded my-4 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg">Question {{ index + 1 }}: {{ question.question }}</h3>
      <p class="text-sm">
        Answer type: {{ question.type }}
        {{ question.required === "true" ? "(required)" : "" }}
      </p>
    </div>
    <h4 class="text-md">Answers:</h4>
    <ul class="list-none">
      <li v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
        <label>
          <input
            :disabled="!isEditing"
            type="radio"
            :name="'question_' + index"
            :value="answer"
            class="mr-2"
            v-model="selectedAnswer"
          />{{ answer }}
        </label>
      </li>
    </ul>
    <button @click="toggleEdit" class="bg-blue-500 text-white p-2 rounded mr-2">
      {{ isEditing ? "Save" : "Edit" }}
    </button>
    <button
      v-if="isEditing"
      @click="restartAnswer"
      class="bg-red-500 text-white p-2 rounded"
    >
      Restart
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from "vue";

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
  console.log("Answer restarted");
};

watch(selectedAnswer, (newValue) => {
  emits("updateAnswer", props.index, selectedAnswer.value);
});
</script>
