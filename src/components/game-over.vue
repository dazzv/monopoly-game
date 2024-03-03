<template>
    <section class="game__over">
        <p>Игра закончена</p>
        <button @click="newGame()">Новая игра</button>
    </section>
</template>

<script>
export default {
    methods: {
        newGame(){
            window.location.reload()
        }
    },
}
</script>

<style lang="scss">
    .game__over {
        width: 100vw;
        height: 115vh;
        position:absolute;
        color: #ffffff;
        background: rgba($color: #000000, $alpha: 0.7);
        top: 0;
        left: 0;
        z-index: 50;

        button,
        p{
            font-size: 40px;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
        }

        button{
            top: 50%;
            font-size: 18px;
        }
    }
</style>