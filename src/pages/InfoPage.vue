<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div>10</div>
                            <div>用户总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Info",
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
</style>