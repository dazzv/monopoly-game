<template>
    <section class="board">
        <component
            :class="'zones zone-' + id"
            v-for="(a, id) in zones"
            :key="id"
            v-bind:class="{right:10 < id && id < 20}, {bottom:id > 20 && id < 30}, {left: id > 30}"
            >

            <div v-if="a.color" class="color" :style="{'background': a.color}"></div>
            <p :class="{zone__title: a.type != 'city'}" class="title">{{a.name}}</p>
           
            <component class="players" v-if="a.players.length">
                <div 
                    class="player"
                    v-for="(player, idx) in a.players"
                    v-bind:key="idx"
                    >
                    <img  :src="require('../../public/icons/' + player.img)" alt="player_icon" :class="{rotate__player: player.position > 10}"/>
                </div>
            </component>

            <img v-if="a.img" class="zone__img" :src="require('../../public/icons/' + a.img + '.png')"/>
            <p v-if="a.price" class="price">{{ a.price }}<span>$</span></p>
        </component>

        <game-dice/>
        <game-card-chance/>
        <game-card-treasury/>
        <players-queue-list/>
        <game-zone-info v-if="zoneInfo"/>
        <player-negative-balance v-show="warningMsg"/>
    </section>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import gameDice from './game-dice.vue'
import gameCardChance from './game-card-chance.vue'
import gameCardTreasury from './game-card-treasury.vue'
import playersQueueList from './players-queue-list.vue'
import gameZoneInfo from './game-zone-info.vue'
import playerNegativeBalance from './player-negative-balance'

export default {

    components:{
        gameDice,
        gameCardChance,
        gameCardTreasury,
        playersQueueList,
        gameZoneInfo,
        playerNegativeBalance,
    },

    computed: {
        ...mapGetters({
            zones: 'zonesData',
            currentPlayer: 'currentPlayer',
            zoneInfo: 'zoneInfo',
            warningMsg: 'warningMsg'
        }),
    },
    
}
</script>
<style lang="scss">
.board{
    margin: 50px 0px;
    min-width: 711px;
    min-height: 711px;
    display: grid;
    grid-template-columns: 110px repeat(9,54.55px) 110px;
    grid-template-rows: 110px repeat(9,54.55px) 110px;
    border: 2px solid #000000;
    position: relative;
    background: #bcd9d5;

    .zones{
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        border: 1px solid #000000;
        font-size: 10.5px;
        text-wrap: wrap;
        word-wrap:break-word;

        .color{
            width: 100%;
            height: 20px;
        }
        .title{
            text-transform: uppercase;
            max-width: 100%;
        }
        .price{
            position: absolute;
            bottom: 5px;
            font-size: 12px;
            font-weight: normal;
            span{
                margin-left: 1px;
                font-size: 11px;
            }
        }
        .zone__title{
            margin: auto;
            text-transform: uppercase;
            max-width: 100%;
            font-weight: 500;
            font-size: 10px;
        }
        .zone__img{
            // width: 40px;
            height: 40px;
            margin-bottom: 25px;
            
        }

    }
    .right{
        transform: rotate(-90deg);
        width: 54.55px;
        height: 110px;
        position: relative;
        left: 28px;
        bottom: 27.5px;
    }

    .zone-9,
    .zone-8,
    .zone-6,
    .zone-3,
    .zone-1{
        flex-direction: column-reverse;

        .title{
            position: absolute;
            top: 7px;
        }
        .price{
            bottom: 20px;
        }
    }

    .zone-11{
        grid-column: 11;
        grid-row: 2;
    }
    .zone-12{
        grid-column: 11;
        grid-row: 3;
    }
    .zone-13{
        grid-column: 11;
        grid-row: 4;
    }
    .zone-14{
        grid-column: 11;
        grid-row: 5;
    }
    .zone-15{
        grid-column: 11;
        grid-row: 6;
    }
    .zone-16{
        grid-column: 11;
        grid-row: 7;
    }
    .zone-17{
        grid-column: 11;
        grid-row: 8;
    }
    .zone-18{
        grid-column: 11;
        grid-row: 9;
    }
    .zone-19{
        grid-column: 11;
        grid-row: 10;
    }
    .zone-20{
        grid-column: 11;
        grid-row: 11;
    }

    .zone-21{
        grid-column: 10;
        grid-row: 11;
    }
    .zone-22{
        grid-column: 9;
        grid-row: 11;
    }
    .zone-23{
        grid-column: 8;
        grid-row: 11;
    }
    .zone-24{
        grid-column: 7;
        grid-row: 11;
    }
    .zone-25{
        grid-column: 6;
        grid-row: 11;
    }
    .zone-26{
        grid-column: 5;
        grid-row: 11;
    }
    .zone-27{
        grid-column: 4;
        grid-row: 11;
    }
    .zone-28{
        grid-column: 3;
        grid-row: 11;
    }
    .zone-29{
        grid-column: 2;
        grid-row: 11;
    }
    .zone-30{
        grid-column: 1;
        grid-row: 11;
    }
    .left{
        transform: rotate(90deg);
        width: 54.55px;
        height: 110px;
        position: relative;
        left: 27.9px;
        bottom: 27.9px;
    }
    .zone-31{
        grid-column: 1;
        grid-row: 10;
    }
    .zone-32{
        grid-column: 1;
        grid-row: 9;
    }
    .zone-33{
        grid-column: 1;
        grid-row: 8;
    }
    .zone-34{
        grid-column: 1;
        grid-row: 7;
    }
    .zone-35{
        grid-column: 1;
        grid-row: 6;
    }
    .zone-36{
        grid-column: 1;
        grid-row: 5;
    }
    .zone-37{
        grid-column: 1;
        grid-row: 4;
    }
    .zone-38{
        grid-column: 1;
        grid-row: 3;
    }
    .zone-39{
        grid-column: 1;
        grid-row: 2;
    }
    .zone-40{
        grid-column: 1;
        grid-row: 1;
    }
    
}
.board{
    @media (min-height: 770px) and (min-width: 1368px) {
        transform: scale(1.1);
        // margin: 15px 0px;
    };

    @media (max-height: 500px) and (orientation: landscape){
        transform: scale(0.9);
        margin: 30px 0;
    };    
}

.zone-10, .zone-20, .zone-30, .zone-0{
    .zone__img{
        transform: scale(1.5);
        margin-bottom: 0;
        z-index: 0;
    }
}

.players{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    z-index: 5;
    .player{
    img{
        width: 45px;
        animation: 0.9s show ease;
    }
    
    @keyframes show {
        from { opacity: 0; transform: translateX(-10px);}
        to { opacity: 1; transform: translateX(0px);}
    }
    .rotate__player{
        transform: rotateY(180deg);
        animation: 0.9s showrevs ease;
    }
    @keyframes showrevs {
        from { opacity: 0; transform: rotateY(180deg) translateX(-10px);}
        to { opacity: 1; transform: rotateY(180deg) translateX(0px);}
    }
        
    }
    .player + .player{
        margin-top: -30px;
        img{
            width: 35px;
        }

    } 
}
 
</style>