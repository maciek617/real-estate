<template>
  <MainNav/>
  <router-view/>
</template>
<script>
import MainNav from "@/components/navigation/MainNav";

export default {
  components: {MainNav}
}
</script>