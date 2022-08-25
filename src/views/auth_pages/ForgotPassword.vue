<template>
  <div class="mt-20 max-w-2xl mx-auto min-h-70vh">
    <Transition>
      <div class="mt-40" v-if="!send">
        <h1 class="text-3xl font-bold p-2 lg:text-5xl">Reset password</h1>
        <p class="text-center p-2 text-gray-800 lg:text-xl">Enter the email associated with your account and we'll send an email with instructions to reset password.</p>
        <form class="flex flex-col items-start m-2" @submit.prevent="submitEmailResetForm">
          <label class="text-sm text-gray-500 lg:text-xl">Email address</label>
          <input type="email" placeholder="Enter your e-mail" class="border-blue-500 border-2 w-full max-w-sm rounded-lg p-2 lg:p-3" v-model="email">
          <p v-if="errMsg" class="mt-2 text-red-500 font-bold">User not found. Try again!</p>
          <p v-if="error" class="mt-2 text-red-500 font-bold">{{error}}</p>
          <MainButton class="text-white bg-gray-900 mt-5">Send Instructions</MainButton>
        </form>
      </div>
    </Transition>
    <Transition>
      <div class="absolute left-1/2 top-40 -translate-x-1/2 w-full" v-if="send">
        <div class="text-center">
          <i class="fa-solid fa-envelope-open-text text-blue-500 text-3xl bg-blue-50 shadow-2xl p-6 rounded-xl"></i>
        </div>
        <div class="text-center">
          <p class="my-4 text-2xl font-bold">Check your mail</p>
          <p class="px-10 text-gray-500">We have sent a password recover instructions to your email.</p>
          <router-link to="/login">
            <MainButton class="text-white bg-gray-900 my-4">Thanks</MainButton>
          </router-link>
        </div>
        <div class="mt-36 text-center">
          <p class="text-sm">Did not receive the email? Check your spam filter or <span class="text-blue-500 font-bold cursor-pointer" @click="send = !send">try another email address</span>.</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import useSendReset from "@/composables/resetPassword";
import MainButton from "@/components/buttons/MainButton";
import {ref} from "vue";

export default {
  name: "ForgotPassword",
  components: {MainButton},
  setup() {
    const {sendReset, errCode, errMsg, send} = useSendReset()
    const email = ref('');
    const error = ref('');

    const submitEmailResetForm =  () => {
      if (email.value === '') {
        error.value = 'Field can not be empty.'
        return;
      }
       sendReset(email.value);
        error.value = '';
    }

    return {submitEmailResetForm, send, email, errCode, errMsg, error}
  }
}
</script>

<style scoped>

</style>