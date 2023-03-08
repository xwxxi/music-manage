<template>
  <div>
    <the-header></the-header>
    <the-aside></the-aside>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader"
import TheAside from "@/components/TheAside"
export default {
  name: "Home",
  components: {
    TheHeader,
    TheAside,
  },
}
</script>

<style scoped>
</style>