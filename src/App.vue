<template>
  <MainNav/>
  <router-view class="mt-4"/>
</template>
<script>
import MainNav from "@/components/navigation/MainNav";

export default {
  components: {MainNav}
}
</script>