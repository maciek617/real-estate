<template>
  <div
      class="bg-white w-full -bottom-44 sm:w-fit min-h-mn drop-shadow absolute left-1/2 sm:-bottom-20 -translate-x-1/2 p-2 lg:-bottom-16">
    <span class="text-2xl w-full block px-4 text-xl text-center sm:text-left">Price research and
      comparison</span>
    <div class="flex items-center flex-col sm:items-start lg:flex-row">
      <div class="mt-4 flex items-center flex-col sm:flex-row">
        <div class="relative">
          <input type="text" placeholder="Location"
                 class="bg-gray-100 p-2 my-2 font-light mx-3 lg:mx-4">
          <i class="fa-solid fa-location-dot absolute left-36 top-1/2 -translate-y-1/2"></i>
        </div>
        <div class="relative">
          <input type="text" placeholder="Type"
                 class="bg-gray-100 p-2 my-2 font-light mx-3 lg:mx-4">
          <i class="fa-solid fa-house absolute left-36 top-1/2 -translate-y-1/2"></i>
        </div>
        <div class="relative">
          <input type="text" placeholder="Price"
                 class="bg-gray-100 p-2 my-2 font-light mx-3 lg:mx-4">
          <i class="fa-solid fa-wallet absolute left-36 top-1/2 -translate-y-1/2"></i>
        </div>
      </div>
      <MainButton class="mx-4 my-2 lg:my-6">Search Now</MainButton>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "HomePageSearch",
  components: {MainButton}
}
</script>
