<template>
    <fieldset>
        <legend>Select geofences</legend>
        <div v-if="store.state.Geofences.Checked.length" class="items-list">
            <div v-for="o in store.state.Geofences.Checked">
                <b-checkbox v-model="o.Checked">{{o.Name}}</b-checkbox>
            </div>
        </div>
        <a href="javascript:void(0)" class="button is-small is-primary" @click="updateGeofences()" v-else>call EnumGeofences first</a>
        <slot></slot>
    </fieldset>
</template>

<script lang="ts">
    import {VueEx} from "../VueEx";
    import {Component} from 'vue-property-decorator';

    @Component
    export default class SelectGeofences extends VueEx {

    }
</script>

<style scoped lang="scss">

</style>