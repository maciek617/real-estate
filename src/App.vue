<template>
  <MainNav/>
  <router-view v-slot="{Component, route}">
    <transition name="route" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
  <FooterView/>
  <CookiesInfo v-if="showCookies" @accepted="acceptCookies" @declined="declineCookies"/>
</template>
<script>
import MainNav from "@/components/navigation/MainNav";
import FooterView from "@/components/footer/FooterView";
import CookiesInfo from "@/components/cookies/CookiesInfo";
import {useCookies} from 'vue3-cookies';
import {onMounted, ref} from 'vue';

export default {
  components: {MainNav, FooterView, CookiesInfo},
  setup() {
    const showCookies = ref(true);
    const {cookies} = useCookies()

    const acceptCookies = () => {
      cookies.set("accept", "true");
      showCookies.value = false;
    }

    const declineCookies = () => {
      showCookies.value = false;
    }

    onMounted(() => {
      let cookie = cookies.get("accept");
      cookie === "true" ? showCookies.value = false : ''
    })

    return {cookies, showCookies, acceptCookies, declineCookies}
  }
}
</script>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all .2s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all .2s ease-in;
}
</style>