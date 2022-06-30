<template>
  <div class="address mt-14">
    <p class="font-bold mb-4 lg:text-2xl">FindState</p>
    <p>New York, NY, USA</p>
    <p>Wall st.</p>
    <p>info@stormedia.gg</p>
    <p>+1 929-777-8282</p>
    <p class="">All rights reserved &copy; 2022</p>
    <SocialBox/>
  </div>
</template>

<script>
import SocialBox from "@/components/footer/SocialBox";
export default {
  name: "AddressBox",
  components: {SocialBox}
}
</script>

<style scoped>

</style>