import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        HOST: 'http://127.0.0.1:8888',
        // 播放器的公用属性
        isPlay: false,  // 是否播放中
        url: '',        // 播放的地址
        songId: '',     // 歌曲id
    },
    getters: {
        isPlay: state => state.isPlay,
        url: state => state.url,
        songId: state => state.songId
    },
    mutations: {
        setIsPlay: (state, isPlay) => { state.isPlay = isPlay },
        setUrl: (state, url) => { state.url = url },
        setSongId: (state, songId) => { state.songId = songId }
    }
})

export default store