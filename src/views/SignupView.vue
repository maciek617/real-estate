<template>
  <div class="mt-20 flex flex-col lg:flex-row-reverse items-center lg:justify-center">
    <div class="relative lg:bg-gray-50 w-full max-w-half lg:h-70 lg:flex lg:items-center">
      <i class="fa-solid fa-circle text-blue-500 text-5xl w-full text-center lg:text-9xl"></i>
      <div class="bg-gray-800 w-full h-7 blur absolute top-1/2 card lg:h-24"></div>
    </div>
    <div class="mx-4 w-full max-w-half lg:h-70 lg:m-0 lg:pt-72">
      <h1 class="text-center text-3xl lg:text-5xl">Welcome to FindState!</h1>
      <p class="text-center text-gray-500">Please enter your details.</p>
      <form class="max-w-sm m-auto">
        <div class="flex flex-col items-start mt-7">
          <label>Name</label>
          <input type="text"  required class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Enter your name">

          <label class="mt-4">Email</label>
          <input type="email"  required class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Enter your email">

          <label class="mt-4">Password</label>
          <input type="password" required  class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Password">
        </div>
        <MainButton class="bg-gray-900 text-white mt-5 w-full">Signup</MainButton>
        <MainButton
            class="bg-white border-2 text-black mt-5 w-full flex items-center justify-center py-0 px-0 h-10"><img
            :src="require('../assets/random/google.svg')" alt="google icon" class="w-12">
          Signup
          with
          Google</MainButton>
      </form>
      <p class="text-center mt-4 text-gray-500">Have an account?
        <router-link :to="{name: 'login'}"
                     class="text-blue-500">Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "LoginView",
  components: {MainButton}
}
</script>

<style scoped>
.card {
  backdrop-filter: blur(8px) saturate(200%);
  -webkit-backdrop-filter: blur(8px) saturate(200%);
  background-color: rgba(255, 255, 255, 0%);
}
</style>