<template>
  <div
      class="text_box max-w-screen-2xl m-auto h-vh text-white drop-shadow">
    <h1 class="text-4xl max-w-6xl sm:text-5xl lg:text-6xl 2xl:text-8xl">Are you ready to find your
      dream
      house?</h1>
    <p class="my-4 max-w-screen-sm 2xl:mt-10 2xl:text-very-large">It is now very easy to reach the
      house of your dream with FindState the house you are looking for very easily.</p>
    <MainButton class="bg-white text-black" @click="switchRoutes">Get Started</MainButton>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
// import getUser from "@/composables/getUser";
// import {useCookies} from "vue3-cookies";
// import {computed} from "vue";
import {useRouter} from "vue-router";
import checkForUserAndCookies from "@/composables/checkForUserAndCookies";
export default {
  name: "HeroPageMainText",
  components: {MainButton},
  setup() {
    // const {user} = getUser();
    // const {cookies} = useCookies()
    //
    // const checkIfUserWasLoggedIn = computed(() => {
    //   return cookies.get('was_logged') === 'true'
    // });
    //
    const router = useRouter();
    const switchRoutes = () => {
      router.push({name: checkForUserAndCookies()})
    }
    //
    // const checkForUserAndCookies = () => {
    //   if (user.value) {
    //     router.push('/app')
    //   } else if (checkIfUserWasLoggedIn.value) {
    //     router.push('/login')
    //   } else {
    //     router.push('/signup')
    //   }
    // }
    return { checkForUserAndCookies, switchRoutes}
  }
}
</script>

<style scoped>

</style>