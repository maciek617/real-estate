<template>
  <div class="mt-20 px-4 bg-gray-50 sm:p-14" v-if="data">
    <h1 class="text-4xl pb-5 border-b">Settings</h1>
    <div class="mt-4 pb-5 border-b text-center sm:border-0">
      <p class="font-bold text-xl">Profile</p>
      <p class="text-gray-500 mt-2">Update your profile (<span class="italic underline font-bold">photo, username, social links, bio and more</span>!) here.</p>
    </div>
    <div class="mt-4 pb-5 border-b bg-white p-4 rounded-2xl shadow-xl text-center max-w-2xl m-auto sm:border-0 sm:flex sm:items-start sm:justify-between">
      <p class="font-bold text-xl">Username</p>
      <input type="text" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 mt-2 rounded" v-model="data.name">
    </div>
    <div class="mt-4 pb-5 border-b bg-white p-4 rounded-2xl shadow-xl text-center max-w-2xl m-auto sm:border-0 sm:flex sm:items-start sm:justify-between">
      <p class="font-bold text-xl">Bio</p>
      <textarea class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 mt-2 rounded max-h-96" v-model="data.bio"></textarea>
    </div>
    <div class="mt-4 pb-5 border-b bg-white p-4 rounded-2xl shadow-xl text-center max-w-2xl m-auto sm:border-0 sm:flex sm:items-start sm:justify-between">
      <div>
        <p class="font-bold text-xl">Photo</p>
        <img :src="data.photo === '' ? 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : data.photo"
             alt="profile picture"
             class="w-20 h-20 rounded-full object-cover m-auto">
      </div>
      <div>
        <input type="text" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 mt-2 rounded" v-model="data.photo">
        <p class="text-gray-500 text-center pt-2 max-w-sm m-auto">(Photo must be stored online and link must be valid otherwise it it won't change.)</p>
      </div>
    </div>
    <div class="mt-4 relative pb-5 h-36  border-b bg-white p-4 rounded-2xl shadow-xl text-center max-w-2xl m-auto sm:border-0 sm:flex sm:items-start sm:justify-between">
      <p class="font-bold text-xl">Job title</p>
      <input type="text" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 mt-2 rounded" v-model="data.jobTitle.title">
      <div class="absolute -left-20 top-22  mt-2 sm:top-20  sm:left-1/2 sm:-translate-x-1/2 ml-8 w-full sm:ml-10">
        <input type="checkbox" v-model="data.jobTitle.display" class="mr-2">
        <label class="w-full">Show job title on profile.</label>
      </div>
    </div>
    <div class="mt-4 pb-5 border-b bg-white p-4 rounded-2xl shadow-xl text-center max-w-2xl m-auto sm:border-0 sm:flex sm:items-start sm:justify-between">
      <p class="font-bold text-xl">Location</p>
      <input type="text" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 mt-2 rounded" v-model="data.location">
    </div>
    <div class="mt-4 pb-5 border-b bg-white p-4 rounded-2xl shadow-xl text-center max-w-2xl m-auto sm:border-0 sm:flex sm:items-start sm:justify-between">
      <p class="font-bold text-xl">Background photo</p>
      <div>
        <input type="text" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 mt-2 rounded" v-model="data.bg_photo">
        <p class="text-gray-500 text-center pt-2 max-w-sm m-auto">(Photo must be stored online and link must be valid otherwise it it won't change.)</p>
      </div>
    </div>
    <div class="mt-4 pb-5 border-b bg-white p-4 rounded-2xl shadow-xl  text-center max-w-2xl m-auto sm:border-0 sm:flex sm:items-start sm:justify-between">
      <p class="font-bold text-xl">Social links</p>
      <div>
        <label class="block mt-3 mr-64 pr-2 font-bold">Website</label>
        <input type="url" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 rounded" v-model="data.social_links[0].web">
        <label class="block mt-3 mr-64 font-bold">Facebook</label>
        <input type="url" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 rounded" v-model="data.social_links[0].fb">
        <label class="block mt-3 mr-64 font-bold">Instagram</label>
        <input type="url" class="bg-gray-50 w-full max-w-sm p-1 shadow border-blue-600 border-2 rounded" v-model="data.social_links[0].ig">
      </div>
    </div>
    <div class="mt-4 pb-5 border-b bg-red-500 p-4 rounded-2xl shadow-xl  max-w-2xl m-auto sm:border-0">
      <p class="text-white text-xl">Delete my account</p>
      <MainButton class="bg-white mt-4" @click="modalShow = true">Delete</MainButton>
    </div>
    <div class="mt-4 text-center">
      <MainButton class="bg-gray-900 text-white border-gray-900 border mr-5" @click="update">Save</MainButton>
      <MainButton class="border-gray-900 border" @click="cancelUpdate ">Cancel</MainButton>
    </div>
  </div>
 <ConfirmDeleteUserModal v-if="modalShow" @cancelDelete="modalShow = false"/>
</template>

<script>
import useGetUserInfo from "@/composables/getUserInfo";
import getUser from "@/composables/getUser";
import {onMounted, ref} from "vue";
import MainButton from "@/components/buttons/MainButton";
import useUpdateDocument from "@/composables/updateDoc"
import {useRouter} from "vue-router";
import ConfirmDeleteUserModal from "@/components/modals/ConfirmDeleteUserModal";
import {useStore} from "vuex";

export default {
  name: "ProfileViewEdit",
  components: {MainButton, ConfirmDeleteUserModal},
  setup() {
    const {data, getUserInfo} = useGetUserInfo()
    const {user} = getUser();
    const {updateDocument, isPending} = useUpdateDocument()
    const router = useRouter();
    const modalShow = ref(false);
    const store = useStore();

    onMounted(() => getUserInfo(user.value.uid))

    const update = async () => {
      await updateDocument(user.value.uid, data.value)

      if (!isPending.value) {
        await router.push({name: 'profile', params: {user: user.value.uid}})
      }
    }

    const cancelUpdate = () => {
      router.push({name: 'profile', params: {user: user.value.uid}})
    }

    return {data, isPending, update, cancelUpdate, modalShow, toggleToastModal: () => store.commit('toggleToastModal'), store}

  }
}
</script>

<style scoped>

</style>