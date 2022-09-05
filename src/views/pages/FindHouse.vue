<template>
  <div class="w-full max-w-7xl m-auto mb-10 min-h-70vh">
    <FindHouseSort/>
    <div class="ml-5 pl-4 mt-5 border border-blue-600 w-32 rounded border-2 shadow-2xl" @click="showFilters = !showFilters">
      <p class="text-xl cursor-pointer">Filters <i class="fa-solid fa-angle-down text-blue-500 ml-5"></i></p>
    </div>
    <Transition name="expand">
      <FindHouseSearchEnigine v-if="showFilters"/>
    </Transition>
    <div v-if="posts.length && !isLoading">
      <div class="residence_wrapper flex justify-start items-center flex-col mt-6 lg:flex-row max-w-screen-xl sm:flex-wrap">
        <TransitionGroup name="list">
          <div v-for="post in posts" :key="post.id" class="relative residence shadow-md mx-5 mt-4 max-w-xs w-full lg:max-w-sm"
               v-show="post.price.price <= (store.state.price.term ? store.state.price.term : store.state.price)
               && post.location.includes(store.state.searchLocationTerm)
               && post.category.includes((store.state.propertyType.term ? store.state.propertyType.term : store.state.propertyType ))"
               ref="item"
          >
            <div>
              <img :src="post.main_photo" alt="residence" class="max-w-sm w-full h-64 object-cover" loading="eager">
              <span class="block p-4 font-bold"><i class="fa-solid fa-location-dot mr-3"></i>{{ post.location }}</span>
              <div class="info_box p-4 pt-2 flex justify-around max-w-sm">
                <span class="text-gray-600"><i class="fa-solid fa-bed text-xl mr-2"></i>{{ post.basic_info.rooms }} Bed</span>
                <span class="text-gray-600"><i class="fa-solid fa-bath text-xl mr-2"></i>{{ post.basic_info.bathrooms }} Bath</span>
                <span class="text-gray-600"><i class="fa-solid fa-layer-group mr-2"></i>{{ post.basic_info.surface }}㎡</span>
              </div>
              <div class="absolute right-2 rounded top-2 bg-white py-2 px-4 shadow-2xl cursor-default">{{ post.category.toString().replace('All', '') }}</div>
              <div class="price flex items-center justify-between p-4">
                <router-link :to="{name: 'house', params: {title: post.title.replaceAll(' ', '-').toLowerCase(), id: post?.id}}">
                  <MainButton class="text-white bg-black">Review Now</MainButton>
                </router-link>
                <span class="font-bold">${{ post.price.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
      <p v-if="showMessage" class="text-blue-500 text-center">No real estate was found</p>
      <div class="flex justify-center mt-4" v-if="posts.length >= 6 && lastVisibleItem">
        <MainButton class="load_next_post text-white bg-black" @click="loadNextPosts">Load more...</MainButton>
      </div>
      <div v-if="!lastVisibleItem" class="text-center">
        <p class="text-center text-2xl text-blue-500 mt-5">Yooo, you are up to date. Nothing more to discover!</p>
        <MainButton class="text-white bg-black mt-2" @click="reloadPage">Reload Page</MainButton>
      </div>
    </div>
    <LoaderView v-else/>
  </div>
</template>

<script>
import FindHouseSort from "@/components/house-find-app/FindHouseSort";
import useGetAllPosts from "@/composables/getAllPosts";
import {onMounted, ref, watchEffect, watch} from "vue";
import MainButton from "@/components/buttons/MainButton";
import LoaderView from "@/components/loaders/LoaderView";
import {useStore} from "vuex";
import {defineAsyncComponent} from "vue";

export default {
  name: "OurOfficesView",
  components: {
    FindHouseSort,
    FindHouseSearchEnigine: defineAsyncComponent(() =>
        import('@/components/house-find-app/FindHouseSearchEnigine')
    ),
    MainButton,
    LoaderView
  },
  setup() {
    const {posts, getAllPosts, isLoading, nextPost, nextPosts, lastVisibleItem} = useGetAllPosts();
    const store = useStore();
    const showFilters = ref(false);
    const path = ref('posts');
    const orderByField = ref('timestamp');
    const direction = ref('desc');
    const limit = ref(6);
    const whereField = ref('timestamp');
    const operator = ref('<');
    const whereValueField = ref(new Date());
    const item = ref([]);

    onMounted(async () => {
      await getAllPosts(path.value, orderByField.value, direction.value, +limit.value, whereField.value, operator.value, whereValueField.value);
      showMessage.value = item.value.every(item => item?.style.display === 'none')
    })

    watch(() => store.state.sortBy.term,
        (newSort) => {
          if (newSort === 'Low to high') {
            orderByField.value = 'price.price'
            direction.value = 'asc'
            whereField.value = 'price.price'
            whereValueField.value = (store.state.price.term ? store.state.price.term : store.state.price);
          } else if (newSort === 'High to low') {
            orderByField.value = 'price.price'
            direction.value = 'desc'
            whereField.value = 'price.price'
            whereValueField.value = (store.state.price.term ? store.state.price.term : store.state.price);
          } else {
            orderByField.value = 'timestamp';
            direction.value = 'desc';
            whereField.value = 'timestamp';
            whereValueField.value = new Date();
          }
          getAllPosts(path.value, orderByField.value, direction.value, +limit.value, whereField.value, operator.value, whereValueField.value);
        })


    const loadNextPosts = () => {
      if (lastVisibleItem.value === undefined) return
      nextPost(path.value, orderByField.value, direction.value, lastVisibleItem.value, +limit.value, whereField.value, operator.value, whereValueField.value);
    }

    const reloadPage = () => {
      window.location.reload()
    }


    const showMessage = ref(false);


    watchEffect(() => {
      if (store.state.price) {
        setTimeout(() => {
          showMessage.value = item.value.every(item => item?.style.display === 'none')
        }, 520)
      }
      if (store.state.propertyType.term) {
        setTimeout(() => {
          showMessage.value = item.value.every(item => item?.style.display === 'none')
        }, 520)
      }
      if (store.state.searchLocationTerm) {
        setTimeout(() => {
          showMessage.value = item.value.every(item => item?.style.display === 'none')
        }, 520)
      }
      if (posts.value.length) {
        setTimeout(() => {
          showMessage.value = item.value.every(item => item?.style.display === 'none')
        }, 520)
      }
    })


    return {posts, isLoading, store, showFilters, lastVisibleItem, loadNextPosts, nextPosts, reloadPage, showMessage, item}
  }
}
</script>