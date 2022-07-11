<template>
  <div class="nav_options lg:block mt-6 relative">
    <router-link :to="{name: 'signup'}">
      <MainButton class="text-black bg-white lg:text-white lg:bg-black">Get Started</MainButton>
    </router-link>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "NavOptions",
  components: {MainButton}
}
</script>
