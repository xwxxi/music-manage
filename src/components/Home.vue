<template>
    <el-container>
        <el-header>
            <the-header></the-header>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <the-aside></the-aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
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
.el-header {
    padding: 0;
    height: auto !important;
}
.el-aside {
    height: 100vh;
    overflow: visible;
}
.el-main {
    padding: 0;
}
</style>