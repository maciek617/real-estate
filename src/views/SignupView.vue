<template>
  <div class="mt-20 flex flex-col lg:flex-row-reverse items-center lg:justify-center">
    <div class="relative lg:bg-gray-50 w-full max-w-half lg:min-h-70vh lg:flex lg:items-center">
      <i class="fa-solid fa-circle text-blue-500 text-5xl w-full text-center lg:text-9xl"></i>
      <div class="bg-gray-800 w-full h-7 blur absolute top-1/2 card lg:h-24"></div>
    </div>
    <div class="w-full px-4 lg:h-70 lg:m-0 lg:pt-32">
      <h1 class="text-center text-3xl lg:text-5xl">Welcome to FindState!</h1>
      <p class="text-center text-gray-500">Please enter your details.</p>
      <form class="max-w-sm m-auto" @submit.prevent="submitSignupForm">
        <div class="flex flex-col items-start mt-7">

          <label>Name<span class="text-blue-500">*</span></label>
          <input type="text" class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Enter your name" v-model="state.name">
          <p v-if="v$.name.$error" class="error">This field cannot be empty.</p>

          <label class="mt-4">Email<span class="text-blue-500">*</span></label>
          <input type="email" class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Enter your email" v-model="state.email" autocomplete="email">
          <p v-if="v$.email.$error" class="error">{{ v$.email.$errors[0].$message }}</p>

          <label class="mt-4">Password<span class="text-blue-500">*</span></label>
          <input type="password" class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Password" v-model="state.password.password" autocomplete="new-password">
          <p v-if="v$.password.password.$error" class="error">{{ v$.password.password.$errors[0].$message }}</p>

          <label class="mt-4">Confirm password<span class="text-blue-500">*</span></label>
          <input type="password" class="w-full p-2 rounded-xl bg-none border border-gray-500"
                 placeholder="Password" v-model="state.password.confirm" autocomplete="new-password">
          <p v-if="v$.password.confirm.$error" class="error">{{ v$.password.confirm.$errors[0].$message }}</p>
        </div>
        <p v-if="error" class="error w-full text-center">{{error}}</p>
        <div  @mouseover="showToolTip = true" @mouseleave="showToolTip = false">
          <p class="cursor-help text-blue-500 mt-1">Requirements?</p>
          <ToolTip v-if="showToolTip">
          <p>1. Has min. 8 characters.</p>
          <p>2. Has min. 1 uppercase letter.</p>
          <p>3. Has min. 1 lowercase letter.</p>
          <p>4. Has min. 1 number.</p>
          <p>5. Has min. 1 special character.</p>
          </ToolTip>
        </div>
        <MainButton class="bg-gray-900 text-white mt-5 w-full">Signup</MainButton>
        <MainButton
            class="bg-white text-black mt-5 w-full flex items-center justify-center py-0 px-0 h-10 border"><img
            :src="require('../assets/random/google.svg')" alt="google icon" class="w-12">Signup with Google
        </MainButton>
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
import {sameAs, required, email, minLength, helpers} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import {useRouter} from "vue-router";
import {computed, reactive, ref} from "vue";
import useSignup from "@/composables/useSignup";
import ToolTip from "@/components/modals/ToolTip";

export default {
  name: "LoginView",
  components: {MainButton, ToolTip},
  setup() {
    const router = useRouter();
    const {signup, isPending, error} = useSignup();
    const showToolTip = ref(false)
    const state = reactive({
      name: '',
      email: '',
      password: {
        password: '',
        confirm: ''
      }
    })
    const rules = computed(() => {
      return {
        name: {required},
        email: {required, email},
        password: {
          password: {required, minLength: minLength(8), containsPasswordRequirement: helpers.withMessage(
                () => `The password requires an uppercase, lowercase, number and special character`,
                (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value.toString())
            ),},
          confirm: {required, sameAs: sameAs(state.password.password)}
        }
      }
    })

    const submitSignupForm = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return;

      await signup(state.email, state.password.password, state.name)
      console.log('signedUP')

      if(!error.value) {
        await router.push({name: 'home'});
      }
    }
    const v$ = useVuelidate(rules, state)

    return {state, v$, submitSignupForm, isPending, error, showToolTip}
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