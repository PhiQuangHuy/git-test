<template>
  <div class="w-screen min-h-screen bg-gray-200 p-2">
    <div
      class="sm:w-[40rem] flex flex-col sm:border sm:border-gray-300 sm:rounded-md sm:m-auto sm:shadow-2xl bg-white overflow-hidden"
    >
      <div class="w-full bg-blue-800 h-20"></div>
      <router-view></router-view>
    </div>
  </div>
</template>
