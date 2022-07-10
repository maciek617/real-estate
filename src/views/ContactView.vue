<template>
  <div class="min-h-ct">
    <div class="mt-24 max-w-4xl m-auto sm:mt-36 lg:mt-52">
      <div class="px-4 py-2">
        <h1 class="text-2xl italic sm:text-3xl lg:text-4xl lg:mb-4">Love to hear form you,
          <span class="block">Get in touch</span></h1>
      </div>
      <form class="flex flex-col" @submit.prevent="sendEmailFunc(state.name, state.contact.email + state.message)">
        <div class="flex flex-col items-center sm:flex-row sm:m-auto">
          <div class="flex flex-col sm:mr-6">
            <label class="mt-3 font-bold">Your name:</label>
            <input type="text" placeholder="ex. John Smith"
                   class="bg-gray-50 py-2 px-4 text-sm focus:outline-blue-500 rounded shadow sm:w-72 sm:mr-2 lg:mr-24 lg:w-96" v-model="state.name">
            <p v-if="v$.name.$error" class="error">Fields cannot be empty.</p>
          </div>

          <div class="flex flex-col">
            <label class="mt-3 font-bold">Your email:</label>
            <input type="email" placeholder="ex. findstate@gg.com"
                   class="bg-gray-50 py-2 px-4 text-sm focus:outline-blue-500 rounded shadow sm:w-80 lg:w-96"
                   v-model="state.contact.email">
            <p v-if="v$.contact.email.$error" class="error">{{v$.contact.email.email.$message}}</p>
          </div>
        </div>
        <div class="flex flex-col items-center mt-5 sm:items-start sm:m-auto sm:w-full sm:mt-5">
          <label class="font-bold mt-2">Message</label>
          <textarea placeholder="Let tell us about..."
                    class="bg-gray-50 w-4/5 py-2 px-4 focus:outline-blue-500 max-h-96 shadow min-h-mn sm:w-full"
                    v-model="state.message"
          ></textarea>
          <p v-if="v$.message.$error" class="error">This field cannot be empty.</p>
        </div>
        <MainButton class="bg-gray-900 text-white mt-5 w-64 m-auto">Just send it!</MainButton>
      </form>
    </div>
  </div>
  <ContactModal v-if="send" :name="state.name" @closeModal="closeModal"/>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import useSendEmail from "@/composables/sendEmail";
import ContactModal from "@/components/modals/ContactModal";
import { reactive} from "vue";
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
  name: "ContactView",
  components: {MainButton, ContactModal},
  setup() {
    const {sendEmail, send} = useSendEmail();

    const state = reactive({
      name: '',
      message: '',
      contact: {
        email: ''
      }
    })
    const rules = {
      name: { required },
      message: { required },
      contact: {
        email: { required, email }
      }
    }

    const v$ = useVuelidate(rules, state)


    const sendEmailFunc = async (sub, body) => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return

      await sendEmail(sub, body);
    }

    const closeModal = () => {
      send.value = false;
      v$.value.$reset()

      state.contact.email = '';
      state.name = '';
      state.message = '';

    }


    return { sendEmailFunc, send, state, v$, closeModal}
  }
}
</script>

<style scoped>

</style>