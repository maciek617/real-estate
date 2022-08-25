<template>
  <div class="bg-gray-50" v-if="data">
    <div class="mt-20 px-2 max-w-7xl m-auto pb-5" v-if="data.author.id === user.uid">
      <h1 class="text-2xl text-blue-500">Edit an announcement</h1>

      <div class="mt-5 bg-white px-2 rounded shadow py-2">
        <p class="text-xl">The more details, the better!</p>

        <div class="flex flex-col mt-2">
          <label>Edit title<span class="text-blue-500">*</span></label>
          <input type="text" placeholder="Edit title..." class="max-w-filterVw p-2 border" v-model="state.title">
          <p v-if="v$.title.$error" class="error">This field cannot be empty.</p>
        </div>

        <div class="mt-4">
          <label @click="show = !show" class="text-xl cursor-pointer">Category: <span class="font-bold text-blue-500">{{ category.term ? category.term.toString().replace('All', '') :
              category.toString().replace('All', '') }}
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
        <p>Edit price<span class="text-blue-500">*</span></p>
        <input type="number" placeholder="9999999$" class="w-full max-w-filterVw p-2 border" v-model="state.price.price">
        <p v-if="v$.price.$error" class="error">{{ v$.price.$errors[0].$message }}</p>
        <div class="mt-2 flex flex-row items-center">
          <input type="checkbox" class="mr-2" v-model="state.price.isNegotiable">
          <label>Price is negotiable</label>
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Edit location<span class="text-blue-500">*</span></p>
        <input type="text" placeholder="New York City, US" class="w-full max-w-filterVw p-2 border" v-model="state.location">
        <p v-if="v$.location.$error" class="error">This field cannot be empty.</p>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Edit quality<span class="text-blue-500">*</span></p>

        <div class="flex justify-around my-4 max-w-filterVw">
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="quality = 'Used'" :class="quality === 'Used' ? 'selected' : '' ">Used</p>
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="quality = 'New'" :class="quality === 'New' ? 'selected' : '' ">New</p>
        </div>

        <p>Edit private or company<span class="text-blue-500">*</span></p>

        <div class="flex justify-around my-4 max-w-filterVw">
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="owner = 'Private'" :class="owner === 'Private' ? 'selected' : '' ">Private</p>
          <p class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" @click="owner = 'Company'" :class="owner === 'Company' ? 'selected' : '' ">Company</p>
        </div>
      </div>
      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <div class="lg:flex lg:items-center lg:justify-around">

          <div class="flex flex-col mt-2">
            <label>Edit Surface<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="100m2" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.surface">
            <p v-if="v$.basic_info.surface.$error" class="error max-w-err">{{ v$.basic_info.surface.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Edit Rooms<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="4" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.rooms">
            <p v-if="v$.basic_info.rooms.$error" class="error max-w-err">{{ v$.basic_info.rooms.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Edit Bathrooms<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="2" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.bathrooms">
            <p v-if="v$.basic_info.bathrooms.$error" class="error max-w-err">{{ v$.basic_info.bathrooms.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Edit Floor<span class="text-blue-500">*</span></label>
            <input type="number" placeholder="10" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.floor_">
            <p v-if="v$.basic_info.floor_.$error" class="error max-w-err">{{ v$.basic_info.floor_.$errors[0].$message }}</p>
          </div>
          <div class="flex flex-col mt-2">
            <label>Edit Heating<span class="text-blue-500">*</span></label>
            <input type="text" placeholder="gas" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.basic_info.heating">
            <p v-if="v$.basic_info.heating.$error" class="error max-w-err">Value is required.</p>
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Additional information<span class="text-blue-500">*</span></p>
        <div class="flex flex-row items-center mt-2">
          <label class="mr-5">Edit balcony</label>
          <input type="checkbox" v-model="state.additional_info.balcony">
        </div>
        <div class="flex flex-row items-center mt-2">
          <label class="mr-5">Edit garden</label>
          <input type="checkbox" v-model="state.additional_info.garden">
        </div>
        <div class="flex flex-row items-center mt-2">
          <label class="mr-5">Edit parking space</label>
          <input type="checkbox" v-model="state.additional_info.parking">
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Edit description<span class="text-blue-500">*</span></p>
        <textarea class="border w-full  min-h-mn max-h-screen p-2 whitespace-pre-wrap sm:w-full sm:max-w-full sm:h-32" placeholder="Describe your product, more details = more clients!"
                  v-model="state.description"/>
        <p v-if="v$.description.$error" class="error">{{v$.description.$errors[0].$message}}</p>
        <p class="text-gray-500">Chars left: {{ countChars }}</p>
      </div>


      <div>
        <p class="text-blue-500 text-2xl">Images</p>
        <p v-if="state.images.length < 3">You can not remove images if images count is less than 3.</p>
        <p>Click on photo to set it as main photo</p>
        <div class="flex justify-evenly items-center flex-col lg:flex-row lg:flex-wrap">
          <div v-for="(img, i) in state.images" :key="img" class="relative m-2">
            <div>
              <img :src="img"
                   @click="setMainPhotoHouse"
                   ref="img"
                   alt="photo of house"
                   class="w-52 my-2 h-36 object-cover cursor-pointer"
                   :class="img === data.main_photo ? 'main' : ''"
              >
              <div class="bg-white w-5 h-5 flex items-center justify-center rounded-full absolute top-4 right-2 cursor-pointer" v-if="state.images.length > 3" @click="removeImages(img, i)">
                <i class="fa-solid fa-xmark text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <DropZone @drop.prevent="drop" @change="selectedFiles"/>
        <span class="text-2xl block mt-2">Files: {{ images.length }}</span>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Contact details<span class="text-blue-500">*</span></p>
        <div class="flex flex-col mt-4">
          <label>Your name:<span class="text-blue-500">*</span></label>
          <input type="text" placeholder="John Smith..." class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.contact_details.name">
          <p v-if="v$.contact_details.name.$error" class="error">This field cannot be empty.</p>
        </div>
        <div class="flex flex-col mt-4">
          <label>Your Email:<span class="text-blue-500">*</span></label>
          <input type="email" placeholder="john.smith@web.com" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.contact_details.email">
          <p v-if="v$.contact_details.email.$error" class="error">{{ v$.contact_details.email.$errors[0].$message }}</p>
        </div>
        <div class="flex flex-col mt-4">
          <label>Phone number:<span class="text-blue-500">*</span></label>
          <input type="number" placeholder="123 456 789" class="w-full max-w-filterVw p-2 mt-2 border" v-model="state.contact_details.phone">
          <p v-if="v$.contact_details.phone.$error" class="error">{{ v$.contact_details.phone.$errors[0].$message }}</p>
        </div>
      </div>
      <div class="mt-4 bg-red-300 px-2 rounded shadow py-2">
        <p>Delete post</p>
        <MainButton class="text-white bg-gray-900 mt-2" @click="showConfirmModal = !showConfirmModal">Delete Post</MainButton>
      </div>
      <div class="mt-4 bg-white px-2 rounded shadow py-2 flex justify-between">
        <MainButton class="text-white bg-gray-900" @click="cancelCreate">Cancel</MainButton>
        <MainButton class="text-white bg-gray-900" @click="submitCreatePost">Edit Announcement</MainButton>
      </div>
    </div>
  </div>
  <ConfirmDelete v-if="showConfirmModal" @deleteCancel="showConfirmModal = false" @deleteSuccess="deleteP">
    <h1 class="font-bold text-center">Are you sure to delete your post?</h1>
    <p class="text-center">There is no back after confirm.</p>
  </ConfirmDelete>
</template>

<script>
import useGetSingleHouse from "@/composables/getSingleHouse";
import {defineAsyncComponent, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {watch} from "vue";
import getUser from "@/composables/getUser";
import {ref, watchEffect} from "vue";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import useSelectChooseTerm from "@/composables/selectItems";
import MainButton from "@/components/buttons/MainButton";
import updatePost from "@/composables/updatePost";
import deletePost from "@/composables/deletePost";
import DropZone from "@/components/DropZone";
import useUploadFiles from "@/composables/uploadFile";
import useBaseElements from "@/composables/createEditPostBase";

export default {
  name: "EditPosts",
  components: {MainButton, DropZone, ConfirmDelete: defineAsyncComponent(() => import('@/components/modals/ConfirmDeletions'))},
  setup() {
    const {data, error, getSingleHouse} = useGetSingleHouse()
    const {selectedTerm, chooseSearchTerms, show} = useSelectChooseTerm();
    const {uploadFiles} = useUploadFiles()
    const {user} = getUser()
    const route = useRoute();
    const router = useRouter();
    const {searchTerms, state, rules, countChars, setMainPhoto, removeImages} = useBaseElements()
    const quality = ref('');
    const owner = ref('');
    const category = ref('');
    const img = ref()
    const temp_img = ref([])
    const isPending = ref(false);
    const uploadDone = ref(false);
    const showConfirmModal = ref(false);

    const setMainPhotoHouse = (e) => {
      setMainPhoto(e, img)
    }

    onMounted(async () => {
      await getSingleHouse('posts', route.params.id);

      if (data.value.author.id !== user.value.uid) {
        await router.push({name: 'not-found'});
      }
      category.value = data.value.category;
      owner.value = data.value.owner;
      quality.value = data.value.quality;
      state.main_photo = data.value.main_photo;
    })

    watch(() => error.value, (err) => {
      if (err !== '') router.push({name: 'not-found'})
    })

    watchEffect(() => {
      if (searchTerms.value) {
        category.value = selectedTerm(searchTerms.value);
      }
    })

    watchEffect(() => {
      if (data.value) {
        state.title = data.value.title;
        state.price.isNegotiable = data.value.price.isNegotiable;
        state.price.price = data.value.price.price;
        state.location = data.value.location;
        quality.value = data.value.quality;
        owner.value = data.value.owner;
        state.basic_info.surface = data.value.basic_info.surface;
        state.basic_info.rooms = data.value.basic_info.rooms;
        state.basic_info.bathrooms = data.value.basic_info.bathrooms;
        state.basic_info.floor_ = data.value.basic_info.floor_;
        state.basic_info.heating = data.value.basic_info.heating;
        state.additional_info.balcony = data.value.additional_info.balcony;
        state.additional_info.garden = data.value.additional_info.garden;
        state.additional_info.parking = data.value.additional_info.parking;
        state.description = data.value.description;
        state.contact_details.name = data.value.contact_details.name;
        state.contact_details.email = data.value.contact_details.email;
        state.contact_details.phone = data.value.contact_details.phone;
        state.images = data.value.images;
        state.main_photo = data.main_photo;
      }
    })


    const images = ref('')

    const drop = async (e) => {
      images.value = e.dataTransfer.files;
      await uploadImages()
    }

    const selectedFiles = async () => {
      images.value = document.querySelector(".dropzoneFile").files;
      await uploadImages()
    }


    const submitCreatePost = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return;
      await updatePost(route.params.id, state, category.value.term ? category.value.term : category.value, quality.value, owner.value)
      v$.value.$reset();
      await router.push({name: 'find-house'})
    }
    const v$ = useVuelidate(rules, state)

    const cancelCreate = () => {
      router.push({name: 'find-house'})
    }

    const deleteP = () => {
      deletePost("posts", route.params.id)
      showConfirmModal.value = false;
      cancelCreate();
    }

    const uploadImages = async () => {
      await uploadFiles(images.value, route.params.id, isPending, uploadDone, temp_img, images.value.length, user.value.uid);
    }

    watchEffect(() => {
      if (images.value.length > 0 && temp_img.value.length === images.value.length) {
        const temp = temp_img.value
        state.images = state.images.concat(temp);
      }
    })

    watch(
        () => showConfirmModal.value,
        (show) => {
          show ? window.document.body.classList.add('scroll-disabled') : window.document.body.classList.remove('scroll-disabled')
        }
    )


    return {
      data, error, user, route, chooseSearchTerms, submitCreatePost, show, v$, state, category, countChars, cancelCreate, quality,
      owner, searchTerms, deleteP, drop, selectedFiles, images, setMainPhotoHouse, img, removeImages, showConfirmModal
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