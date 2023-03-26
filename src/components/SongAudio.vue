<template>
  <div class="song-audio">
    <audio type="audio/mpeg" id="player" :src="url" controls="controls" preload="true" @canplay="startPlay" @ended="ended"></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "song-audio",
  computed: {
    ...mapGetters(["id", "url", "isPlay"]),
  },
  watch: {
    // 监听播放还是暂停
    isPlay() {
      this.togglePlay()
    },
  },
  methods: {
    /**获取到链接后准播放 */
    startPlay() {
      let player = document.querySelector("#player")
      // 开始播放的方法
      player.play()
    },

    /**播放完成后触发 */
    ended() {
      this.isPlay = false
    },

    /**暂停播放和开始播放 */
    togglePlay() {
      let player = document.querySelector("#player")
      if (this.isPlay) {
        player.play()
      } else {
        player.pause()
      }
    },
  },
}
</script>

<style scoped>
.song-audio {
  display: none;
}
</style>