<template>
  <div class="mt-24 px-4 flex justify-between flex-col sm:items-start sm:flex-row">
    <div>
      <h1 class="font-bold text-3xl sm:text-4xl sm:pb-4 lg:text-5xl xl:text-6xl">Search for properties</h1>
      <div
          class="border-2 min-w-term max-w-filterVw rounded-xl py-2 px-4 mt-2 border-blue-600 flex justify-between items-center shadow cursor-pointer"
          @click="show = !show">
        <p>Sort by: <span class="ml-2 font-bold text-blue-500">{{ sort.term }}</span></p>
        <i class="fa-solid fa-angle-down"></i>
      </div>
      <Transition>
        <div class="bg-gray-50 w-full max-w-filterVw rounded mt-2 flex flex-col shadow-2xl py-2 absolute z-40" v-if="show">
      <span v-for="term in searchTerms" :key="term"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            @click="chooseSearchTerms(searchTerms, term)">
            {{ term.term }}
      </span>
        </div>
      </Transition>
    </div>
      <MainButton class="text-white bg-gray-900 mt-5 sm:mt-20"  v-if="user" @click="CREATE_TEMP_POST">+ Create a new post</MainButton>
  </div>
</template>

<script>
import {onMounted, ref, watchEffect} from "vue";
import useSelectChooseTerm from "@/composables/selectItems";
import MainButton from "@/components/buttons/MainButton";
import getUser from "@/composables/getUser";
import {useStore} from "vuex";
import useCreateTempPost from "@/composables/addTempPost";
import {useRouter} from "vue-router";

export default {
  name: "FindHouseSort",
  components: {MainButton},
  setup() {
    const {user} = getUser();
    const store = useStore();
    const {selectedTerm, chooseSearchTerms, show} = useSelectChooseTerm();
    const {docID, createTempPost} = useCreateTempPost();
    const router = useRouter();
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
        selected: true,
      }
    ]);

    const sort = ref('');

    onMounted(() => {
      sort.value = selectedTerm(searchTerms.value);
      store.state.sortBy = sort.value;
    });

    watchEffect(() => {
      if (searchTerms.value) {
        sort.value = selectedTerm(searchTerms.value);
        store.state.sortBy = sort.value;
        console.log(sort.value)
        console.log(store.state.sortBy)
      }
    })


    const CREATE_TEMP_POST = async () => {
      await createTempPost();
      if(docID.value) {
        await router.push({name: 'create-post', params: {id: docID.value}})
        router.go(0)
      }
    }


    return {searchTerms, show, chooseSearchTerms, sort, user, CREATE_TEMP_POST}
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