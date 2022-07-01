<template>
  <div class="benefits sm:px-4 sm:flex sm:justify-center lg:mt-10">
    <img :src="require('../../../assets/buildings/house_3.jpg')" alt="luxury building"
         class="max-w-2xl w-full h-96 object-cover lg:h-full">
    <div class="benefits_info_wrapper m-4 lg:mx-10">
      <div class="benefit -translate-x-10 opacity-0">
        <i
            class="fa-solid fa-credit-card relative text-cyan-400 text-2xl"></i>
        <p class="font-bold text-2xl pt-3 lg:text-3xl">Easy Payment Method</p>
        <p class="text-gray-500 max-w-lg">We offer easy payment method for you this will be alow
          yours
          taxes pay more
          conveniently.</p>
      </div>
      <div class="benefit mt-5  opacity-0 -translate-x-10 sm:mt-10 lg:mt-40">
        <i class="fa-solid fa-house-crack relative text-cyan-400 text-2xl"></i>
        <p class="font-bold text-2xl pt-3 lg:text-3xl">Property Insurance</p>
        <p class="text-gray-500 max-w-lg">We protect you against all future hazards free of charge
          you by providing you
          with
          insurance.</p>
      </div>
      <div class="benefit mt-5 opacity-0 -translate-x-10 sm:mt-10 lg:mt-40">
        <i class="fa-solid fa-money-bill relative text-cyan-400 text-2xl"></i>
        <p class="font-bold text-2xl pt-3 lg:text-3xl">Tax Advantage</p>
        <p class="text-gray-500 max-w-lg">When you buy your house, we cover some of the annual taxes you have to
          pay.</p>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {onMounted} from "vue";
export default {
  name: "SecondPageBenefits",
  setup() {
    gsap.registerPlugin(ScrollTrigger);


    onMounted(() => {
      gsap.to('.benefit:nth-child(1)', {
        scrollTrigger: ".benefit",
        x: 0,
        opacity: 1,
        delay: 0.3
      })
      gsap.to('.benefit:nth-child(2)', {
        scrollTrigger: ".benefit:nth-child(2)",
        x: 0,
        opacity: 1,
        delay: 0.3,
      })
      gsap.to('.benefit:nth-child(3)', {
        scrollTrigger: ".benefit:nth-child(3)",
        x: 0,
        opacity: 1,
        delay: 0.3,
      })
    })

  }
}
</script>

<style scoped>
.benefit i::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: cyan;
  opacity: .3;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  z-index: -1;
}
</style>