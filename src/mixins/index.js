export const mixins = {
    methods: {
        notify(title, type = "success") {
            this.$notify({
                title,
                type
            })
        },
        /**根据相对地址获取绝对地址 */
        getUrl(url) {
            return `${this.$store.state.HOST + url}`
        },
        /**获取中文性别 */
        changeSex(vaule) {
            let sexArr = ['女', '男', '组合', '不明']
            if (vaule - 1 <= sexArr.length) {
                return sexArr[vaule]
            } else {
                return vaule
            }
        },
        /**获取生日 */
        arrachBirth(value) {
            return String(value).substring(0, 10)
        },
        /**上传图片之前的校验 */
        beforeAvatorUpload(file) {
            const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
            if (!isJPG) {
                this.$message.error('上传的图片只能是jpeg或者png格式')
                return false
            }
            const isLt2M = (file.size / 1024 / 1024) < 2
            if (!isLt2M) {
                this.$message.error('上传的图片大小不能超过2M')
                return false
            }
            return true
        },
        /**上传图片成功后的操作 */
        handleAvatorSuccess(data) {
            if (data.code == 200) {
                this.getData()
                this.notify(data.msg)
            } else {
                this.notify(data.msg, "error")
            }
        },
        /**多选事件，将选择的赋值给multipleSelection */
        handleSelectionChange(val) {
            this.multipleSelection = val.map((item) => item.id)
        },
    },
}