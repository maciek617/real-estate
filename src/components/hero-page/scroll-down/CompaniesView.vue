<template>
  <div class="companies text-gray-500 max-w-5xl m-auto text-center flex flex-col items-center justify-evenly sm:flex-row">
    <img :src="require('../../../assets/companies-img/audi.svg')" alt="audi" class="max-w-comp" loading="lazy">
    <img :src="require('../../../assets/companies-img/forbes.svg')" alt="forbes" class="max-w-comp" loading="lazy">
    <img :src="require('../../../assets/companies-img/hugo.svg')" alt="hugo" class="max-w-comp" loading="lazy">
    <img :src="require('../../../assets/companies-img/chanel.svg')" alt="channel" class="max-w-comp" loading="lazy">
  </div>
</template>

<script>
export default {
  name: "CompaniesView"
}
</script>

<style scoped>

</style>