<template>
  <div class="nav_options lg:block mt-6 relative">
    <router-link :to="user ? {name: 'profile', params: {user: user.displayName.toLowerCase()}}: {name: 'signup'}">
      <MainButton class="text-black bg-white lg:text-white lg:bg-black">{{user ? 'Profile' : 'Get Started'}}</MainButton>
    </router-link>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import getUser from "@/composables/getUser";
export default {
  name: "NavOptions",
  components: {MainButton},
  setup() {
    const {user} = getUser();

    return {user}
  }
}
</script>
