<template>
<footer class="pb-4 flex flex-col  justify-around px-4 sm:flex-row sm:items-center shadow">
  <AddressBox/>
  <FooterLinks/>
</footer>
</template>

<script>
import FooterLinks from "@/components/footer/FooterLinks";
import AddressBox from "@/components/footer/AddressBox";
export default {
  name: "FooterView",
  components: {FooterLinks, AddressBox},

}
</script>

<style scoped>

</style>