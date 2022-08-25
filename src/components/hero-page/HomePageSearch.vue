<template>
  <div
      class="bg-white w-full -bottom-44 sm:w-fit min-h-mn drop-shadow absolute left-1/2 sm:-bottom-20 -translate-x-1/2 p-2 lg:-bottom-16">
    <span class="text-2xl w-full block px-4 text-xl text-center sm:text-left">Price research and
      comparison</span>
    <div class="flex items-center flex-col sm:items-start lg:flex-row">
      <div class="mt-4 flex items-center flex-col sm:flex-row">
        <div class="relative">
          <input type="text"
                 placeholder="Location"
                 v-model="location"
                 class="bg-gray-100 p-2 my-2 font-light mx-3 lg:mx-4">
                <i class="fa-solid fa-location-dot absolute left-36 top-1/2 -translate-y-1/2"></i>
        </div>
        <div class="relative">
          <input type="text"
                 placeholder="Type"
                 v-model="type"
                 disabled
                 class="bg-gray-100 p-2 my-2 font-light mx-3 disabled:cursor-not-allowed lg:mx-4">
          <i class="fa-solid fa-house absolute left-36 top-1/2 -translate-y-1/2"></i>
        </div>
        <div class="relative">
          <input type="text"
                 placeholder="Price"
                 v-model="price"
                 class="bg-gray-100 p-2 my-2 font-light mx-3 lg:mx-4">
          <i class="fa-solid fa-wallet absolute left-36 top-1/2 -translate-y-1/2"></i>
        </div>
      </div>
      <MainButton class="mx-4 my-2 text-white bg-black lg:my-6" @click="setStoreValuesFromHomePage">Search Now</MainButton>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import {useStore} from "vuex";
import {ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "HomePageSearch",
  components: {MainButton},
  setup() {
    const store = useStore();
    const router = useRouter()
    const price = ref(0);
    const location = ref('');
    const type = ref('All');


    const setStoreValuesFromHomePage = () => {
      if(price.value > 0 && location.value !== '') {
        store.state.price = +price.value;
        store.state.searchLocationTerm = location.value;
        store.state.propertyType = 'All';
        router.push({name: 'find-house'})
      }
    }

    return {price, location, type, setStoreValuesFromHomePage}
  }
}
</script>
