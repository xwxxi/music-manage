<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRouter" :collapse="collapse" background-color="#334256" text-color="#ffffff" active-text-color="#20a0ff" router>
            <template v-for="item in items">
                <template>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span :collapse="collapse">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "@/assets/js/bus.js"
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: "el-icon-s-home",
                    index: "Info",
                    title: "系统首页",
                },
                {
                    icon: "el-icon-user-solid",
                    index: "Consumer",
                    title: "用户管理",
                },
                {
                    icon: "el-icon-s-data",
                    index: "Singer",
                    title: "歌手管理",
                },
                {
                    icon: "el-icon-s-order",
                    index: "SongList",
                    title: "歌单管理",
                },
                {
                    icon: "el-icon-s-opportunity",
                    index: "SongAll",
                    title: "歌曲管理",
                },
            ],
        }
    },
    computed: {
        onRouter() {
            return this.$route.path.replace("/", "")
        },
    },
    created() {
        // 这里使用bus（事件总线）来进行组件间的通信
        bus.$on("collapse", (msg) => {
            this.collapse = msg
        })
    },
}
</script>

<style scoped>
.sidebar {
    display: block;
    background-color: #334256;
    height: 100%;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 150px;
}
.el-menu {
    border: none;
}
/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
    display: none;
}
/*隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
}
</style>