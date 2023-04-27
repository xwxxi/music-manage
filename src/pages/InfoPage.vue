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
        <el-row :gutter="20" class="mgb20">
            <el-col :span="12">
                <h3 class="mgb20">用户性别比例</h3>
                <el-card>
                    <ve-pie :data="consumerSex" :theme="options"></ve-pie>
                </el-card>
            </el-col>
            <el-col :span="12">
                <h3 class="mgb20">歌曲类型分布</h3>
                <el-card>
                    <ve-histogram :data="songListStyle" :theme="options"></ve-histogram>
                </el-card>
            </el-col>
            <el-col :span="12">
                <h3 class="mgb20 mgt20">歌手性别比例</h3>
                <el-card>
                    <ve-pie :data="singerSex"></ve-pie>
                </el-card>
            </el-col>
            <el-col :span="12">
                <h3 class="mgb20 mgt20">歌手地区分布</h3>
                <el-card>
                    <ve-histogram :data="singerLocation"></ve-histogram>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getDataCount, getConsumerSexCount, getAllSongList, getAllSinger } from "@/api/api.js"
export default {
    name: "Info",
    data() {
        return {
            consumerCount: 0, //用户总数
            songCount: 0, // 歌曲总数
            singerCount: 0, // 歌手总数
            songListCount: 0, // 歌单总数

            consumerSex: {
                // 用户性别分布
                columns: ["性别", "总数"],
                rows: [
                    { "性别": "男", "总数": 0 },
                    { "性别": "女", "总数": 0 },
                ],
            },
            options: {
                color: ["#87cefa", "#ffc0cb"],
            },

            songListStyle: {
                // 歌单风格分布
                columns: ["风格", "总数"],
                rows: [],
            },

            singerSex: {
                // 歌手性别分布
                columns: ["性别", "总数"],
                rows: [
                    { "性别": "女", "总数": 0 },
                    { "性别": "男", "总数": 0 },
                    { "性别": "组合", "总数": 0 },
                    { "性别": "其他", "总数": 0 },
                ],
            },

            singerLocation: {
                // 歌手地区分布
                columns: ["地区", "总数"],
                rows: [],
            },
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

            let sexCount = await getConsumerSexCount()
            this.consumerSex.rows[0]["总数"] = sexCount.maleCount
            this.consumerSex.rows[1]["总数"] = sexCount.womanCount

            let songLists = await getAllSongList()
            let styleObj = {}
            songLists.msg.forEach((item) => {
                if (styleObj.hasOwnProperty(item.style)) {
                    styleObj[item.style]++
                } else {
                    this.$set(styleObj, item.style, 1)
                }
            })

            this.getByStyle(styleObj)
            this.getSingerSexCount()
            console.log(this.singerLocation);
        },

        // 获取歌单风格
        getByStyle(styleObj) {
            for (const key in styleObj) {
                if (Object.hasOwnProperty.call(styleObj, key)) {
                    let temObj = { "风格": key, "总数": styleObj[key] }
                    this.songListStyle.rows.push(temObj)
                }
            }
        },

        // 获取歌手地区
        getByLocation(locationObj) {
            for (const key in locationObj) {
                if (Object.hasOwnProperty.call(locationObj, key)) {
                    let temObj = { "地区": key, "总数": locationObj[key] }
                    this.singerLocation.rows.push(temObj)
                }
            }
        },

        // 获取歌手性别、地区数据统计
        async getSingerSexCount() {
            let locationObj = {}
            let singerLists = await getAllSinger()
            for (const iterator of singerLists.msg) {
                this.singerSex.rows[iterator.sex]["总数"]++
                if (locationObj.hasOwnProperty(iterator.location)) {
                    locationObj[iterator.location]++
                } else {
                    this.$set(locationObj, iterator.location, 1)
                }
            }
            console.log(locationObj);
            this.getByLocation(locationObj)
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