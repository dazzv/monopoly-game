<template>
  <main>
    <game-settings v-if="!started"/>
    <game-board v-else/>
    <players-info  v-show="started"/>
    <players-cards-info v-if="playersCardsInfo"/>
    <game-over v-show="gameOver"></game-over>
    <game-rules v-show="true"></game-rules>
    <div v-show="isMobilePortret" class="warning">
      <h4>Уважаемый пользователь!</h4>
      <p>Вы пытаетесь открыть игру с мобильного телефона</p>
      <p>Мы настоятельно рекомендуем вам запускать игру в альбомном режиме</p>
        <button @click="close">ОК</button>
    </div>
  </main>
</template>

<script>
import gameBoard from './components/game-board.vue'
import gameSettings from './components/game-settings.vue'
import playersInfo from './components/players-info.vue'
import playersCardsInfo from './components/players-cards-info.vue'
import gameOver from './components/game-over.vue'
import gameRules from './components/game-rules.vue'

import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      isMobilePortret: false
    }
  },
  components: {
    gameBoard,
    gameSettings,
    playersInfo,
    playersCardsInfo,
    gameOver,
    gameRules,
  },

  computed: {
    ...mapGetters({
      started: 'started',
      playersCardsInfo: 'playersCardsInfo',
      gameOver: 'gameOver',
    })
  },

  methods: {
    close(){
      this.isMobilePortret = false
    }
  },
  mounted() {
    if(window.orientation == 0){
      this.isMobilePortret = true
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

#app {
  font-family: "Oswald", sans-serif;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 500;
  text-align: center;
  color: #14161f;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  
  button{
    cursor: pointer;
    padding: 5px 10px;
    color: #ffffff;
    background-color: #38616d;
    border: 2px solid #ffffff;
    border-radius: 10px;
    margin: 5px;
    
  }
}
main{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-image: url('../public/icons/background/fon.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;

  .warning{
    width: 250px;
    height: 200px;
    background-color: #38616d;
    color: #b9e9e2;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
    border-radius: 20px;
    z-index: 5;
    transform: scale(2.5);
 
  }
}
</style>
