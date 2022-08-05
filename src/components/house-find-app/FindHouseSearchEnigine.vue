<template>
  <div class="bg-gray-100 mt-5 flex flex-col items-center sm:flex-row sm:justify-around sm:items-start sm:h-72">
    <div class="w-40 mt-4 border-b-2 pb-4 sm:border-b-0">
      <p>Location</p>
      <input type="text" class="rounded shadow mt-2 p-2 w-40" placeholder="ex. New York" v-model="locationSearch" @keyup="store.state.searchLocationTerm = locationSearch">
    </div>
    <div>
      <div class="w-40 mt-4 border-b-2 pb-4 sm:border-b-0">
        <p @click="priceShow = !priceShow" class="cursor-pointer">Price <i class="fa-solid fa-angle-down ml-24"></i></p>
        <p class="font-bold text-blue-500">{{ price.term }}</p>
      </div>
      <Transition>
        <div class="text-left bg-white w-40 shadow rounded -mt-3" v-if="priceShow">
          <p v-for="price in searchTermsPrice" :key="price" class="mt-2 hover:bg-blue-200 cursor-pointer px-4"
             @click="[chooseSearchTerms(searchTermsPrice, price), priceShow = false]">{{
              price.term }}$</p>
        </div>
      </Transition>
    </div>
    <div>
      <div class="w-40 mt-4 border-b-2 pb-4 sm:border-b-0">
        <p @click="houseShow = !houseShow" class="cursor-pointer">Property type <i
            class="fa-solid fa-angle-down ml-7"></i></p>
        <p class="font-bold text-blue-500">{{ house.term }}</p>
      </div>
      <Transition>
        <div class="text-left bg-white w-40 shadow rounded -mt-3" v-if="houseShow">
          <p v-for="house in searchTermsHouse" :key="house" class="mt-2 hover:bg-blue-200 cursor-pointer px-4"
             @click="[chooseSearchTerms(searchTermsHouse, house), houseShow = false]">{{
              house.term }}</p>
        </div>
      </Transition>
    </div>
  </div>

</template>

<script>
import {ref, onMounted, watchEffect} from "vue";
import useSelectChooseTerm from "@/composables/selectItems";
import {useStore} from "vuex";

export default {
  name: "FindHouseSearchEnigine",
  setup() {
    const {selectedTerm, chooseSearchTerms} = useSelectChooseTerm();
    const store = useStore()
    const priceShow = ref(false);
    const houseShow = ref(false);
    const locationSearch = ref('')
    const searchTermsPrice = ref([
      {
        term: "50000",
        selected: false,
      },
      {
        term: "100000",
        selected: false,
      },
      {
        term: "200000",
        selected: false,
      },
      {
        term: "500000",
        selected: false,
      },
      {
        term: "1000000",
        selected: false,
      },
      {
        term: "10000000",
        selected: true,
      },
      {
        term: "100000000",
        selected: true,
      },
    ]);

    const searchTermsHouse = ref([
      {
        term: "Summerhouse",
        selected: false,
      },
      {
        term: "Apartment",
        selected: false,
      },
      {
        term: "Mansion",
        selected: false,
      },
      {
        term: "Penthouse",
        selected: false,
      },
      {
        term: "Flat",
        selected: false,
      },
      {
        term: "House",
        selected: false,
      },
      {
        term: "All",
        selected: true,
      },
    ]);

    const price = ref('')
    const house = ref('')

    onMounted(() => {
      price.value = selectedTerm(searchTermsPrice.value);
      house.value = selectedTerm(searchTermsHouse.value);

      store.state.price = price.value;
      store.state.propertyType = house.value
    });

    watchEffect(() => {
      if (searchTermsPrice.value) {
        price.value = selectedTerm(searchTermsPrice.value);
        store.state.price = price.value;
      }

      if (searchTermsHouse.value) {
        house.value = selectedTerm(searchTermsHouse.value);
        store.state.propertyType = house.value
      }
    })


    return {priceShow, houseShow, searchTermsPrice, searchTermsHouse, chooseSearchTerms, price, house, locationSearch, store}
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all .2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>