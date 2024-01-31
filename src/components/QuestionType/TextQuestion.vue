<template>
  <div class="items border border-gray-300 rounded my-4 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg">
        Question {{ index + 1 }}{{ question.required ? "*" : "" }}:
        {{ question.question }}
      </h3>
      <p class="text-sm">Answer type: {{ question.type }}</p>
    </div>
    <div class="mt-2">
      <div class="relative" v-if="question.textType === 'short'">
        <input
          type="text"
          :readonly="!isEditing"
          v-model="editedText"
          @input="updateAnswer"
          :id="'question_' + index"
          class="mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
        />
        <label
          :for="'question_' + index"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >Enter your answer</label
        >
      </div>

      <fwb-textarea
        label="Enter your answer"
        v-if="question.textType === 'long'"
        :readonly="!isEditing"
        type="text"
        v-model="editedText"
        class="mb-1"
        placeholder="Your answer"
        @input="updateAnswer"
      />
    </div>
    <fwb-button @click="toggleEdit" color="blue" class="mr-1">
      {{ isEditing ? "Save" : "Edit" }}
    </fwb-button>
    <fwb-button v-if="isEditing" @click="restartAnswer" color="red"
      >Restart</fwb-button
    >
  </div>
</template>

<script setup>
import { FwbButton, FwbTextarea } from "flowbite-vue";
import { defineProps, ref, defineEmits } from "vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const emits = defineEmits(["updateAnswer"]);

const isEditing = ref(true);
const editedText = ref("");
const originalAnswer = null;

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const restartAnswer = () => {
  editedText.value = originalAnswer;
  emits("updateAnswer", props.index, editedText.value);
};

const updateAnswer = () => {
  emits("updateAnswer", props.index, editedText.value);
};
</script>
