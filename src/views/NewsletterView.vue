<template>
  <div class="bg-gray-50">
    <div class="mt-20 px-4 max-w-newsletterW m-auto sm:min-h-70vh lg:flex lg:flex-row-reverse lg:items-start lg:pt-24 3xl:pt-40">
      <img :src="require('../assets/random/startup-launch.svg')" alt="startup launch image" class="mt-24 m-auto max-w-xl xl:max-w-3xl w-full px-4 sm:mt-0">
      <div class="text-center lg:mt-10">
        <div class="mt-4">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl">The Latest updates in your inbox for <span class="font-bold">FREE</span>!</h1>
          <p class="mt-4 text-gray-500 max-w-lg m-auto lg:mt-8">You will receive emails about latest updates of pages, bonus content, improvements, terms changes and others. Don't worry we won't spam
            otherwise you can't remove subscription without any problems.</p>
        </div>
        <div class="mt-7 lg:mt-10">
          <p class="text-2xl sm:text-3xl lg:text-left lg:ml-16">Join here!</p>
          <form class="p-2 rounded-2xl flex h-14 justify-between shadow-2xl max-w-xl m-auto" @submit.prevent="submitNewsletterForm">
            <input type="text" placeholder="Enter your e-mail" class="p-2 w-3/4 rounded" v-model="state.email">
            <MainButton class="text-white bg-gray-900">Subscribe</MainButton>
          </form>
          <p v-if="v$.email.$error" class="error text-center">{{ v$.email.$errors[0].$message }}</p>
        </div>
        <p class="text-center mt-4 text-blue-500 text-sm">*If you want to unsubscribe newsletter
          <span class="font-bold underline cursor-pointer" @click="showRemoveStatement = !showRemoveStatement">
          here</span></p>
        <Transition>
          <div class="mt-7 lg:mt-10" v-if="showRemoveStatement">
            <p class="text-2xl sm:text-3xl lg:text-left lg:ml-16">Remove from newsletter!</p>
            <form class="p-2 rounded-2xl flex h-14 justify-between shadow-2xl max-w-xl m-auto" @submit.prevent="submitRemoveNewsletterForm">
              <input type="text" placeholder="Enter your e-mail" class="p-2 w-3/4 rounded" v-model="state.remove_email">
              <MainButton class="text-white bg-gray-900">Unsubscribe</MainButton>
            </form>
          </div>
        </Transition>
      </div>
    </div>
    <ToastModal>
      <h1 class="text-2xl font-bold drop-shadow">{{ showModal ? 'Great news!!' : 'Success!' }}</h1>
      <p class="pr-4 sm:text-xl">{{ showModal ? 'Your email has been added to newsletter!' : 'Your email has been removed from newsletter!' }}</p>
    </ToastModal>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import useUpdateNewsletter from "@/composables/updateNewslatter";
import useVuelidate from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'
import {computed, reactive, ref} from "vue";
import ToastModal from "@/components/modals/ToastModal";
import {useStore} from "vuex";
import getRemoveEmail from '@/composables/removeEmailFromNewsletter'

export default {
  name: "GiftView",
  components: {MainButton, ToastModal},
  setup() {
    const {updateNewsletter} = useUpdateNewsletter();
    const store = useStore();
    const showRemoveStatement = ref(false);
    const showModal = ref(false);
    const {removeEmail} = getRemoveEmail();

    const state = reactive({
      email: '',
      remove_email: ''
    });

    const rules = computed(() => {
          return {
            email: {required, email},
          }
        }
    )
    const v$ = useVuelidate(rules, state);

    const submitNewsletterForm = async () => {
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return;
      showModal.value = true
      await updateNewsletter(state.email);
      v$.value.$reset();
      state.email = '';
      await store.dispatch('startTimer');
    }

    const submitRemoveNewsletterForm = async () => {
      const regex = /\S+@\S+\.\S+/;
      const validate = regex.test(state.remove_email);
      if (validate) {
        showModal.value = false;
        await removeEmail(state.remove_email);
        state.remove_email = '';
        await store.dispatch('startTimer');
      }
    }

    return {submitNewsletterForm, v$, state, store, showRemoveStatement, submitRemoveNewsletterForm, showModal}
  }
}
</script>

<style scoped>

</style>