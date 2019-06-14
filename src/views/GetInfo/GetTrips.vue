<template>
    <div class="columns">
        <div class="column is-4">
            <select-devices/>
            <div class="columns">
                <div class="column is-12">
                    <b-field grouped>
                        <b-field label="Date (from)">
                            <b-datepicker v-model="SD" :first-day-of-week="1" :date-formatter="dateFormatter"></b-datepicker>
                        </b-field>
                        <b-field label="Date (to)">
                            <b-datepicker v-model="ED" :first-day-of-week="1" :date-formatter="dateFormatter"></b-datepicker>
                        </b-field>
                        <b-field label="Splitter index">
                            <b-input type="number" min="-1" max="10" v-model="tripSplitterIndex"></b-input>
                        </b-field>
                    </b-field>
                    <b-field label="Trip params">
                        <b-input type="text" v-model="tripParams"></b-input>
                    </b-field>
                </div>
            </div>
            <b-tabs :animated="false">
                <b-tab-item label="JQuery">
                    <div class="example">
<pre>
$.post("{{getSettings().Urls.Service}}/GetTrips",
{
    session: "{{shorten(getSettings().Token)}}",
    schemaID: "{{getSettings().Organization.UID}}",
    IDs: [{{getChecked(store.state.Devices)}}],
    SD: "{{formatDT(SD)}}",
    ED: "{{formatDT(ED)}}",
    tripSplitterIndex: {{tripSplitterIndex}},
    tripParams: "{{tripParams||''}}"
}).done((r: ITripResult[]) => {
    // result
})
</pre>
                    </div>
                </b-tab-item>

                <b-tab-item label="ServiceConnector">
                    <div class="example">
<pre>
this.connector.GetOnlineInfo(
    {{getChecked(store.state.Devices) || "[],"}}
    "{{formatDT(SD)}}",
    "{{formatDT(ED)}}",
    {{tripSplitterIndex}},
    [{{(tripParams||'').split(',').map(s => '"' + s + '"').join(',')}}]
]).then((r: ITripResult[]) => {
    // result
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
                            <th>Name - VehicleRegNumber (Serial)</th>
                            <th>Trip start / end</th>
                            <th>LastCoords / LastData</th>
<!--                            <th style="width:15em">Speed/Course</th>-->
                            <th style="width:11em">LastPosition</th>
                            <th style="width:6em">Final data</th>
                        </tr>
                        <tr v-for="o in Items">
                            <td>{{o.ID}}</td>
                            <td>{{o.Name}} - {{o.VRN}} ({{o.Serial}})</td>
                            <td>
                                <div>{{o.SD}}</div>
                                <div>{{o.ED}}</div>
                            </td>
                            <td>
                                <div>{{o.LastCoords}}</div>
                                <div>{{o.LastData}}</div>
                            </td>
<!--                            <td>Speed={{(o.Speed || 0).toFixed(2)}} km/h, Course={{(o.Course || 0).toFixed(1)}}</td>-->
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
    import {ITripResult} from "@/components/ServiceConnector";
    import {VueEx} from "@/VueEx";
    import moment from "moment";

    @Component
    export default class GetTripsView extends VueEx {
        public Content: string = "";
        SD: Date = moment().startOf('day').toDate();
        ED: Date = moment().add(1, 'day').startOf('day').toDate();
        tripSplitterIndex: number = -1;
        tripParams: string = "MoveDuration,TotalDuration,TotalDistance";

        execute() {
            this.connector.GetTrips(this.getCheckedIDs(store.state.Devices), this.SD, this.ED, this.tripSplitterIndex, this.tripParams ? this.tripParams.split(','):[])
                .then((r: ITripResult[]) => {
                    this.Content = JSON.stringify(r, null, "  ");
                    this.Items = r;
                });
        }

        formatDT(d:Date):string {
            return moment(d).format(this.FMT_SERVICE);
        }
    }
</script>
