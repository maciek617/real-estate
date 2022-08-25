<template>
  <div class="nav_options lg:block mt-6 relative">
    <div v-if="user">
      <MainButton class="text-black bg-white w-36 lg:text-white lg:bg-black" @click="show = !show">Account<i class="fa-solid fa-angle-down ml-5"></i></MainButton>
      <div v-if="show" class="bg-gray-900 text-white absolute top-10 w-36 shadow-2xl">
        <router-link :to="user ? {name: 'profile', params: {user: user.uid}} : {name: 'signup'}" class="hover:bg-gray-500 block px-3 py-2"><i class="fa-solid fa-user mr-2"></i>
          Profile
        </router-link>
        <router-link :to="{name: 'posts-list' , params: {id: user.uid}}">
          <p class="hover:bg-gray-500 block px-3 py-2 cursor-pointer"><i class="fa-solid fa-bullhorn mr-2"></i>Posts</p>
        </router-link>
        <p class="hover:bg-gray-500 block px-3 py-2 cursor-pointer" @click="singOutUser"><i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Logout</p>
      </div>

    </div>
    <div v-else>
      <router-link :to="{name: 'signup'}">
        <MainButton class="text-black bg-white lg:text-white lg:bg-black">Get Started</MainButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import getUser from "@/composables/getUser";
import {ref} from "vue";
import useSignout from "@/composables/useSignout";
import {useRouter} from "vue-router";

export default {
  name: "NavOptions",
  components: {MainButton},
  setup() {
    const {user} = getUser();
    const {signout} = useSignout();
    const show = ref(false);
    const router = useRouter();

    const singOutUser = async () => {
      await signout();
      show.value = false;
      await router.push({name: 'home'})
    }
    return {user, show, singOutUser}

  }
}
</script>
