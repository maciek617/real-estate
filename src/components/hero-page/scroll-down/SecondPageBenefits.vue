<template>
  <div class="benefits sm:px-4 sm:flex sm:justify-center lg:mt-10">
    <img :src="require('../../../assets/buildings/house_3.jpg')" alt="luxury building"
         class="max-w-xl w-full h-96 object-cover lg:h-full">
    <div class="benefits_info_wrapper m-4 lg:mx-10">
      <div class="benefit">
        <i
            class="fa-solid fa-credit-card relative text-cyan-400 text-2xl"></i>
        <p class="font-bold text-2xl pt-3 lg:text-3xl">Easy Payment Method</p>
        <p class="text-gray-500 max-w-lg">We offer easy payment method for you this will be alow
          yours
          taxes pay more
          conveniently.</p>
      </div>
      <div class="benefit mt-5 sm:mt-10 lg:mt-40">
        <i class="fa-solid fa-house-crack relative text-cyan-400 text-2xl"></i>
        <p class="font-bold text-2xl pt-3 lg:text-3xl">Property Insurance</p>
        <p class="text-gray-500 max-w-lg">We protect you against all future hazards free of charge
          you by providing you
          with
          insurance.</p>
      </div>
      <div class="benefit mt-5 sm:mt-10 lg:mt-40">
        <i class="fa-solid fa-money-bill relative text-cyan-400 text-2xl"></i>
        <p class="font-bold text-2xl pt-3 lg:text-3xl">Tax Advantage</p>
        <p class="text-gray-500 max-w-lg">When you buy your house, we cover some of the annual taxes you have to pay.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondPageBenefits"
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