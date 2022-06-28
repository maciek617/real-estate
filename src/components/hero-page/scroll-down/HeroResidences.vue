<template>
<div class="residence_wrapper flex justify-around items-center flex-col mt-6 lg:flex-row max-w-screen-xl m-auto">
  <div v-for="residence in residencesInfo" :key="residence.img" class="shadow-md mt-4 max-w-xs xl:max-w-lg">
    <img :src="require('../../../' + residence.img)" alt="residence" class="max-w-sm w-full h-64 object-cover">
    <span class="block p-4 font-bold"><i class="fa-solid fa-location-dot mr-3"></i>{{
        residence.location }}</span>
    <div class="info_box p-4 pt-2 flex justify-around max-w-sm">
      <span class="text-gray-600"><i class="fa-solid fa-bed text-xl mr-2"></i>{{ residence.bed }} Bed</span>
      <span class="text-gray-600"><i class="fa-solid fa-bath text-xl mr-2"></i>{{ residence.bath}} Bath</span>
      <span class="text-gray-600"><i class="fa-solid fa-person-digging text-xl mr-2"></i>{{residence.worker }}
        Workers</span>
    </div>
    <div class="price flex items-center justify-between p-4">
      <MainButton>Review Now</MainButton>
      <span class="font-bold">${{ residence.price }}</span>
    </div>
  </div>
</div>
</template>

<script>
import {ref} from "vue";
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "HeroResidences",
  components: {MainButton},
  setup() {
    const residencesInfo = ref([
      {
        img: 'assets/buildings/house_5.jpg',
        location: 'Alaska, ABC',
        bed: '4',
        bath: '10',
        worker: '19',
        price: '7.200.000'
      },
      {
        img: 'assets/buildings/house_4.jpg',
        location: 'New York, ABC',
        bed: '2',
        bath: '4',
        worker: '11',
        price: '4.100.000'
      },
      {
        img: 'assets/buildings/house_1.jpg',
        location: 'Virginia, ABC',
        bed: '3',
        bath: '3',
        worker: '8',
        price: '1.200.000'
      },
    ])

    return {residencesInfo}
  }
}
</script>

<style scoped>

</style>