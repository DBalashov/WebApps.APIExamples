<template>
    <div class="columns">
        <div class="column is-4">
            <select-geofences/>
            <b-tabs :animated="false">
                <b-tab-item label="JQuery">
                    <div class="example">
<pre>
$.post("{{getSettings().Urls.Service}}/GetGFProperties",
{
    session: "{{shorten(getSettings().Token)}}",
    schemaID: "{{getSettings().Organization.UID}}",
    IDs: [{{getChecked(store.state.Geofences)}}]
}).done((r: IGetPropertiesResult[]) => {
    // r.Items, r.Groups
})
</pre>
                    </div>
                </b-tab-item>

                <b-tab-item label="ServiceConnector">
                    <div class="example">
<pre>
this.connector.GetGFProperties([
    {{getChecked(store.state.Geofences)}}
]).then((r: IGetPropertiesResult[]) => {
    // r.Items, r.Groups
})
</pre>
                    </div>
                </b-tab-item>
            </b-tabs>
            <a class="button is-primary" @click="execute">Execute</a>
        </div>

        <div class="column is-8">
            <b-tabs :animated="false">
                <b-tab-item label="Result as grid">
                    <div>
                       <PropertyItems :Items="Items"/>
                    </div>
                </b-tab-item>
                <b-tab-item label="Result as JSON">
                    <pre class="items">{{Content}}</pre>
                </b-tab-item>
            </b-tabs>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {store} from "@/main";
    import {IGetPropertiesResult} from "@/components/ServiceConnector";
    import {GetPropertiesBase} from "@/views/Properties/GetPropertiesBase";
    import PropertyItems from "@/components/PropertyItems.vue";

    @Component({
        components: {PropertyItems}
    })
    export default class GetPropertiesGeofencesView extends GetPropertiesBase {
        execute() {
            this.connector.GetGFProperties(this.getCheckedIDs(store.state.Geofences))
                .then((r: IGetPropertiesResult[]) => {
                    this.Content = JSON.stringify(r, null, "  ");
                    this.Items = r;
                });
        }
    }
</script>
