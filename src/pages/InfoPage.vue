<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{ consumerCount }}</div>
                            <div>用户总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{ songCount }}</div>
                            <div>歌曲总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{ singerCount }}</div>
                            <div>歌手总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{ songListCount }}</div>
                            <div>歌单总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getDataCount } from "@/api/api.js"
export default {
    name: "Info",
    data() {
        return {
            consumerCount: 0, //用户总数
            songCount: 0, // 歌曲总数
            singerCount: 0, // 歌手总数
            songListCount: 0, // 歌单总数
        }
    },
    created() {
        this.getData()
    },
    methods: {
        // 获取页面信息
        async getData() {
            let data = await getDataCount()
            this.consumerCount = data.consumerCount
            this.songCount = data.songCount
            this.singerCount = data.singerCount
            this.songListCount = data.songListCount
        },
    },
}
</script>

<style scoped>
.grid-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}
.grid-cont-center {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: darkcyan;
}
.grid-num {
    font-size: 30px;
    font-weight: bold;
}
</style>