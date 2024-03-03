<template>
    <div class="queue__list">
        <span>Ход игрока:</span>
        <div>
            <p>{{currentPlayer.name}}&nbsp;&nbsp;</p>
            <img v-if="currentPlayer.img" :src="require('../../public/icons/' + currentPlayer.img)" alt="player_icon"/>
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            currentPlayer: 'currentPlayer'
        }),
    },

}
</script>
<style lang="scss">
.queue__list{
    grid-row: 4;
    grid-column: 9;
    position: absolute;
    transform: translate(20%, -10px);
    font-size: 14px;
    span{
        font-weight: 550;
        color:rgb(42, 42, 42); 
    }
    div{
        display: flex;
        align-items: center;
        p{
            color:#38616d; 
        }
        img{
            height: 30px;
        }
    }
}
</style>