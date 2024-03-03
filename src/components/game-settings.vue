<template>
    <section class="settings">
        <h1>Добро пожаловать!</h1>
        <h3>Количество игроков: {{ allPlayers.length }} <span v-if="allPlayers.length >= 2">✔</span></h3>
        <span v-if="allPlayers.length >= 4">Макс!</span>
        <div 
            class="list"
            v-for="player in allPlayers"
            v-bind:key="player.id"
            >
            <div>
                <img  :src="require('../../public/icons/' + player.img)" alt="player_icon"/>&nbsp;
                <p>{{ player.name }}</p>
            </div>
            <span @click="deleteFromList(player.id)">&#10008;</span>
        </div>
        <div class="nickname">
            <input 
            minlength="3" maxlength="11" required
            type="text" 
            v-model="nickName"
            >
            <button class="button" v-on:click="addToList">Добавить</button>
        </div>
        
        <button class="button"
            v-on:click="start()" 
            :class="{ready__button: allPlayers.length > 1}"
            title="Для начала игры, добавьте хотя бы одного игрока"
            >Готово!
        </button>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
data() {
    return {
        nickName: 'Игрок',
    }
},
methods: {
    ...mapActions({
        addNewPlayer: 'addNewPlayer',
        startTheGame: 'startTheGame',
        removePlayer: 'removePlayer'
    }),
    async addToList(){
        if(this.allPlayers.length < 4){
            if(this.nickName.length >= 2){
                const icons = ['car.svg', 'motorcycle.svg', 'helicopter.svg', 'yacht.svg'];
                const index = this.allPlayers.length;
                const newPlayer = {
                    id: index,
                    name: this.nickName,
                    position: 0,
                    propertyCards: [],
                    railroadsCards: [],
                    utilitiesCards: [],
                    communityChestCards: [],
                    chanceCards: [],
                    isInJail: 0,
                    balance: 2000,
                    img: icons[index],
                };
                if(this.nickName === 'Игрок'){
                    newPlayer.name = this.nickName + ' ' + (index+1);
                }
                await this.addNewPlayer(newPlayer)
            }
        }
      
    },
    deleteFromList(id){
        this.removePlayer(id)
    },
    start(){
        if(this.allPlayers.length > 1){
            this.startTheGame(true)
        }
    }    
},
computed:{
    ...mapGetters({
        allPlayers: 'allPlayers',
    })
}
}
</script>

<style lang="scss">
    .settings{
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        user-select: none;
        color: #ffffff;
        @media (max-width: 500px) {
            transform: scale(2);
        }

        h3{
            margin: 20px 0 0px;
        }
        
        input{
            padding: 10px;
            font-size: 16px;
            border-radius: 30px;
            margin: 10px 0;
        }
        .list{
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            width: 50%;
            align-items: center;

            span{
                cursor: pointer;
                font-weight: 600;
            }
            div{
                display: flex;
                align-items: center;
                img{
                height: 40px;
            }
            }
        }
        .button{
            font-size: 16px;
            font-weight: 500;
            padding: 10px 18px;
            background: rgb(0, 0, 0);
            color: #ffffff;
            border-radius: 30px;
            border: 0 solid #ffffff;
            cursor: pointer;
            margin-top: 30px;
        }
        .nickname{
            .button{
                background: rgb(168, 208, 204);
                margin: 0 10px;
            }
        }
        .ready__button{
            color: #ffffff;
            background-color: #38616d;
            border: 2px solid #ffffff;
        }
    }
</style>