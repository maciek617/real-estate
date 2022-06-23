<template>
  <div class="nav_options hidden lg:block lg:relative lg:flex lg:items-center">
    <p class="lg:mx-7">ENG</p>
    <MainButton>Contact</MainButton>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
export default {
  name: "NavOptions",
  components: {MainButton}
}
</script>
