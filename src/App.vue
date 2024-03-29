<template>
  <MainNav class="w-full"/>
  <router-view v-slot="{Component, route}">
    <transition name="route" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
  <ScrollTopButon/>
  <FooterView/>
  <CookiesInfo v-if="showCookies" @accepted="acceptCookies" @declined="declineCookies"/>
</template>
<script>
import MainNav from "@/components/navigation/MainNav";
import FooterView from "@/components/footer/FooterView";
import CookiesInfo from "@/components/cookies/CookiesInfo";
import ScrollTopButon from "@/components/buttons/ScrollTopButon";
import ToastModal from "@/components/modals/ToastModal";
import {useCookies} from 'vue3-cookies';
import {useStore} from "vuex";
import {onMounted, ref, watch, watchEffect} from 'vue';
import {useRoute} from "vue-router";
import scrollToTop from "@/composables/scrollTop";

export default {
  components: {MainNav, FooterView, ScrollTopButon, ToastModal, CookiesInfo},
  setup() {
    const showCookies = ref(true);
    const store = useStore()
    const {cookies} = useCookies()
    const route = useRoute();

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

    watchEffect(() => {
      if (route.path) {
        scrollToTop();
        store.state.showNav = false;
      }
    })

    watch(() => route.path, (newPath) => {
      if(!newPath.includes('/app')) {
        store.state.searchLocationTerm = '';
        store.state.price = 999999999999
      }
    })

    return {cookies, showCookies, acceptCookies, declineCookies, store}
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