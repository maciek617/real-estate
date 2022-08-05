<template>
  <div class="bg-gray-50">
    <div class="mt-20 px-2 max-w-7xl m-auto pb-5">
      <h1 class="text-2xl text-blue-500">Add an announcement</h1>

      <div class="mt-5 bg-white px-2 rounded shadow py-2">
        <p class="text-xl">The more details, the better!</p>

        <div class="flex flex-col mt-2">
          <label>Ad title<span class="text-blue-500">*</span></label>
          <input type="text" placeholder="Ad title..." class="max-w-filterVw p-2 border" v-model="state.title">
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
          <input type="checkbox" class="mr-2" v-model="state.price.isNegotiable">
          <label>Price is negotiable</label>
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Location<span class="text-blue-500">*</span></p>
        <input type="text" placeholder="New York City, US" class="w-full max-w-filterVw p-2 border" v-model="state.location">
        <p v-if="v$.location.$error" class="error">This field cannot be empty.</p>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Quality<span class="text-blue-500">*</span></p>

        <div class="flex justify-around my-4 max-w-filterVw">
          <p v-for="box in arrayBox[0]" :key="box" class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" :class="box.select ? 'selected' : ''"
             @click="[selectBox(arrayBox[0], box), quality = box.title]">
            {{ box.title }}</p>
        </div>

        <p>Private or company<span class="text-blue-500">*</span></p>

        <div class="flex justify-around my-4 max-w-filterVw">
          <p v-for="box in arrayBox[1]" :key="box" class="bg-blue-200 w-32 text-center py-1 rounded cursor-pointer hover:bg-blue-300" :class="box.select ? 'selected' : ''"
             @click="[selectBox(arrayBox[1], box), owner = box.title]">
            {{ box.title }}</p>
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
          <label class="mr-5">Balcony</label>
          <input type="checkbox" v-model="state.additional_info.balcony">
        </div>
        <div class="flex flex-row items-center mt-2">
          <label class="mr-5">Garden</label>
          <input type="checkbox" v-model="state.additional_info.garden">
        </div>
        <div class="flex flex-row items-center mt-2">
          <label class="mr-5">Parking space</label>
          <input type="checkbox" v-model="state.additional_info.parking">
        </div>
      </div>

      <div class="mt-4 bg-white px-2 rounded shadow py-2">
        <p>Description<span class="text-blue-500">*</span></p>
        <textarea class="border w-full max-w-filterVw min-h-mn max-h-screen p-2 whitespace-pre-wrap sm:w-full sm:max-w-full sm:h-32" placeholder="Describe your product, more details = more clients!"
                  v-model="state.description"/>
        <p v-if="v$.description.$error" class="error">This field cannot be empty.</p>
        <p class="text-gray-500">Chars left: {{ countChars }}</p>
      </div>


      <div>
        <label for="profile_pic">Choose file to upload</label>
        <input type="file" accept=".jpg, .jpeg, .png" multiple @change="previewFiles">
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
      <div class="mt-4 bg-white px-2 rounded shadow py-2 flex justify-between">
        <MainButton class="text-white bg-gray-900" @click="cancelCreate">Cancel</MainButton>
        {{isPending}}
        <MainButton class="text-white bg-gray-900" @click="submitCreatePost" data-md-ripple="true">Add Announcement
        </MainButton>
      </div>
    </div>
  </div>

</template>

<script>
import useSelectChooseTerm from "@/composables/selectItems";
import useAddPost from '@/composables/createPost'
import {computed, onMounted, reactive, ref, watchEffect} from "vue";
import MainButton from "@/components/buttons/MainButton";
import {required, email, minValue} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import {useRouter} from "vue-router";
import getUser from "@/composables/getUser";
export default {

  name: "FindHouseAppCreatePost",
  components: {MainButton},
  setup() {
    const {selectedTerm, chooseSearchTerms, show} = useSelectChooseTerm();
    const {addPost, isPending} = useAddPost()
    const description = ref('');
    const {user} = getUser()
    const searchTerms = ref([
      {
        term: "All Summerhouse",
        selected: false,
      },
      {
        term: "All Apartment",
        selected: false,
      },
      {
        term: "All Mansion",
        selected: false,
      },
      {
        term: "All Penthouse",
        selected: false,
      },
      {
        term: "All Flat",
        selected: false,
      },
      {
        term: "All House",
        selected: true,
      }
    ]);
    const category = ref('');
    const quality = ref('');
    const owner = ref('');
    const router = useRouter();
    const images = ref('');

    onMounted(() => {
      category.value = selectedTerm(searchTerms.value);
      quality.value = 'Used'
      owner.value = 'Private'
    });

    watchEffect(() => {
      if (searchTerms.value) {
        category.value = selectedTerm(searchTerms.value);
      }
    })


    const countChars = computed(() => {
      return 5000 - state.description.length
    })

    const state = reactive({
      title: '',
      price: {
        isNegotiable: false,
        price: ''
      },
      location: '',
      basic_info: {
        surface: '',
        rooms: '',
        bathrooms: '',
        floor_: '',
        heating: ''
      },
      additional_info: {
        balcony: false,
        garden: false,
        parking: false,
      },
      description: '',
      contact_details: {
        name: '',
        email: '',
        phone: ''
      }
    })


    const arrayBox = ref([[{
      title: 'Used',
      select: true
    },
      {
        title: 'New',
        select: false
      }], [
      {
        title: 'Private',
        select: true
      },
      {
        title: 'Company',
        select: false
      }
    ]]);

    const selectBox = (array, box) => {
      array.forEach(arr => arr.select = false)
      box.select = true;
    }

    const rules = computed(() => {
      return {
        title: {required},
        price: {
          price: {required, minValue: minValue(0)}
        },
        location: {required},
        basic_info: {
          surface: {required, minValue: minValue(0)},
          rooms: {required, minValue: minValue(0)},
          bathrooms: {required, minValue: minValue(0)},
          floor_: {required, minValue: minValue(-2)},
          heating: {required}
        },
        description: {required},
        contact_details: {
          name: {required},
          email: {required, email},
          phone: {required, minValue: minValue(0)}
        }
      }
    })

    const previewFiles = (event) => {
      images.value = event.target.files
    }


    // If no error push to main app
    const cancelCreate = () => {
      router.push({name: 'find-house'})
    }


    const submitCreatePost = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return;
      v$.value.$reset()
      await addPost(state, category.value.term, quality.value, owner.value, images.value, images.value.length, user)

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
      arrayBox,
      selectBox,
      quality,
      owner,
      submitCreatePost,
      v$,
      cancelCreate,
      images,
      previewFiles,
      isPending
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #3C82F6;
  color: white;
}
</style>