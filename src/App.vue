<template lang='pug'>
#app
    router-view
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang='rscss'>
@import 'all';
</style>

<style lang='scss'>
@import 'variable';

.app {}
</style>
