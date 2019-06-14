<template>
    <fieldset>
        <legend>Select devices</legend>
        <div v-if="store.state.Devices.Checked.length" class="items-list">
            <div v-for="o in store.state.Devices.Checked">
                <b-checkbox v-model="o.Checked">{{o.Name}}<span v-if="o.Data">&nbsp;&nbsp;({{o.Data}})</span></b-checkbox>
            </div>
        </div>
        <a href="javascript:void(0)" class="button is-small is-primary" @click="updateDevices()" v-else>call EnumDevices first</a>
        <slot></slot>
    </fieldset>
</template>

<script lang="ts">
    import {VueEx} from "../VueEx";
    import {Component} from 'vue-property-decorator';

    @Component
    export default class SelectDevices extends VueEx {

    }
</script>

<style scoped lang="scss">

</style>