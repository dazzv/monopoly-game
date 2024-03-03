<template>
    <section class="game__icons">
        <div class="rules__icon"><img  @click="openRules" class="rules__img" src="../../public/icons/rules.png" alt="rules logo"></div>
        <img  @click="openFullscreen" class="fullscreen__icon" src="../../public/icons/fullscreen.png" alt="rules logo">
        <div class="game__rules" v-if="isRulesShow"> 
            <h2>Правила игры &#128221;</h2>
            <span @click="openRules" class="close__rules">&#10008;</span>
            <p>Правила игры в Монополию определяются с помощью кубиков и значков, расположенных на клеточках игрового поля. В начале хода участник кидает кубик, после чего передвигает фишку на количество клеточек, равное выпавшему числу. Монополия для двоих не отличается правилами от варианта с большим количеством игроков. В зависимости от выпавшего числа придется:</p>
            <ul>
                <li>&#9989; Приобрести собственность.</li>
                <li>&#9989; Заплатить аренду за использование чужой недвижимости.</li>
                <li>&#9989; Совершить уплату налога.</li>
                <li>&#9989; Выполнить особое задание (Шанс и Казна).</li>
                <li>&#9989; Сесть за решетку;</li>
                <li>&#9989; Получить зарплату за каждый пройденный круг</li>
            </ul>
            <p>Важно&#10071;: <br/>&#127922; &#127922; - При выпадении одинакового числа на двух кубиках можно будет сделать дополнительный ход. <br/>&#128176; - При перемещение между своими станциями, если вы переходите старт, вы не получите зарплату.</p>
            <h3>Основные отличия от настолки &#127918;</h3>
            <p>Вы покупаете город с 0 уровнем &#127924;, и после каждого посещения города(вами или вашими конкурентами) его уровень будет увеличиваться на 1, собственно увеличивается и рента.</p>
            <h4>Как расчитивается уровень ренты? &#128202;</h4>
            <ul>
                <li>Уровень 0: Цена города * 0.10 (10%)</li>
                <li>Уровень 1: Цена города * 0.40 (40%)</li>
                <li>Уровень 2: Цена города * 1 (100%)</li>
                <li>Уровень 3: Цена города * 2 (200%)</li>
                <li>Уровень 4: Цена города * 3 (300%)</li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isRulesShow: false,
            isFullScreen: false,
        }
    },
    methods: {
        openRules(){
            if(this.isRulesShow){
                this.isRulesShow = false
            } else{
                this.isRulesShow = true
            }
        },
        openFullscreen() {
            if(this.isFullScreen){
                this.isFullScreen = false;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else if(!this.isFullScreen && window.innerWidth > window.innerHeight){
                this.isFullScreen = true;

                const elem = document.documentElement
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            }  
        },
    },
}
</script>

<style lang="scss">
.rules__icon{
    background: #38616d;
    position: fixed;
    bottom: 20px;
    left: 20px;
    cursor: pointer;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    .rules__img{
        margin-top: 5px;
        height: 40px;
    }
}
.game__rules {
    width: 700px;
    margin-top: 10px;
    position:absolute;
    color: #c6f5ee;
    background: #38616d;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    padding: 10px;
    border-radius: 20px;
    .close__rules{
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 20px;
        cursor: pointer;
    }
    p{
        // width: 700px;
        text-align: left;
        margin: 0 auto;
    }
    h4,
    h3,
    h2{
        margin: 5px 0;
        text-align: center;
    }
    ul{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 8px 0;
        list-style-type: disc;
        li{
            margin-left: 20px;
            font-size: 15px;
            list-style-type: disc;
        }
    }
}
.fullscreen__icon{
    height: 50px;
    position: fixed;
    bottom: 20px;
    left: 75px;
    filter: invert(1);
    cursor: pointer;
}
@media (max-height: 500px) {
    .rules__icon{
       bottom: 12px;
       left: 12px;
       width: 40px;
       height: 40px;
       .rules__img{
        margin-top: 5px;
        height: 30px;
    }
    }
    .fullscreen__icon{
        width: 40px;
        height: 40px;
        bottom: 12px;
        left: 60px;
     }   
}
</style>