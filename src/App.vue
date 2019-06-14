<template>
  <div id="app-root">
    <Menu />
    <div class="container is-fluid">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">

</style>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {

  }
</script>