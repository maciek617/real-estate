<template>
  <div class=" bg-white flex flex-wrap justify-between mt-10 rounded-2xl p-2 max-w-7xl m-auto shadow lg:justify-evenly">
    <div class="sm:flex sm:justify-evenly w-full max-w-2xl m-auto">
      <div class="mx-4 mt-2 max-w-comp w-full">
        <p class="font-bold lg:text-xl">Bedrooms</p>
        <p class="lg:text-xl"><i class="fa-solid fa-bed mr-2"></i>{{ data.basic_info.rooms }}</p>
      </div>
      <div class="mx-4 mt-2 max-w-comp w-full">
        <p class="font-bold lg:text-xl">Bathrooms</p>
        <p class="lg:text-xl"><i class="fa-solid fa-bath mr-2"></i>{{ data.basic_info.bathrooms }}</p>
      </div>
      <div class="mx-4 mt-2 max-w-comp w-full">
        <p class="font-bold lg:text-xl">Floors</p>
        <p class="lg:text-xl"><i class="fa-solid fa-align-justify mr-2"></i>{{ data.basic_info.floor_ }}</p>
      </div>
    </div>
    <div class="sm:flex w-full sm:justify-evenly max-w-2xl m-auto sm:mt-5">
      <div class="mx-4 mt-2 max-w-comp w-full">
        <p class="font-bold lg:text-xl">Square Area</p>
        <p class="lg:text-xl"><i class="fa-solid fa-layer-group mr-2"></i>{{ data.basic_info.surface }}㎡</p>
      </div>
      <div class="mx-4  mt-2 max-w-comp w-full">
        <p class="font-bold lg:text-xl">Heating</p>
        <p class="lg:text-xl"><i class="fa-solid fa-dumpster-fire mr-2"></i>{{ data.basic_info.heating }}</p>
      </div>
      <div class="mx-4  mt-2 max-w-comp w-full">
        <p class="font-bold lg:text-xl">Owner</p>
        <p class="lg:text-xl"><i class="fa-solid fa-user-check mr-2"></i>{{ data.owner }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicInfo",
  props: ['data']
}
</script>

<style scoped>

</style>