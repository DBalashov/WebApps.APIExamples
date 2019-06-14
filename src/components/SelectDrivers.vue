<template>
    <fieldset>
        <legend>Select drivers</legend>
        <div v-if="store.state.Drivers.Checked.length" class="items-list">
            <div v-for="o in store.state.Drivers.Checked">
                <b-checkbox v-model="o.Checked">{{o.Name}}</b-checkbox>
            </div>
        </div>
        <a href="javascript:void(0)" class="button is-small is-primary" @click="updateDrivers()" v-else>call EnumDrivers first</a>
        <slot></slot>
    </fieldset>
</template>

<script lang="ts">
    import {VueEx} from "../VueEx";
    import {Component} from 'vue-property-decorator';

    @Component
    export default class SelectDrivers extends VueEx {

    }
</script>

<style scoped lang="scss">

</style>