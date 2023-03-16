<template>
    <div>
        歌曲管理
    </div>
</template>

<script>
    export default {
        name: 'Song',
        created () {
            console.log(this.$route.query);
        },
    }
</script>

<style scoped>

</style>