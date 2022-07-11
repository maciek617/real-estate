<template>
  <div class="mt-20 flex flex-col lg:flex-row items-center lg:justify-center">
    <div class="relative lg:bg-gray-50 w-full max-w-half lg:h-70 lg:flex lg:items-center">
      <i class="fa-solid fa-circle text-blue-500 text-5xl w-full text-center lg:text-9xl"></i>
      <div class="bg-gray-800 w-full h-7 blur absolute top-1/2 card lg:h-24"></div>
    </div>
    <div class="mx-4 w-full max-w-half lg:h-70 lg:m-0 lg:pt-72">
      <h1 class="text-center text-3xl lg:text-5xl">Welcome back</h1>
      <p class="text-center text-gray-500">Welcome back please enter your details.</p>
      <form class="max-w-sm m-auto" @submit.prevent="submitLoginForm">
        <div class="flex flex-col items-start mt-7">
          <label>Email</label>
          <input type="email" class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Enter your email" v-model="state.email" autocomplete="email">
          <p v-if="v$.email.$error" class="error">{{ v$.email.$errors[0].$message }}</p>
          <label class="mt-4">Password</label>
          <input type="password" class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Password" v-model="state.password" autocomplete="current-password">
          <p v-if="v$.password.$error" class="error">{{ v$.password.$errors[0].$message }}</p>
        </div>
        <MainButton class="bg-gray-900 text-white mt-5 w-full">Login</MainButton>
        <MainButton
            class="bg-white border text-black mt-5 w-full flex items-center justify-center py-0 px-0 h-10"><img
            :src="require('../assets/random/google.svg')" alt="google icon" class="w-12">
          Login
          with
          Google</MainButton>
      </form>
      <p class="text-center mt-4 text-gray-500">Don't have an account?
        <router-link :to="{name: 'signup'}"
                     class="text-blue-500">Signup
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import {computed, reactive} from 'vue'
import useVuelidate from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'
export default {
  name: "LoginView",
  components: {MainButton},
  setup() {
    const state = reactive({
      email: '',
      password: ''
    })
    const rules = computed(() => {
          return {
            email: {required, email},
            password: {required, minLength: minLength(8)},
          }
        }
    )
    const v$ = useVuelidate(rules, state);

    const submitLoginForm = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return;
    }

    return {state, v$, submitLoginForm}
  }
}
</script>

<style scoped>
.card {
  backdrop-filter: blur(8px) saturate(200%);
  -webkit-backdrop-filter: blur(8px) saturate(200%);
  background-color: rgba(255, 255, 255, 0%);
}
</style>