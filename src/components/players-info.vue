<template>
    <section class="players__table">
        <p class="players__table__title"  @click="showTable">Игроки, баланс, карточки <span>&#10010;</span></p>
        <div 
            v-for="player in allPlayers"
            :key="player.id"
            class="player"
            v-show="showPlayersTable"
            >
            <p>{{ player.name }}&nbsp;&nbsp;</p>
            <img  v-if="player.img" :src="require('../../public/icons/' + player.img)" alt="player_icon" :class="{rotate__player: player.position > 10}"/>
            <p>&nbsp; - &nbsp;</p>
            <p class="player__balance">{{ player.balance }}<span>$</span>&nbsp;</p>
            <span @click="showCards()" class="players__cards__btn">&#x25C4;</span>             
            <span @click="showCards()" class="players__cards__icon"></span>   
        </div>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            showPlayersTable: false
        }
    },
    computed: {
        ...mapGetters({
            allPlayers: 'allPlayers'
        })
    },
    methods: {
        ...mapActions({
            showCardsInfo: 'showCardsInfo'
        }),
        showCards(){
            this.showCardsInfo()
        },

        showTable(){
            if(this.showPlayersTable){
                this.showPlayersTable = false
            } else {
                this.showPlayersTable = true
            }
        },
    },  
    mounted() {
        if(window.innerHeight > 500){
            this.showPlayersTable = true
        }
    },
}
</script>

<style lang="scss">
.players__table{
    width: 220px;
    color: #b9e9e2;
    background: #38616d;//rgb(180, 224, 219);
    z-index: 5;
    position: fixed;
    right: 25px;
    top: 20px;
    border-radius: 20px;

    .players__table__title{
        margin: 6px 0;
        cursor: pointer;
    }

    .player{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;

        img{
            height: 30px;
        }
        .players__cards__icon{
            background: url('../../public/icons/monopolycards.svg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            height: 31px;
            width: 30px;
            cursor: pointer;
        }
        span{
            margin-left: 1px;
            font-size: 14px;
        }
        
    }
    @media (max-height: 500px) {
        top: 10px;
    }
}

</style>