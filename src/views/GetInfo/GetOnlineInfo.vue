<template>
    <div class="columns">
        <div class="column is-4">
            <select-devices/>
            <b-tabs :animated="false">
                <b-tab-item label="JQuery">
                    <div class="example">
<pre>
$.post("{{getSettings().Urls.Service}}/GetOnlineInfo",
{
    session: "{{shorten(getSettings().Token)}}",
    schemaID: "{{getSettings().Organization.UID}}",
    IDs: [{{getChecked(store.state.Devices)}}]
}).done((r: IGetOnlineInfoItem[]) => {

})
</pre>
                    </div>
                </b-tab-item>

                <b-tab-item label="ServiceConnector">
                    <div class="example">
<pre>
this.connector.GetOnlineInfo([
    {{getChecked(store.state.Devices)}}
]).then((r: IGetOnlineInfoItem[]) => {

})
</pre>
                    </div>
                </b-tab-item>
            </b-tabs>
            <a class="button is-primary" @click="execute()">Execute</a>
        </div>

        <div class="column is-8">
            <b-tabs :animated="false">
                <b-tab-item label="Result as grid">
                    <table class="items">
                        <tr>
                            <th class="uid">ID</th>
                            <th>Name</th>
                            <th>DT</th>
                            <th>LastCoords</th>
                            <th style="width:15em">Speed/Course</th>
                            <th style="width:11em">LastPosition</th>
                            <th style="width:6em">Final data</th>
                        </tr>
                        <tr v-for="o in Items">
                            <td>{{o.ID}}</td>
                            <td>{{o.Name}}</td>
                            <td>{{o.DT}}</td>
                            <td>{{o.LastCoords}}</td>
                            <td>Speed={{o.Speed.toFixed(2)}} km/h, Course={{o.Course.toFixed(1)}}</td>
                            <td>{{o.LastPosition?o.LastPosition.Lat.toFixed(7) + " / " + o.LastPosition.Lng.toFixed(7):""}}</td>
                            <td class="c"><a href="javascript:void(0)" @click="FinalData=o.Final">show</a></td>
                        </tr>
                    </table>
                </b-tab-item>
                <b-tab-item label="Result as JSON">
                    <pre class="items">{{Content}}</pre>
                </b-tab-item>
            </b-tabs>
        </div>
    </div>
</template>

<script lang="ts">
    import {store} from "@/main";
    import {Component} from 'vue-property-decorator';
    import {IGetOnlineInfoItem} from "@/components/ServiceConnector";
    import {VueEx} from "@/VueEx";

    @Component
    export default class GetOnlineInfoView extends VueEx {
        public Content: string = "";
        public Items: IGetOnlineInfoItem[] = [];

        execute() {
            this.connector.GetOnlineInfo(this.getCheckedIDs(store.state.Devices))
                .then((r: IGetOnlineInfoItem[]) => {
                    this.Content = JSON.stringify(r, null, "  ");
                    this.Items = r;
                });
        }
    }
</script>
