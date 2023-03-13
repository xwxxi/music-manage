export const mixins = {
    methods: {
        notify(title, type = "success") {
            this.$notify({
                title,
                type
            })
        },
        // 根据相对地址获取绝对地址
        getUrl(url) {
            return `${this.$store.state.HOST + url}`
        },
        // 获取中文性别
        changeSex(vaule) {
            let sexArr = ['女', '男', '组合', '不明']
            if (vaule - 1 <= sexArr.length) {
                return sexArr[vaule]
            } else {
                return vaule
            }
        },
        // 获取生日
        arrachBirth(value){
            return String(value).substring(0,10)
        }
    },
}