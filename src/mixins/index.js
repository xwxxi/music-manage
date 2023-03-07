export const mixins = {
    methods: {
        notify(title,type="success"){
            this.$notify({
                title,
                type
            })
        }
    },
}