<template>
  <div v-if="data" class="bg-gray-50">
    <div class="mt-20 px-4 max-w-7xl m-auto pt-4">
      <div>
        <p class="text-gray-500">Added: {{ data.timestamp.toDate().toDateString() }}</p>
        <h1 class="text-3xl font-bold sm:text-4xl lg:text-5xl">{{ data.title }}</h1>
        <p class="text-gray-500 sm:text-xl">{{ data.location }}</p>
      </div>
      <div class="flex items-center justify-end">
        <div v-if="user">
          <MainButton v-if="data.author.id === user.uid" class="bg-gray-900 text-white m-2" @click="copyLink"><i class="fa-solid fa-pen-to-square mr-2"></i>Edit</MainButton>
        </div>
        <MainButton class="bg-gray-900 text-white m-2" @click="copyLink"><i class="fa-solid fa-share-nodes mr-2"></i>Share</MainButton>
      </div>
      <div>
        <p class="text-4xl pt-4 font-bold">{{ priceWithCommas }}$</p>
        <p v-if="data.price.isNegotiable">Price <strong>IS</strong> negotiable</p>
        <p v-else>Price is <strong>NOT</strong> negotiable</p>
      </div>
      <div class="mt-4 w-full">
        <div class="sm:flex items-start justify-center" v-show="load">
          <img :src="data.images[0]" alt="main house photo" class="h-52 w-full sm:w-4/6 sm:h-tablet object-cover rounded-2xl shadow-2xl" @load="isLoaded(1)" loading="eager">
          <div class="ml-3">
            <img :src="data.images[1]" alt="main house photo" class="h-52 w-full sm:w-96 object-cover rounded-2xl shadow-2xl mt-2" @load="isLoaded(2)" loading="eager">
            <img :src="data.images[2]" alt="main house photo" class="h-52 w-full sm:w-96 object-cover rounded-2xl shadow-2xl mt-3" @load="isLoaded(3)" loading="eager">
            <p class="font-bold text-3xl text-center p-2 sm:mt-10">+{{data.images.length - 3}}</p>
          </div>
        </div>
        <MainButton class="text-white bg-gray-900 mt-5 lg:mt-10 disabled:cursor-not-allowed" :disabled="!load" @click="showGallery = true">Show full gallery</MainButton>
        <ImagesGalleryModal v-if="showGallery" :images="data.images" @closeGallery="showGallery = false"/>
        <div v-if="!load">
          <LoaderView/>
        </div>
      </div>

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

      <div class="mt-8 bg-white rounded-2xl p-4">
        <p class="text-3xl font-bold">About this home</p>
        <p class="">{{ data.description }}</p>
      </div>
      <div class="flex justify-around w-full flex-col sm:flex-row">
        <div class="mt-8 bg-white shadow rounded-2xl p-4 max-w-lg w-full">
          <p class="text-3xl font-bold mb-4">Additional information</p>
          <p class="text-xl italic"><i class="fa-solid fa-house-chimney-window mr-2"></i>Balcony: <span class="not-italic font-bold ml-2">{{ !data.additional_info.balcony ? 'No' : 'Yes' }}</span></p>
          <p class="text-xl italic"><i class="fa-solid fa-building-wheat mr-2"></i>Garden: <span class="not-italic font-bold ml-2">{{ !data.additional_info.garden ? 'No' : 'Yes' }}</span></p>
          <p class="text-xl italic"><i class="fa-solid fa-square-parking mr-2"></i>Parking space: <span class="not-italic font-bold ml-2">{{ !data.additional_info.parking ? 'No' : 'Yes' }}</span></p>
        </div>


        <div class="mt-8 bg-white shadow rounded-2xl p-4 max-w-lg w-full">
          <p class="text-3xl font-bold mb-2">Contact Info</p>
          <p class="text-lg"><i class="fa-solid fa-user"></i><span class="ml-4">{{ data.contact_details.name }}</span></p>
          <p class="text-lg"><i class="fa-solid fa-envelope"></i><a :href="'mailto:' + data.contact_details.email" class="ml-4">{{ data.contact_details.email }}</a></p>
          <p class="text-lg"><i class="fa-solid fa-phone"></i><a :href="'tel:' + data.contact_details.phone" class="ml-4"> {{ data.contact_details.phone.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
              " ") }}</a></p>
          <router-link :to="{name: 'profile', params: {user: data.author.id}}"></router-link>
        </div>
      </div>
      <div>
        <MortageView v-if="user" :maxCredit="data.price.price"/>
        <div class="mt-10 pb-4" v-else>
          <p class="text-3xl font-bold">Calculate mortgage in seconds.</p>
          <p class="text-gray-500 mt-2">Unlimited calculations for our users!</p>
          <p class="text-center text-3xl mt-2 mb-4">You need to be logged in to see this content!</p>
          <div class="w-full text-center">
            <router-link :to="{name: 'login'}">
              <MainButton class="text-white bg-gray-900">Login</MainButton>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastModal>
    <h1 class="text-2xl font-bold drop-shadow">Success!</h1>
    <p class="pr-4 sm:text-xl">Link has been copied. Now you can share with others.</p>
  </ToastModal>
  <LoaderView v-if="!data"/>
</template>

<script>

import useGetSingleHouse from "@/composables/getSingleHouse";
import MainButton from "@/components/buttons/MainButton";
import {useRoute} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import LoaderView from "@/components/loaders/LoaderView";
import ToastModal from "@/components/modals/ToastModal";
import {useStore} from "vuex";
import MortageView from "@/components/mortage/mortageView";
import getUser from "@/composables/getUser";
import {defineAsyncComponent} from "vue";

export default {
  name: "HouseView",
  components: {MainButton, LoaderView, ToastModal, MortageView, ImagesGalleryModal: defineAsyncComponent(() => import('../components/modals/ImagesGalleryModal.vue'))},
  setup() {
    const {error, data, getSingleHouse} = useGetSingleHouse();
    const route = useRoute();
    const load = ref(false)
    const store = useStore();
    const {user} = getUser();
    const loadedImages = ref([]);
    const showGallery = ref(false);

    onMounted(() => {
      getSingleHouse('posts', route.params.id);

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
      navigator.clipboard.writeText(window.location.href);
      store.dispatch('startTimer')
    }

    watch(
        () => showGallery.value,
        (show) => {
          show ? window.document.body.classList.add('scroll-disabled') : window.document.body.classList.remove('scroll-disabled')
        }
    )

    return {error, data, priceWithCommas, load, isLoaded, copyLink, user, showGallery}
  }
}
</script>

<style scoped>

</style>