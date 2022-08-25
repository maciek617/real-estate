<template>
  <div class="bg-gray-50">
    <div class="mt-20 px-2 max-w-7xl m-auto pb-5">
      <h1 class="text-2xl text-blue-500 pt-4 lg:text-3xl">Add an announcement</h1>

      <div class="mt-5 bg-white px-2 rounded shadow py-2">
        <p class="text-xl">The more details, the better!</p>

        <div class="flex flex-col mt-2">
          <label>Ad title<span class="text-blue-500">*</span></label>
          <div class="flex items-center">
            <input type="text" placeholder="Ad title..." class="max-w-filterVw w-full p-2 border" v-model="state.title" :maxlength="maxInputLength">
            <p class="ml-2 text-gray-500" :class="state.title.length >= maxInputLength - 5 ? 'text-red-500' : ''">{{ state.title.length }}/{{ maxInputLength }}</p>
          </div>
          <p v-if="v$.title.$error" class="error">This field cannot be empty.</p>
        </div>

        <div class="mt-4">
          <label @click="show = !show" class="text-xl cursor-pointer">Category: <span class="font-bold text-blue-500">{{ category.term.replace('All ', '') }}
            <i class="fa-solid fa-angle-down text-black ml-2"></i></span></label>
          <div v-if="show" class="flex flex-col max-w-xl sm:flex-row sm:justify-around">
        <span v-for="term in searchTerms" :key="term" class="px-2 py-2 cursor-pointer bg-gray-50 mt-2 shadow hover:bg-gray-100"
              @click="chooseSearchTerms(searchTerms, term)">
              {{ term.term.replace('All ', '') }}
      </span>
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Price<span class="text-blue-500">*</span></p>
        <input type="number" placeholder="9999999$" class="w-full max-w-filterVw p-2 border" v-model="state.price.price">
        <p v-if="v$.price.$error" class="error">{{ v$.price.$errors[0].$message }}</p>
        <div class="mt-2 flex flex-row items-center">
          <input type="checkbox" class="mr-2" v-model="state.price.isNegotiable" id="price">
          <label for="price">Price is negotiable</label>
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Location<span class="text-blue-500">*</span></p>
        <div class="flex items-center">
          <input type="text" placeholder="New York City, US" class="w-full max-w-filterVw p-2 border" v-model="state.location" :maxlength="maxInputLength">
          <p class="ml-2 text-gray-500" :class="state.location.length >= maxInputLength - 5 ? 'text-red-500' : ''">{{ state.location.length }}/{{ maxInputLength }}</p>
        </div>
        <p v-if="v$.location.$error" class="error">This field cannot be empty.</p>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Quality<span class="text-blue-500">*</span></p>

        <div class="flex justify-around my-4 max-w-filterVw">
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="quality = 'Used'" :class="quality === 'Used' ? 'selected' : '' ">Used</p>
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="quality = 'New'" :class="quality === 'New' ? 'selected' : '' ">New</p>
        </div>

        <p>Private or company<span class="text-blue-500">*</span></p>

        <div class="flex justify-around my-4 max-w-filterVw">
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="owner = 'Private'" :class="owner === 'Private' ? 'selected' : '' ">Private</p>
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="owner = 'Company'" :class="owner === 'Company' ? 'selected' : '' ">Company</p>
        </div>
      </div>
      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <div class="lg:flex lg:items-center lg:justify-around">

          <div class="flex flex-col mt-2">
            <label>Surface<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="100m2" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.surface">
            <p v-if="v$.basic_info.surface.$error" class="error max-w-err">{{ v$.basic_info.surface.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Rooms<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="4" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.rooms">
            <p v-if="v$.basic_info.rooms.$error" class="error max-w-err">{{ v$.basic_info.rooms.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Bathrooms<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="2" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.bathrooms">
            <p v-if="v$.basic_info.bathrooms.$error" class="error max-w-err">{{ v$.basic_info.bathrooms.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Floor<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="10" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.floor_">
            <p v-if="v$.basic_info.floor_.$error" class="error max-w-err">{{ v$.basic_info.floor_.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Heating<span class="text-blue-500">*</span></label>
            <input type="text" placeholder="gas" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.heating">
            <p v-if="v$.basic_info.heating.$error" class="error max-w-err">Value is required.</p>
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Additional information<span class="text-blue-500">*</span></p>
        <div class="flex flex-row items-center mt-2">
          <label for="balcony" class="mr-5">Balcony</label>
          <input type="checkbox" v-model="state.additional_info.balcony" id="balcony">
        </div>
        <div class="flex flex-row items-center mt-2">
          <label for="garden" class="mr-5">Garden</label>
          <input type="checkbox" v-model="state.additional_info.garden" id="garden">
        </div>
        <div class="flex flex-row items-center mt-2">
          <label for="parking" class="mr-5">Parking space</label>
          <input type="checkbox" v-model="state.additional_info.parking" id="parking">
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Description<span class="text-blue-500">*</span></p>
        <textarea class="border w-full max-w-filterVw min-h-mn max-h-screen p-2 whitespace-pre-wrap sm:w-full sm:max-w-full sm:h-32" placeholder="Describe your product, more details = more clients!"
                  v-model="state.description"/>
        <p v-if="v$.description.$error" class="error">{{ v$.description.$errors[0].$message }}</p>
        <p class="text-gray-500">Chars left: {{ countChars }}</p>
      </div>


      <div>
        <DropZone @drop.prevent="drop" @change="selectedFiles"/>
        <span class="text-2xl block mt-2">Files: {{ state.images.length }}</span>
      </div>


      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" :style="{'width': (progress * 100).toFixed(1) + '%'} ">{{(progress * 100).toFixed(1)
          }}%</div>
      </div>

      <div v-if="state.images.length > 0" class="flex flex-wrap justify-center">
        <div v-for="(img, i) in state.images"
             :key="img" class="relative">
          <img :src="img"
               alt="photo of house"
               @click="setMainPhotoHouse"
               ref="img"
               class="w-52 my-2 h-36 object-cover cursor-pointer mx-4"
               :class="img === data.main_photo ? 'main' : ''"
          >
          <div class="bg-white w-5 h-5 flex items-center justify-center rounded-full absolute top-5 right-6 cursor-pointer" v-if="state.images.length > 3" @click="removeImages(img, i)">
            <i class="fa-solid fa-xmark text-xl"></i>
          </div>

        </div>
      </div>

      <p v-if="v$.images.$error" class="error">Must be at least 3 images.</p>
      <p v-if="v$.main_photo.$error" class="error">You must set a main photo (click on photo that you want to be your main photo)</p>
      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Contact details<span class="text-blue-500">*</span></p>
        <div class="flex flex-col mt-4">
          <label>Your name:<span class="text-blue-500">*</span></label>
          <div class="flex items-center">
            <input type="text" placeholder="John Smith..." class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.contact_details.name" :maxlength="maxInputLength">
            <p class="ml-2 text-gray-500" :class="state.contact_details.name.length >= maxInputLength - 5 ? 'text-red-500' : ''">{{ state.contact_details.name.length }}/{{ maxInputLength }}</p>
          </div>
          <p v-if="v$.contact_details.name.$error" class="error">This field cannot be empty.</p>
        </div>
        <div class="flex flex-col mt-4">
          <label>Your Email:<span class="text-blue-500">*</span></label>
          <div class="flex items-center">
            <input type="email" placeholder="john.smith@web.com" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.contact_details.email" :maxlength="maxInputLength">
            <p class="ml-2 text-gray-500" :class="state.contact_details.email.length >= maxInputLength - 5 ? 'text-red-500' : ''">{{ state.contact_details.email.length }}/{{ maxInputLength }}</p>
          </div>
          <p v-if="v$.contact_details.email.$error" class="error">{{ v$.contact_details.email.$errors[0].$message }}</p>
        </div>
        <div class="flex flex-col mt-4">
          <label>Phone number:<span class="text-blue-500">*</span></label>
          <input type="number" placeholder="123 456 789" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.contact_details.phone">
          <p v-if="v$.contact_details.phone.$error" class="error">{{ v$.contact_details.phone.$errors[0].$message }}</p>
        </div>
      </div>
      <div class="mt-4 bg-white px-2 rounded shadow py-2 flex justify-between">
        <MainButton class="text-white bg-gray-900" @click="cancelCreate">Cancel</MainButton>
        <MainButton class="text-white bg-gray-900" @click="submitCreatePost">Add Announcement
        </MainButton>
      </div>
    </div>
  </div>
</template>

<script>
import useSelectChooseTerm from "@/composables/selectItems";
import useAddPost from '@/composables/createPost'
import {onMounted, ref, watchEffect, onBeforeMount} from "vue";
import useBaseElements from "@/composables/createEditPostBase";
import MainButton from "@/components/buttons/MainButton";
import useVuelidate from '@vuelidate/core'
import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import getUser from "@/composables/getUser";
import DropZone from "@/components/DropZone";
import useUploadFiles from "@/composables/uploadFile";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/config";
import useGetSingleHouse from "@/composables/getSingleHouse";
import deletePost from "@/composables/deletePost";

export default {
  name: "FindHouseAppCreatePost",
  components: {MainButton, DropZone},
  setup() {
    const {selectedTerm, chooseSearchTerms, show} = useSelectChooseTerm();
    const {addPost, isPending} = useAddPost();
    const {uploadFiles, temp_links, progress} = useUploadFiles();
    const {searchTerms, state, rules, countChars, setMainPhoto, removeImages} = useBaseElements()
    const {data, getSingleHouse, error} = useGetSingleHouse()
    const {user} = getUser();

    const maxInputLength = ref(25);
    const description = ref('');
    const category = ref('');
    const quality = ref('');
    const owner = ref('');
    const router = useRouter();
    const images = ref('');
    const img = ref();
    const route = useRoute();
    const temp_img = ref([])
    const uploadDone = ref(false);

    onBeforeMount(async () => {
      await getSingleHouse("post_archived", route.params.id)
      if (data.value === undefined && error.value === 'Something went wrong' || data.value.author.id !== user.value.uid) {
        await router.push({name: 'not-found'});
      }
    });

    onMounted(async () => {
      category.value = selectedTerm(searchTerms.value);
      quality.value = 'Used'
      owner.value = 'Private';
    });

    watchEffect( () => {
      if (searchTerms.value) {
        category.value = selectedTerm(searchTerms.value);
      }
    })

    const drop = async (e) => {
      images.value = e.dataTransfer.files;
      await uploadImages()
    }

    const uploadImages = async () => {
      await uploadFiles(images.value, route.params.id, isPending, uploadDone, temp_img, images.value.length, user.value.uid);
      const tempDoc = doc(db, "post_archived", route.params.id)
      state.images = temp_links.value


      watchEffect(async () => {
        if (state.images) {
          await updateDoc(tempDoc, {
            images: state.images
          })
        }
      })
      images.value = '';
    }


    const selectedFiles = async () => {
      images.value = document.querySelector(".dropzoneFile").files;
      await uploadImages()
    }

    const cancelCreate = async () => {
      await deletePost("post_archived", route.params.id)
      await router.push({name: 'find-house'})
    }

    const setMainPhotoHouse = (e) => {
      setMainPhoto(e, img)
    }

    onBeforeRouteLeave(async (to, from, next) => {
      await deletePost("post_archived", route.params.id)
      next()
    });


    const submitCreatePost = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return;
      await addPost(state, category.value.term, quality.value, owner.value, user, state.images, state.main_photo);
      v$.value.$reset();

      category.value.term = ''
      quality.value = ''
      owner.value = ''
      images.value = ''
      state.value = null;

      await cancelCreate();
    }
    const v$ = useVuelidate(rules, state)


    return {
      searchTerms,
      show,
      chooseSearchTerms,
      category,
      description,
      countChars,
      state,
      addPost,
      quality,
      owner,
      submitCreatePost,
      v$,
      cancelCreate,
      images,
      drop,
      selectedFiles,
      maxInputLength,
      uploadImages,
      data, user, img, setMainPhotoHouse, removeImages, progress
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #3C82F6;
  color: white;
}

.main {
  border: 8px dotted #3C82F6;
}
</style>