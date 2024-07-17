<template>
  <div class="navbar-wrapper">
    <div class="header-container">
      <div class="logo-container">
        <a href="/">
          <img class="logo" src="/images/nano.jpg" alt="nano"/>
        </a>
      </div>
      <div class="content">
        <VpNavbarMenu class="menu"/>
        <VpNavbarThemeToggle class="theme-toggle"/>
        <VpNavbarSocialLinks class="social-links"/>
        <VpNavbarHamburger class="hamburger" :active="smallerThanMd" @click="$emit('toggle')"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VpNavbarMenu from "~/components/navbar/vp-menu.vue";
import VpNavbarThemeToggle from "~/components/navbar/vp-theme-toggle.vue";
import VpNavbarSocialLinks from "~/components/navbar/vp-social-links.vue";
import VpNavbarHamburger from "~/components/navbar/vp-hamburger.vue";

defineProps<{
  smallerThanMd: boolean
}>()

defineEmits<{
  toggle: []
}>()

</script>
<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);
  > a {
    height: 28px;
    width: 128px;
  }
  .logo {
    position: relative;
    height: 100%;
  }
}
.dark {
  .logo {
    filter: drop-shadow(2px 2px 6px #409eff);
  }
}
</style>
