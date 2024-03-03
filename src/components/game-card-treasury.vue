<template>
    <div class="treasury__block">
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.treasury__block{
    grid-row: 3;
    grid-column: 3;
    transform: rotate(-45deg) scale(0.29);
    background-image: url('../../public/icons/treasury.webp');
    width: 380px;
    height: 270px;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: -20%;
    left: -30%;
    border: 4px dashed #000000;
    padding: 15px;
    box-sizing: content-box;
}
</style>