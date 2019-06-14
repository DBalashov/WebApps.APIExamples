<template>
    <table class="items" v-if="Items.length">
        <tr>
            <th class="uid">ID</th>
            <th style="width:30%;">Name</th>
            <th>Properties</th>
        </tr>
        <tr v-for="o in Items">
            <td>{{o.ID}}</td>
            <td>{{o.Name}}</td>
            <td>
                <div class="props-list">
                    <div v-for="prop in getProperty(o)">
                        <div class="prop-name">{{prop.Name}}</div>
                        <div class="prop-type">{{prop.Type}}</div>
                        <div class="prop-value">{{prop.Value}}</div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class PropertyItems extends Vue {
        @Prop() public Items: any[]|undefined;

        getProperty(r:any):any {
            let items = [];
            if (r.Properties)
                for (let prop in r.Properties)
                    items.push({
                        Name: prop,
                        Value: r.Properties[prop],
                        Type: r.PropertyTypes[prop]
                    });
            return items;
        }
    }
</script>

<style scoped lang="scss">

    div.props-list {
        line-height: 1.1rem;

        div { display:flex }
        .prop-name { width: 12rem }
        .prop-type { width: 3rem }
        .prop-value { width: 100%;}
    }

</style>