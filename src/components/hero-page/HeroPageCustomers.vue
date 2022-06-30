<template>
  <div class="customer_wrapper bg-cyan-50 relative">
    <div class="customer_opinion max-w-screen-2xl m-auto mt-10">
      <h1 class="text-center p-4 font-bold text-2xl sm:text-3xl lg:text-4xl">What Our Customers Say About
        Us</h1>
      <div class="opinion_box mt-8 lg:mt-14">
        <img :src="currOpinion.img" alt="picture of client"
             class="w-24 h-24 object-cover rounded-full block m-auto border-cyan-500 border-2">
        <p class="text-gray-500 text-center p-4 max-w-2xl m-auto block h-52 sm:h-40 lg:h-36">{{ currOpinion.opinion
          }}</p>
        <p class="text-center font-bold text-xl">{{ currOpinion.name }}</p>
      </div>
      <div class="pictures_box flex flex-wrap justify-center mt-6">
        <img :src="img.img" alt="profile picture of our customer" v-for="(img, i) in opinionBase" :key="img.id"
             class="w-14 h-14 object-cover rounded-full m-4 cursor-pointer" :id="i"
             @click="getCurrOpinion">
      </div>
    </div>
  </div>


</template>
<script>
import {ref} from "vue";

export default {
  name: "HeroPageCustomers",
  setup() {
    const opinionBase = ref([
      {
        id: '0',
        name: 'Crisitina Ozweego',
        opinion:
            'FindState is a modern architecture and design firm that specializes in residential and commercial architecture, interior design, and urban planning. We believe that the best buildings, spaces, and cities are made for people.',
        img: require('../../assets/profile-pictures/profile1.jpg')
      },
      {
        id: '1',
        name: 'Scott Blur',
        opinion:
            'FindState is a revolutionary new search engine that helps users find their dream home. It\'s a beautiful, modern, and sleek search engine with features like our advanced search, lists of Modern Buildings and Modern Houses, and maps that help you find your new property.',
        img: require('../../assets/profile-pictures/profile2.jpg')
      },
      {
        id: '2',
        name: 'Camillo Cabella',
        opinion:
            'Finding the perfect home for your lifestyle has never been easier. FindState is a modern mapping solution that allows you to explore your desired location and find the perfect home with just a click of a button.',
        img: require('../../assets/profile-pictures/profile3.jpg')
      },
      {
        id: '3',
        name: 'Eduard Moora',
        opinion:
            'FindState is a modern real estate platform where you can find the best state of the art houses and buildings. You can also apply to buy or rent them.',
        img: require('../../assets/profile-pictures/profile4.jpg')
      },
      {
        id: '4',
        name: 'Unknown Brain',
        opinion:
            'Seasoned builders, homebuyers and people on the lookout for their new home can use our state-of-the-art search to find the perfect modern building, house or estate in minutes.',
        img: require('../../assets/profile-pictures/profile5.jpg')
      }, {
        id: '5',
        name: 'Carlo Rossie',
        opinion:
            'FindState is the easiest way to find modern homes and buildings. We help you find the perfect property based on your needs and preferences.',
        img: require('../../assets/profile-pictures/profile6.jpg')
      }
    ]);
    const currOpinion = ref({
      id: '0',
      name: 'Crisitina Ozweego',
      opinion:
          'FindState is a modern architecture and design firm that specializes in residential and commercial architecture, interior design, and urban planning. We believe that the best buildings, spaces, and cities are made for people.',
      img: require('../../assets/profile-pictures/profile1.jpg')
    });

    const getCurrOpinion = (id) => {
      currOpinion.value = opinionBase.value.find(opinion => opinion.id === id.target.id)
    }

    return {opinionBase, getCurrOpinion, currOpinion}
  }
}
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .pictures_box img:nth-child(1) {
    position: absolute;
    top: 17%;
    left: 10%;
  }

  .pictures_box img:nth-child(2) {
    position: absolute;
    top: 35%;
    left: 8%;
  }

  .pictures_box img:nth-child(3) {
    position: absolute;
    top: 53%;
    left: 10%;
  }

  .pictures_box img:nth-child(4) {
    position: absolute;
    top: 17%;
    right: 10%;
  }

  .pictures_box img:nth-child(5) {
    position: absolute;
    top: 35%;
    right: 8%;
  }

  .pictures_box img:nth-child(6) {
    position: absolute;
    top: 53%;
    right: 10%;
  }
}
@media screen and (min-width: 1700px) {
  .pictures_box img:nth-child(1) {
    left: 22%;
  }

  .pictures_box img:nth-child(2) {
    left: 20%;
  }

  .pictures_box img:nth-child(3) {
    left: 22%;
  }

  .pictures_box img:nth-child(4) {
    right: 22%;
  }

  .pictures_box img:nth-child(5) {
    right: 20%;
  }

  .pictures_box img:nth-child(6) {
    right: 22%;
  }
}
@media screen and (min-width: 2200px) {
  .pictures_box img:nth-child(1) {
    left: 26%;
  }

  .pictures_box img:nth-child(2) {
    left: 24%;
  }

  .pictures_box img:nth-child(3) {
    left: 26%;
  }

  .pictures_box img:nth-child(4) {
    right: 26%;
  }

  .pictures_box img:nth-child(5) {
    right: 24%;
  }

  .pictures_box img:nth-child(6) {
    right: 26%;
  }
}
</style>