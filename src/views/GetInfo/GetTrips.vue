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
                            <th>Range start / end</th>
                            <th>LastCoords / LastData</th>
                            <th style="width:11em">LastPosition</th>
                            <th style="width:6em">Final data</th>
                        </tr>
                        <tbody v-for="o in Items">
                        <tr>
                            <td>
                                <div>{{o.ID}}</div>
                                <div>
                                    <a v-if="o.Trips && o.Trips.length" @click="o.__open = !o.__open">Trips: {{o.Trips.length}}</a>
                                    <div v-else style="color:silver;">No trips</div>
                                </div>
                            </td>
                            <td>{{o.Name}} - {{o.VRN}} ({{o.Serial}})</td>
                            <td>
                                <div>{{o.SD}}</div>
                                <div>{{o.ED}}</div>
                            </td>
                            <td>
                                <div>{{o.LastCoords}}</div>
                                <div>{{o.LastData}}</div>
                            </td>
                            <td>{{o.LastPosition?o.LastPosition.Lat.toFixed(7) + " / " + o.LastPosition.Lng.toFixed(7):""}}</td>
                            <td><a href="javascript:void(0)" @click="FinalData=o.Final">show final</a></td>
                        </tr>
                        <tr v-if="o.__open">
                            <td colspan="6" style="padding:0 0 0 1rem;">
                                <table class="items" style="margin-bottom:0.5rem">
                                    <tr>
                                        <th>Trip index</th>
                                        <th>Trip start / end</th>
                                        <th>Point start / end</th>
                                        <th style="width:6rem"></th>
                                    </tr>
                                    <tbody v-for="trip in o.Trips">
                                    <tr>
                                        <td>{{trip.Index}}</td>
                                        <td>
                                            <div>{{trip.SD}}</div>
                                            <div>{{trip.ED}}</div>
                                        </td>
                                        <td>
                                            <div>{{trip.PointStart ? trip.PointStart.Lat.toFixed(7) + " / " + trip.PointStart.Lng.toFixed(7):""}}</div>
                                            <div>{{trip.PointEnd ? trip.PointEnd.Lat.toFixed(7) + " / " + trip.PointEnd.Lng.toFixed(7):""}}</div>
                                        </td>
                                        <td>
                                            <a>show total</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                            <table v-for="stage in trip.Stages" class="items">
                                                <tr>
                                                    <th colspan="7">
                                                        {{stage.Name}}<span v-if="stage.Alias"> / {{stage.Alias}}</span>
                                                        <div style="float:right">Trip #{{trip.Index}}</div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th style="width:3rem"></th>
                                                    <th style="width:9rem">Start date/time</th>
                                                    <th style="width:9rem">End date/time</th>
                                                    <th style="width:5rem">Status</th>
                                                    <th style="width:20rem">Status ID</th>
                                                    <th>Status caption</th>
                                                    <th style="width:6rem"></th>
                                                </tr>
                                                <tbody>
                                                <tr v-for="it in stage.Items">
                                                    <td>{{it.Index}}</td>
                                                    <td>{{it.SD}}</td>
                                                    <td>{{it.ED}}</td>
                                                    <td>{{it.Status}}</td>
                                                    <td>{{it.StatusID}}</td>
                                                    <td>{{it.Caption}}</td>
                                                    <td><a>show values</a></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="6" style="color:silver">
                                                        {{stage.Name}}<span v-if="stage.Alias"> / {{stage.Alias}}</span>
                                                    </td>
                                                    <td><a>show total</a></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
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
    import {ITripItem, ITripResult} from "@/components/ServiceConnector";
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
            this.connector.GetTrips(this.getCheckedIDs(store.state.Devices), this.SD, this.ED, this.tripSplitterIndex, this.tripParams ? this.tripParams.split(',') : [])
                .then((r: ITripResult[]) => {
                    this.Content = JSON.stringify(r, null, "  ");

                    r.forEach(tripResult => (<any> tripResult)["__open"] = false);

                    this.Items = r;
                });
        }

        formatDT(d:Date):string {
            return moment(d).format(this.FMT_SERVICE);
        }
    }
</script>
