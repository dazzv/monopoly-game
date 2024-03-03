<template>
        <div class="dice dice__1">
            <span v-if="firstCube === 1">⚀</span>        
            <span v-if="firstCube === 2">⚁</span>        
            <span v-if="firstCube === 3">⚂</span>        
            <span v-if="firstCube === 4">⚃</span>        
            <span v-if="firstCube === 5">⚄</span>
            <span v-if="firstCube === 6">⚅</span>
        </div>
        <div class="dice dice__2">
            <span v-if="secondCube === 1">⚀</span>        
            <span v-if="secondCube === 2">⚁</span>        
            <span v-if="secondCube === 3">⚂</span>        
            <span v-if="secondCube === 4">⚃</span>        
            <span v-if="secondCube === 5">⚄</span>
            <span v-if="secondCube === 6">⚅</span>
        </div>
    <button v-if="!zoneInfo && !warningMsg" class="throw__button" @click="throwTheDice">Бросать</button>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            diceList: ["","⚀","⚁","⚂","⚃","⚄","⚅"],
            firstCube: 2,
            secondCube: 5,
        }
    },
    methods: {
        ...mapActions({
            goToNewPosition: "goToNewPosition"
        }),

        throwTheDice(){
            // this.firstCube = 2;
            // this.secondCube = 4;
            this.firstCube = Math.floor(Math.random() * 6) + 1;
            this.secondCube = Math.floor(Math.random() * 6) + 1;
            const diceData = {
                firstCube: this.firstCube,
                secondCube: this.secondCube,
                sum: this.firstCube + this.secondCube
            } 

            this.goToNewPosition(diceData)            
        }
    },
    computed: {
        ...mapGetters({
            zoneInfo: 'zoneInfo',
            warningMsg: 'warningMsg'
        })
    }   
}
</script>

<style lang="scss">
.dice{
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 50px;
    span{
        position: absolute;
        font-size: 50px;
        transition: 0.3s ease-out;
        animation: throw 1s;

        @keyframes throw { 
            0% { right: 0px; transform: rotateZ(60deg);}    
            50% {right: 15px; transform: rotateZ(-30deg);} 
            100% { right: 2px;}
        }
    }
}

.dice__1{
    grid-row: 2;
    grid-column: 10;
    margin-right: 5px;
}
.dice__2{
    grid-row: 2;
    grid-column: 9;
    margin-left: 5px;
}
.throw__button{
    grid-row: 3;
    grid-column: 9;
    margin-top: 10px;
    width: 80px;
    height: 30px;
    background: #38616d; //#5fddb3
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    border-radius: 8px;
    color: #ffffff;
    border: none;
    font-weight: 550;
    transform: translateX(12px);
    cursor: pointer;
}
</style>