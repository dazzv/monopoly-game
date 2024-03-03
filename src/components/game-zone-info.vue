<template>
    <div class="current__zone__info">
        <h4 class="current__zone__title">{{ currentZone.name }}</h4>
        <img v-if="currentZone.img" class="current__zone__img" :src="require('../../public/icons/' + currentZone.img + '.png')"/>
        
        <div v-if="currentZone.type === 'city'" class="current__zone__city">
            <img src='../../public/icons/city.png' alt="current-zone-img" class="current__zone__img">
            <p v-if="currentZone.owner !== null" class="current__zone__owner">Владелец: {{ currentZone.owner }}</p>
            <p v-else class="current__zone__owner">Владелец: "пусто"</p>
            <p class="current__zone__price">Стоимость: {{ currentZone.price }}$</p>
            <p class="current__zone__renta">Уровень: {{ currentZone.renta }}</p>
            <p class="current__zone__renta">Рента: {{ currentZone.rentaSum }}</p>
            <p v-if="currentZone.owner" style="color: #bcd9d5;">Уровень города увеличится &uarr;</p>
            <div>
                <button v-if="currentZone.owner"   @click="newTransaction()">ОК</button>
                <button v-else   @click="cancel()">Отмена</button>
                <button  v-if="!currentZone.owner"   @click="newTransaction()">Купить</button>
            </div>
        </div>

        <div v-if="currentZone.type === 'communityChest'" class="current__zone__chest">
            <p v-if="chestCard.description">{{ chestCard.description }}</p>
            <button   @click="newTransaction()">ОК</button>
        </div>

        <div v-if="currentZone.type === 'chance'" class="current__zone__chance">
            <p v-if="chanceCard.description">{{ chanceCard.description }}</p>
            <button   @click="newTransaction()">ОК</button>
        </div>

        <div v-if="currentZone.type === 'utility'" class="current__zone__utility">
            <p v-if="currentZone.owner !== null" class="current__zone__owner">Владелец: {{ currentZone.owner }}</p>
            <p v-else class="current__zone__owner">Владелец: "пусто"</p>
            <div>
                <button v-if="currentZone.owner"   @click="newTransaction()">ОК</button>
                <button v-else   @click="cancel()">Отмена</button>
                <button  v-if="!currentZone.owner"   @click="newTransaction()">Купить</button>
            </div>
        </div>

        <div v-if="currentZone.type === 'tax'" class="current__zone__chance">
            <p>- {{ currentZone.price  }}$</p>
            <button   @click="newTransaction()">ОК</button>
        </div>

        <div v-if="currentZone.type === 'railroad'" class="current__zone__railroad">
            <p v-if="currentZone.owner !== null" class="current__zone__owner">Владелец: {{ currentZone.owner }}</p>
            <p v-else>Стоимость: {{ currentZone.price  }}$</p>
            <p>Уровень: {{ currentZone.renta }}</p>
            <p>Рента: {{ currentZone.rentaSum }}</p>
            <div>
                <div v-if="currentPlayer.railroadsCards.length > 1 && currentZone.owner === currentPlayer.name" >
                    <button
                    v-for="(station, idx) in currentPlayer.railroadsCards" 
                    @click="goTo(station)"
                    >
                       <p v-if="station.name === currentZone.name">Остаться здесь</p>
                       <p v-else>Отправиться на {{ station.name }}</p>
                    </button>
                </div>
                <button v-if="currentZone.owner"   @click="newTransaction()">ОК</button>
                <button v-else @click="cancel()">Отмена</button>
                <button  v-if="!currentZone.owner" @click="newTransaction()">Купить</button>
            </div>
        </div>

        <div v-if="currentZone.type === 'jail'" class="current__zone__jail">
            <button @click="newTransaction()">ОК</button>
        </div>
        
        <div v-if="currentZone.type === 'visit'" class="current__zone__jail">
            <p>{{ currentPlayer.name }} в заключение<br/>Что будете делать?</p>
            <button  @click="outJail('pay')">Заплатить 150$</button>
            <button  @click="outJail('dubl')">Попробую бросать дубль</button> 
        </div>
        
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    computed: {
        ...mapGetters({
            currentZone: 'currentZone',
            chanceCard: 'chanceCard',
            chestCard: 'chestCard',
            currentPlayer: 'currentPlayer'
        }),  
    },
    methods: {
        ...mapActions({
            addToQueue: 'addToQueue',
            transactions: 'transactions',
            goToStation: 'goToStation',
            outFromJail: 'outFromJail',
        }),

        cancel(){
            this.addToQueue()
        },
        newTransaction() {
            this.transactions(this.currentZone.type) 
        },
        outJail(payOrDubl) {
            this.outFromJail(payOrDubl)
        },

        goTo(station){
            this.goToStation(station)
        }
    },
}
</script>

<style lang="scss">
    .current__zone__info{
        grid-row: 4;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background: #38616d;
        color: #ffffff;
        padding: 10px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        z-index: 5;
        
        .current__zone__title{
            margin-bottom: 10px;
        }
        .current__zone__img{
            height: 100px;
        }

        p{
            font-size: 15px;
            font-weight: normal;
        }
        .button{
            padding: 4px 6px;
            margin: 5px;
            background: #ffffff;
            border: 1px solid #bcd9d5;
            border-radius: 5px;
            cursor: pointer;
        }
        .buy{
            background-color: #bcd9d5;
            // color: #ffffff;
        }


    }
</style>