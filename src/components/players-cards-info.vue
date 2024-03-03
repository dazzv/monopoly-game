<template>
    <div class="players__cards__table">
        <div class="players__cards__head">
            <p>Доступные карточки игроков</p>
            <span class="close" @click="hideCardsInfo()">&#10008;</span>
        </div>

        <div 
            v-for="player in allPlayers"
            :key="player.id"
            class="player"
            >
            <p class="player__name" @click="togglePlayer(player.id)">{{ player.name }}&nbsp;&#x25BC;</p>
            <div class="player__cards" v-show="selectedPlayer === player.id">
                <div
                    v-for="(city, idx) in player.propertyCards" 
                    :key="idx"
                    class="city__card"
                    >
                    <p class="city__card__title">{{ city.name }}</p>
                    <img src='../../public/icons/city.png' alt="city-img" >
                    <p>Стоимость: {{ city.price }}</p>
                    <p>Уровень: {{ city.renta }}</p>
                    <p>Рента: {{ city.rentaSum }}</p>
                    <button @click="sellPlayerCard(city)" v-if="city.owner === currentPlayer.name">Продать</button>
                </div>

                <div
                    v-for="(utility, idx) in player.utilitiesCards" 
                    :key="idx"
                    class="utility__card"
                    >
                    <p class="utility__card__title">{{ utility.name }}</p>
                    <img v-if="utility.img" :src="require('../../public/icons/' + utility.img + '.png')" alt="city-img" >
                    <p>Стоимость: {{ utility.price }}</p>
                    <p>Рента: (* 4 (10))</p>
                    <button @click="sellPlayerCard(utility)" v-if="utility.owner === currentPlayer.name">Продать</button>
                </div>
                
                <div
                    v-for="(railroad, idx) in player.railroadsCards" 
                    :key="idx"
                    class="railroad__card"
                    >
                    <p class="railroad__card__title">{{ railroad.name }}</p>
                    <img v-if="railroad.img" :src="require('../../public/icons/' + railroad.img + '.png')" alt="city-img" >
                    <p>Стоимость: {{ railroad.price }}</p>
                    <button @click="sellPlayerCard(railroad)" v-if="railroad.owner === currentPlayer.name">Продать</button>
                </div>  
            
            </div>
        </div>
    </div>>
   
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            selectedPlayer: null, // Идентификатор выбранного игрока
        };
    },
    methods: {
        ...mapActions({
            hidePlayerCardsInfo: 'hidePlayerCardsInfo',
            sellCard: 'sellCard'
        }),
        hideCardsInfo(){
            this.hidePlayerCardsInfo()
        },
        togglePlayer(playerId) {
            if (this.selectedPlayer === playerId) {
                this.selectedPlayer = null; // Закрыть блок игрока, если он уже открыт
            } else {
                this.selectedPlayer = playerId; // Открыть блок выбранного игрока
            }
        },
        sellPlayerCard(card){
            this.sellCard(card)
        }
    },
    computed: {
        ...mapGetters({
            allPlayers: 'allPlayers',
            currentPlayer: 'currentPlayer'
        })
    }
}
</script>

<style lang="scss">
.players__cards__table{
    width: 610px;
    height: 428px;
    max-height: 700px;
    background: #38616d;
    position: absolute;
    padding: 15px 10px;
    z-index: 10;
    border-radius: 20px;
    color: #b9e9e2;

    .players__cards__head{
        p{
            font-size: 20px;
        }
    }

    .close{
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 20px;
    }

    .player{
        transition: 0.5s ease-in-out;
        
        .player__name{
            margin: 10px auto;
            cursor: pointer;
            // width: 100px;
        }
        .player__name:hover{
            border-left: 2px solid #b9e9e2;
            border-right: 2px solid #b9e9e2;
        }
        .player__cards{
            display: flex;
            flex-wrap: wrap;
            transition: display 5s ease-in-out;
        }
    }

    .railroad__card,
    .utility__card,
    .city__card{
        background: #bcd9d5;
        color: #000000;
        padding: 5px 10px; 
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 110px;
        margin: 2px;
        max-height: 100%;
        transition: 3s;
        justify-content: space-around;
        overflow: hidden;

        .city__card__title,
        .utility__card__title,
        .railroad__card__title
        {
            margin-bottom: 10px;
            font-weight: 500;
            // height: 20px;
            overflow: hidden;
        }

        img{
            height: 70px;
            width: auto;
        }
        p{
            font-size: 15px;
            font-weight: normal;
        }
    }
}
    
</style>