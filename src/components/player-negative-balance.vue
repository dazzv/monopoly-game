<template>
    <div class="negative__balance">
        <h4>{{ currentPlayer.name }}</h4>
        <p>Похоже ваш баланс ушел в минус. Вы можете продать банку свои города за 50% стоимости или сдаться</p>
        <div>
            <button @click="endGame('sell')">Продам</button>
            <button @click="endGame('gameOver')">Сдаюсь</button>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({
            currentPlayer: 'currentPlayer',
        })
    },
    methods: {
        ...mapActions({
            isEndGame: 'isEndGame',  
        }),
        endGame(msg){
            this.isEndGame(msg)
        }
    },
}
</script>

<style lang="scss">
.negative__balance{
    grid-row: 6;
    grid-column: 6;
    background-color: #38616d;
    width: 250px;
    height: 200px;
    transform: translate(-33%, -33%);
    overflow: hidden;
    color: #b9e9e2;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px 10px;
    border-radius: 20px;
}
</style>