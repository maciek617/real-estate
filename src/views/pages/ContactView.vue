<template>
  <div class="min-h-ct">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute top-0 -z-10">
      <path fill="#0099ff" fill-opacity="1"
            d="M0,192L21.8,186.7C43.6,181,87,171,131,165.3C174.5,160,218,160,262,138.7C305.5,117,349,75,393,85.3C436.4,96,480,160,524,154.7C567.3,149,611,75,655,53.3C698.2,32,742,64,785,101.3C829.1,139,873,181,916,202.7C960,224,1004,224,1047,229.3C1090.9,235,1135,245,1178,218.7C1221.8,192,1265,128,1309,101.3C1352.7,75,1396,85,1418,90.7L1440,96L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"></path>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 -z-10">
      <path fill="#0099ff" fill-opacity="1"
            d="M0,192L21.8,186.7C43.6,181,87,171,131,165.3C174.5,160,218,160,262,138.7C305.5,117,349,75,393,85.3C436.4,96,480,160,524,154.7C567.3,149,611,75,655,53.3C698.2,32,742,64,785,101.3C829.1,139,873,181,916,202.7C960,224,1004,224,1047,229.3C1090.9,235,1135,245,1178,218.7C1221.8,192,1265,128,1309,101.3C1352.7,75,1396,85,1418,90.7L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
    </svg>


    <div class="mt-24 z-40 max-w-4xl m-auto sm:mt-36 lg:mt-52">
      <div class="px-4 py-2">
        <h1 class="text-2xl italic sm:text-3xl lg:text-4xl lg:mb-4">Love to hear form you,
          <span class="block">Get in touch</span></h1>
      </div>
      <form class="flex flex-col" @submit.prevent="sendEmailFunc(state.name, state.contact.email + state.message)">
        <div class="flex flex-col items-center sm:flex-row sm:m-auto">
          <div class="flex flex-col sm:mr-6">
            <label class="mt-3 font-bold sm:text-xl">Your name:</label>
            <input type="text" placeholder="ex. John Smith"
                   class="bg-gray-50 py-2 px-4 text-sm focus:outline-blue-500 rounded shadow sm:w-72 sm:mr-2 lg:mr-24 lg:w-96" v-model="state.name">
            <p v-if="v$.name.$error" class="error">Fields cannot be empty.</p>
          </div>

          <div class="flex flex-col">
            <label class="mt-3 font-bold sm:text-xl">Your email:</label>
            <input type="email" placeholder="ex. findstate@gg.com"
                   class="bg-gray-50 py-2 px-4 text-sm focus:outline-blue-500 rounded shadow sm:w-80 lg:w-96"
                   v-model="state.contact.email">
            <p v-if="v$.contact.email.$error" class="error">{{ v$.contact.email.email.$message }}</p>
          </div>
        </div>
        <div class="flex flex-col items-center mt-5 sm:items-start sm:m-auto sm:w-full sm:mt-5">
          <label class="font-bold mt-2 sm:text-xl">Message</label>
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
import {reactive} from "vue";
import useVuelidate from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'

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
      name: {required},
      message: {required},
      contact: {
        email: {required, email}
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


    return {sendEmailFunc, send, state, v$, closeModal}
  }
}
</script>

<style scoped>

</style>