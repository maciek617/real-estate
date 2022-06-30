<template>
  <MainNav/>
  <router-view/>
  <FooterView/>
</template>
<script>
import MainNav from "@/components/navigation/MainNav";
import FooterView from "@/components/footer/FooterView";
export default {
  components: {MainNav, FooterView}
}
</script>