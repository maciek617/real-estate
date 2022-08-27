<template>
  <div class="bg-gray-100 mt-5 flex flex-col items-center rounded shadow sm:flex-row sm:justify-around sm:items-start sm:h-32">
    <div class="w-52 mt-4 border-b-2 pb-4 sm:border-b-0">
      <p class="lg:text-xl">Location</p>
      <input type="text"
             class="rounded shadow mt-2 p-2 w-52"
             placeholder="ex. New York"
             v-model="store.state.searchLocationTerm">
    </div>
    <div>
      <div class="w-52 mt-4 border-b-2 pb-4 sm:border-b-0">
        <p class="lg:text-xl">Price</p>
        <input type="number"
               class="rounded shadow mt-2 p-2 w-52"
               placeholder="100000$"
               v-model="store.state.price">
      </div>
    </div>
    <div>
      <div class="w-52 mt-4 border-b-2 pb-4 sm:border-b-0">
        <p @click="houseShow = !houseShow"
           class="cursor-pointer lg:text-xl">Property type
          <i class="fa-solid fa-angle-down ml-7"></i>
        </p>
        <p class="font-bold text-blue-500 mt-2">{{ house.term }}</p>
      </div>
      <Transition>
        <div class="text-left bg-white w-52 shadow rounded -mt-3 absolute z-40" v-if="houseShow">
          <p v-for="house in searchTermsHouse" :key="house"
             class="mt-2 hover:bg-blue-200 cursor-pointer px-4"
             @click="[chooseSearchTerms(searchTermsHouse, house), houseShow = false]">
            {{ house.term }}
          </p>
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

    const house = ref({})

    onMounted(() => {
      house.value = selectedTerm(searchTermsHouse.value);
      store.state.propertyType = house.value
    });

    watchEffect(() => {
      if (searchTermsHouse.value) {
        house.value = selectedTerm(searchTermsHouse.value);
        store.state.propertyType = house.value
      }
    })


    return {priceShow, houseShow, searchTermsHouse, chooseSearchTerms, house, store}
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