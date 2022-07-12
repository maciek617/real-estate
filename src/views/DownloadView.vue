<template>
  <div class="download_wrapper py-20 min-h-80vh flex flex-col items-center">
    <h1 class="text-center mt-48 text-2xl lg:text-3xl">FindState will be available for download soon!</h1>
    <BackHomeButton class="text-white bg-black block mt-6"/>
  </div>
</template>

<script>
import BackHomeButton from "@/components/buttons/BackHomeButton";
export default {
  name: "DownloadView",
  components: {BackHomeButton}
}
</script>

<style scoped>

</style>