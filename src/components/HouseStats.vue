<template>
  <div class="bg-modal fixed top-0 left-0 w-full max-h-full overflow-y-auto z-50 " @click="closeWhenClickOutside">
    <div class="bg-blue-50 w-full h-full max-w-lg">
      <div class="flex justify-between items-center p-2">
        <p class="text-3xl font-bold">Statistics</p>
        <i class="fa-solid fa-xmark cursor-pointer text-3xl" @click="triggerCloseModal"></i>
      </div>
      <p class="mt-10 text-2xl text-blue-500 font-bold p-2">Price in time:</p>
      <div class="flex m-2 items-center">
        <span class="block w-5 h-5 bg-blue-500 mr-2"></span>
        <p>Price in $ (US. Dollar)</p>
      </div>
      <PriceChart :data="data"/>
      <p class="p-2 text-2xl text-blue-500 font-bold mt-10 scroll-auto">Compare info:</p>
      <div class="w-full flex justify-between relative bg-white" v-if="housesToCompare.length > 0">
        <div v-for="(house, i) in housesToCompare" :key="house" class="compare_house text-sm font-bold p-2">
          <MainButton class="text-white bg-gray-900" @click="removeHouseFromComparison(i)">delete</MainButton>
          <p class="mt-2">{{ house.title }}</p>
          <p class="mt-2">{{ house.location }}</p>
          <p class="mt-2">{{ house.price.isNegotiable ? 'Yes' : 'No' }}</p>
          <p class="mt-2">{{ house.price.price }}$</p>
          <p class="mt-2">{{ house.owner }}</p>
          <p class="mt-2">{{ house.quality }}</p>
          <p class="mt-2">{{ house.category.slice(3) }}</p>
          <p class="mt-2">{{ house.basic_info.bathrooms }}</p>
          <p class="mt-2">{{ house.basic_info.surface }}m2</p>
          <p class="mt-2">{{ house.basic_info.heating }}</p>
          <p class="mt-2">{{ house.basic_info.rooms }}</p>
          <p class="mt-2">{{ house.basic_info.floor_ }}</p>
          <p class="mt-2">{{ house.additional_info.balcony ? 'Yes' : 'No' }}</p>
          <p class="mt-2">{{ house.additional_info.garden ? 'Yes' : 'No' }}</p>
          <p class="mt-2">{{ house.additional_info.parking ? 'Yes' : 'No' }}</p>
          <router-link :to="{name: 'house', params: {title: house.title.replaceAll(' ', '-').toLowerCase(), id: house.id}}">
            <MainButton class="text-white bg-black mt-5" @click="redirectToHouse">Redirect</MainButton>
          </router-link>
        </div>
        <div class="absolute left-1/2 -translate-x-1/2 flex flex-col text-center text-sm pt-11">
          <p class="mt-2">Title</p>
          <p class="mt-2">Location</p>
          <p class="mt-2">Negotiable</p>
          <p class="mt-2">Price</p>
          <p class="mt-2">Ownership</p>
          <p class="mt-2">Quality</p>
          <p class="mt-2">Type</p>
          <p class="mt-2">Bath</p>
          <p class="mt-2">Surface</p>
          <p class="mt-2">Heating</p>
          <p class="mt-2">Rooms</p>
          <p class="mt-2">Floor</p>
          <p class="mt-2">Balcony</p>
          <p class="mt-2">Garden</p>
          <p class="mt-2">Parking</p>
          <MainButton class="text-white bg-gray-900 mt-4" @click="clearComparison">Clear comparison</MainButton>
        </div>
      </div>
      <div v-else class="min-h-minCompareHeight">
        <p class="text-center">Add houses to comparison by clicking on "Add to compare" button on announcement page.</p>
      </div>
    </div>
  </div>
</template>
<script>
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import MainButton from '@/components/buttons/MainButton'
import PriceChart from "@/components/PriceChart";
import {useRouter} from "vue-router";

export default {
  name: "HouseStats",
  emits: ['closeModal'],
  props: ['data'],
  components: {MainButton, PriceChart},
  setup(props, ctx) {
    const store = useStore()
    const closeWhenClickOutside = (e) => {
      e.target.classList.contains('fixed') ? triggerCloseModal() : null
    }

    const triggerCloseModal = () => {
      ctx.emit('closeModal');
    }

    window.addEventListener('keydown', (e) => {
      e.key === 'Escape' ? triggerCloseModal() : null
    })


    const housesToCompare = ref([]);

    onMounted(() => {
      housesToCompare.value = JSON.parse(localStorage.getItem('houses'));
    });

    const router = useRouter()

    const redirectToHouse = () => {
      triggerCloseModal()
      router.push('/')
    }

    let currentCompareHouse = JSON.parse(localStorage.getItem('houses'));

    const removeHouseFromComparison = (index) => {
      currentCompareHouse.splice(index, 1);
      store.state.housesToCompare.splice(index, 1)
      localStorage.setItem('houses', JSON.stringify(currentCompareHouse))
      housesToCompare.value = JSON.parse(localStorage.getItem('houses'));
    }

    const clearComparison = () => {
      currentCompareHouse = [];
      housesToCompare.value = [];
      store.state.housesToCompare = [];
      localStorage.setItem('houses', JSON.stringify(currentCompareHouse))
    }


    return {closeWhenClickOutside, triggerCloseModal, housesToCompare, store, redirectToHouse, removeHouseFromComparison, clearComparison}
  }
}
</script>

<style scoped>
.compare_house:nth-child(2) {
  text-align: right;
}
</style>