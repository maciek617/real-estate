<template>
  <div v-if="data" class="bg-gray-50">
    <div class="mt-20 px-4 max-w-7xl m-auto pt-4">
      <div>
        <p class="text-gray-500">Added: {{ data.timestamp ? data.timestamp.toDate().toDateString() : '' }}</p>
        <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">{{ data.title }}</h1>
        <p class="text-gray-500 sm:text-xl">{{ data.location }}</p>
      </div>
      <div class="flex items-center justify-center flex-wrap mt-10 lg:justify-end lg:mt-0">
        <div v-if="user" class="relative">
          <EditPostPass :timeToUpdate="timeToUpdate" :data="data" :user="user" :notToUpdate="notToUpdate" :dateToUpdate="dateToUpdate"/>
        </div>
        <MainButton class="bg-gray-900 text-white m-2" @click="showStatsModal = true"><i class="fa-solid fa-chart-simple mr-2"></i>Stats</MainButton>
        <MainButton class="bg-gray-900 text-white m-2" @click="setHouseToCompare"><i class="fa-solid fa-code-compare mr-2"></i>Add to compare</MainButton>
        <MainButton class="bg-gray-900 text-white m-2" @click="copyLink"><i class="fa-solid fa-share-nodes mr-2"></i>Share</MainButton>
      </div>
      <div>
        <p class="text-4xl pt-4 font-bold">{{ priceWithCommas }}$</p>
        <p v-if="data.price.isNegotiable">Price <strong>IS</strong> negotiable</p>
        <p v-else>Price is <strong>NOT</strong> negotiable</p>
      </div>
      <div class="mt-4 w-full">
        <div class="sm:flex items-start justify-center" v-show="load">
          <img :src="data.main_photo" alt="main house photo" class="h-52 w-full sm:w-4/6 sm:h-tablet object-cover rounded-2xl shadow-2xl" @load="isLoaded(1)" loading="eager">
          <div class="ml-3" v-if="filteredImages">
            <img :src="filteredImages[0]" alt="main house photo" class="h-52 w-full sm:w-96 object-cover rounded-2xl shadow-2xl mt-2" @load="isLoaded(2)" loading="eager">
            <img :src="filteredImages[1]" alt="main house photo" class="h-52 w-full sm:w-96 object-cover rounded-2xl shadow-2xl mt-3" @load="isLoaded(3)" loading="eager">
            <p class="font-bold text-3xl text-center p-2 sm:mt-10">+{{ data.images.length - 3 }}</p>
          </div>
        </div>
        <MainButton class="text-white bg-gray-900 mt-5 lg:mt-10 disabled:cursor-not-allowed" :disabled="!load" @click="showGallery = true"><i class="fa-solid fa-magnifying-glass mr-2"></i>Show full
          gallery</MainButton>
        <router-link :to="{name: 'profile', params: {user: data.author.id}}">
          <MainButton class="text-white bg-gray-900 mt-5 lg:mt-10 ml-4 disabled:cursor-not-allowed"><i class="fa-solid fa-user mr-2"></i>Seller's profile</MainButton>
        </router-link>
        <ImagesGalleryModal v-if="showGallery" :images="data.images" @closeGallery="showGallery = false"/>
        <div v-if="!load">
          <LoaderView/>
        </div>
      </div>
      <BasicInfo :data="data"/>
      <DescriptionInfo :data="data"/>
      <div class="flex flex-col lg:flex-row items-center">
        <AdditionalInfo :data="data"/>
        <ContactInfo :data="data"/>
      </div>
    </div>
    <div>
      <MortageView v-if="user" :maxCredit="data.price.price"/>
      <div class="mt-10 pb-4" v-else>
        <div class="max-w-7xl m-auto mb-10">
          <p class="text-3xl font-bold">Calculate mortgage in seconds.</p>
          <p class="text-gray-500 mt-2">Unlimited calculations for our users!</p>
        </div>
        <p class="text-center text-3xl mt-2 mb-4">You need to be logged in to see this content!</p>
        <div class="w-full text-center">
          <router-link :to="{name: 'login'}">
            <MainButton class="text-white bg-gray-900">Login</MainButton>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showStatsModal">
    <HouseStats @closeModal="showStatsModal = false" :data="data"/>
  </div>
  <LoaderView v-if="!data"/>
  <ToastModal>
    <h1 class="text-2xl font-bold drop-shadow">Success!</h1>
    <p class="pr-4 sm:text-xl">Link has been copied. Now you can share with others.</p>
  </ToastModal>
</template>

<script>

import useGetSingleHouse from "@/composables/getSingleHouse";
import MainButton from "@/components/buttons/MainButton";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import LoaderView from "@/components/loaders/LoaderView";
import EditPostPass from "@/components/EditPostPass";
import {useStore} from "vuex";
import MortageView from "@/components/mortage/mortageView";
import getUser from "@/composables/getUser";
import HouseStats from "@/components/HouseStats";
import BasicInfo from "@/components/house/BasicInfo";
import AdditionalInfo from "@/components/house/AdditionalInfo";
import ContactInfo from "@/components/house/ContactInfo";
import DescriptionInfo from "@/components/house/DescriptionInfo";
import ToastModal from "@/components/modals/ToastModal";
import {defineAsyncComponent} from "vue";


export default {
  name: "HouseView",
  components: {
    ToastModal,
    BasicInfo, AdditionalInfo, MainButton, LoaderView, EditPostPass, MortageView, ImagesGalleryModal: defineAsyncComponent(() => import('@/components/modals/ImagesGalleryModal.vue')),
    HouseStats, ContactInfo, DescriptionInfo
  },
  setup() {
    const {error, data, getSingleHouse} = useGetSingleHouse();
    const route = useRoute();
    const router = useRouter();
    const load = ref(false);
    const store = useStore();
    const {user} = getUser();
    const loadedImages = ref([]);
    const showGallery = ref(false);
    const filteredImages = ref();
    const showStatsModal = ref(false);
    const dateToUpdate = ref();

    const deleteMainPhotoFromImages = () => {
      filteredImages.value = data.value.images.filter(image => image !== data.value.main_photo)
    }

    onMounted(async () => {
      await getSingleHouse('posts', route.params.id);
      dateToUpdate.value = new Date(data.value.nextUpdate * 1000)
      error.value !== '' ? await router.push({name: 'not-found'}) : deleteMainPhotoFromImages();
    })

    const priceWithCommas = computed(() => {
      return data.value.price.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })

    const isLoaded = (img) => {
      loadedImages.value.push(img);
      if (loadedImages.value.length !== 3) return;
      load.value = true;
      loadedImages.value = [];
    }

    const copyLink = () => {
      notToUpdate.value = !notToUpdate.value
      navigator.clipboard.writeText(window.location.href);
      // console.log('hehe')
      store.dispatch('startTimer');
      // console.log('lol')
    }

    watch(() => [showGallery.value, showStatsModal.value], ([newGallery, newStats]) => {
      if (newGallery) {
        window.document.body.classList.add('scroll-disabled')
      } else if (newStats) {
        window.document.body.classList.add('scroll-disabled')
      } else {
        window.document.body.classList.remove('scroll-disabled')
      }
    })

    const currentCompareHouse = JSON.parse(localStorage.getItem('houses'));

    const setHouseToCompare = () => {
      showStatsModal.value = true;
      if (store.state.housesToCompare.length === 0 || store.state.housesToCompare[0] === undefined || store.state.housesToCompare[store.state.housesToCompare.length - 1].id !== data.value.id) {
        if (store.state.housesToCompare.length < 2 || currentCompareHouse.length < 2) {
          store.state.housesToCompare.push(data.value);
          localStorage.setItem('houses', JSON.stringify(store.state.housesToCompare))
        }
      }
    }

    const notToUpdate = ref(false);
    const timeToUpdate = ref();

    setInterval(() => {
      const nowTime = new Date();
      timeToUpdate.value = dateToUpdate.value - nowTime;
    }, 1000)

    watchEffect(() => {
      if (timeToUpdate.value < 0) {
        notToUpdate.value = false
      }
    })

    return {error, data, priceWithCommas, load, isLoaded, copyLink, user, showGallery, filteredImages, showStatsModal, setHouseToCompare, notToUpdate, timeToUpdate, dateToUpdate}
  }
}
</script>

<style scoped>

</style>