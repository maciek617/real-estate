<template>
<div class="w-full max-w-6xl m-auto mb-10">
  <FindHouseSort />
  <FindHouseSearchEnigine/>
</div>
</template>

<script>
import FindHouseSort from "@/components/house-find-app/FindHouseSort";
import FindHouseSearchEnigine from "@/components/house-find-app/FindHouseSearchEnigine";
export default {
  name: "OurOfficesView",
  components: {FindHouseSort, FindHouseSearchEnigine}
}
</script>

<style scoped>

</style>