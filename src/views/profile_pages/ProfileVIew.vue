<template>
  <div class="bg-gray-50 min-h-70vh" v-if="data && !isPending">
    <div class="mt-20 w-full max-w-7xl m-auto relative px-4 py-4 xl:flex xl:min-w-about">
      <div>
        <div class="w-full z-20 relative">
          <img :src="data.bg_photo" alt="background color" loading="lazy" class="w-full rounded-2xl max-h-80 object-cover">
        </div>
        <div class="relative bg-white rounded-b-2xl -mt-4 shadow pb-4">
          <div class="relative">
            <img :src="data.photo" alt="profile picture" loading="lazy"
                 class="z-30 w-32 h-32 object-cover rounded-full border-4 border-white shadow-2xl absolute -top-16 left-2 sm:w-40 sm:h-40 sm:-top-20 sm:left-7">
            <div class="pt-20 px-2 sm:px-7 sm:pt-24">
              <h1 class="font-bold text-2xl sm:text-3xl">{{ data.name }}</h1>
              <p class="text-gray-500 mt-2" v-if="data.jobTitle.display"><i class="fa-solid fa-briefcase mr-2"></i>{{ data.jobTitle.title }}</p>
              <p class="text-gray-500"><i class="fa-solid fa-location-dot mr-3"></i>{{ data.location }}</p>
              <p class="text-gray-500"><i class="fa-solid fa-hourglass-start mr-3"></i>Joined: {{ data.joinDate.toDate().toDateString() }}</p>

            </div>
          </div>
          <div class="absolute top-8 right-5" v-if="showEditButton">
            <router-link :to="{name: 'edit-profile'}">
              <MainButton class="text-white bg-black">Edit Profile</MainButton>
            </router-link>
          </div>
        </div>
        <div class="bg-white p-2 mt-4 rounded-2xl shadow">
          <p class="font-bold text-xl mb-2">About me</p>
          <p class="pb-2 w-full xl:min-w-about 2xl:min-w-aboutXL">{{ data.bio }}</p>
        </div>
        <UserPost :user="route.params.user"/>
      </div>
      <div class="flex justify-evenly flex-col items-center sm:flex-row sm:items-start xl:flex-col xl:justify-start xl:ml-5">
        <div class="bg-white mt-4 w-80 p-5 rounded-2xl shadow mx-2 xl:mt-0">
          <p class="font-bold pb-2">Location</p>
          <p><i class="fa-solid fa-location-dot"></i> {{ data.location }}</p>
        </div>
        <div class="bg-white mt-4 w-80 p-5 rounded-2xl shadow mx-2">
          <p class="font-bold pb-2">Connect</p>
          <p><i class="fa-solid fa-globe"></i><a :href="data.social_links[0].web" target="_blank"
                                                 class="ml-2 underline text-blue-500">
            Website</a></p>
          <p><i class="fa-brands fa-facebook"></i><a :href="data.social_links[0].fb === 'Add Facebook' || '' ? 'https://www.facebook.com/' : data.social_links[0].fb" target="_blank"
                                                     class="ml-2 underline text-blue-500">Facebook</a></p>
          <p><i class="fa-brands fa-instagram"></i><a :href="data.social_links[0].ig === 'Add Instagram' || '' ? 'https://www.instagram.com/' : '123' + data.social_links[0].ig" target="_blank"
                                                      class="ml-2 underline text-blue-500">Instagram</a></p>
        </div>
        <div v-if="users.length">
          <div class="bg-white mt-4 w-80 p-5 rounded-2xl shadow mx-2">
            <p class="font-bold pb-2">Discover profiles</p>
            <router-link :to="{name: 'profile', params: {user: user.id}}" v-for="user in users" :key="user.id" @click="scrollToTop">
              <div class="flex items-center mb-3 bg-gray-50 p-2 rounded-2xl shadow hover:bg-gray-100">
                <img :src="user.photo" alt="user profile picture" class="w-10 h-10 rounded-full mr-2">
                <p>{{ user.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>


  </div>
  <div v-else class="min-h-70vh pt-72">
    <LoaderView/>
  </div>

</template>

<script>
import {useRoute, useRouter} from "vue-router";
import MainButton from '@/components/buttons/MainButton'
import useGetUserInfo from "@/composables/getUserInfo";
import {onMounted, ref, watch} from "vue";
import useGetAllUsers from "@/composables/getAllUsers";
import getUser from "@/composables/getUser";
import LoaderView from "@/components/loaders/LoaderView";
import scrollToTop from "@/composables/scrollTop";
import UserPost from "@/components/profile/UserPost";

export default {
  name: "ProfileVIew",
  components: {MainButton, LoaderView, UserPost},
  setup() {
    const route = useRoute();
    const router = useRouter()
    const showEditButton = ref(true)
    const {users, getAllUsers} = useGetAllUsers();
    const {data, getUserInfo, isPending} = useGetUserInfo();
    const {user} = getUser();

    onMounted(async () => {
      await getUserInfo(route.params.user);
      if (user.value) {
        user.value.uid === route.params.user ? showEditButton.value = true : showEditButton.value = false;
      } else {
        showEditButton.value = false
      }
      data.value === null ? await router.push({name: 'not-found'}) : ''

      await getAllUsers('users', 3);
    })

    watch(() => route.params.user, async (newId) => {
          if (route.path.includes('profile') && !route.path.includes('edit')) {
            if (user.value) {
              user.value.uid === route.params.user ? showEditButton.value = true : showEditButton.value = false;
            } else {
              showEditButton.value = false
            }
            await getUserInfo(newId);
          }

        }
    )

    return {data, showEditButton, users, isPending, scrollToTop, route}
  }
}
</script>

<style scoped>
</style>