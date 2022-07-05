<template>
  <div class="mt-24 px-4">
    <h1 class="font-bold text-3xl sm:text-4xl sm:pb-4 lg:text-5xl xl:text-6xl">Search for properties</h1>
    <div
        class="border-2 min-w-term max-w-filterVw rounded-xl py-2 px-4 mt-2 border-blue-600 flex justify-between items-center shadow cursor-pointer" @click="show = !show">
      <p>Sort by: <span class="ml-2 font-bold">{{selectTerm.term}}</span></p>
      <i class="fa-solid fa-angle-down"></i>
    </div>
    <Transition>
    <div class="bg-gray-50 w-full max-w-filterVw rounded mt-2 flex flex-col shadow py-2" v-if="show">
      <span v-for="term in searchTerms" :key="term" class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            @click="chooseSearchTerm(term)">
        {{term.term}}
      </span>
    </div>
    </Transition>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "FindHouseSort",
  setup() {
    const selectTerm = ref("");
    const show = ref(false);
    const searchTerms = ref([
      {
        term: "Low to high",
        selected: false,
      },
      {
        term: "High to low",
        selected: false,
      },
      {
        term: "Created date",
        selected: false,
      },
      {
        term: "Popular",
        selected: false,
      },
      {
        term: "All",
        selected: true,
      }
    ]);

    const selectedTerm = () => {
      selectTerm.value = searchTerms.value.find((x) => x.selected);
    };

    onMounted(() => selectedTerm());



    const chooseSearchTerm = (tr) => {
      searchTerms.value.forEach((x) => (x.selected = false));
      tr.selected = true;
      selectedTerm()
      show.value = false;
    };

    return {searchTerms, selectTerm, show, chooseSearchTerm}
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>