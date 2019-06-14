<template>
  <div class="columns">

    <div class="column is-4">
      <b-tabs :animated="false">
        <b-tab-item label="JQuery">
          <div class="example">
<pre>
$.post("{{getSettings().Urls.Service}}/EnumDrivers",
{
    session: "{{shorten(getSettings().Token)}}",
    schemaID: "{{getSettings().Organization.UID}}"
}).done((r: IEnumDriversResult) => {
    // r.Items, r.Groups
})
</pre>
          </div>
        </b-tab-item>

        <b-tab-item label="ServiceConnector">
          <div class="example">
<pre>
this.connector.EnumDrivers().done((r: IEnumDriversResult) => {
    // r.Items,
    // r.Groups
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
            <table class="items" v-if="store.state.Drivers.Groups.length">
              <tr>
                <th colspan="4">Groups</th>
              </tr>
              <tr>
                <th class="uid">ID</th>
                <th class="uid">ParentID</th>
                <th>Name</th>
                <th class="prop">Properties</th>
              </tr>
              <tr v-for="o in store.state.Drivers.Groups">
                <td>{{o.ID}}</td>
                <td>{{o.ParentID || 'null'}}</td>
                <td>{{o.Name}}</td>
                <td class="c">
                  <a href="javascript:void(0)" @click="propertiesShow(o)">{{o.Properties && o.Properties.length ? o.Properties.length : 0}}</a>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <table class="items" v-if="store.state.Drivers.Items.length">
              <tr>
                <th colspan="6">Items</th>
              </tr>
              <tr>
                <th class="uid">ID</th>
                <th class="uid">ParentID</th>
                <th class="serial">Serial</th>
                <th>Name</th>
                <th>Image</th>
                <th class="prop">Properties</th>
              </tr>
              <tr v-for="o in store.state.Drivers.Items">
                <td>{{o.ID}}</td>
                <td>{{o.ParentID || 'null'}}</td>
                <td class="c">{{o["DriverID"]}}</td>
                <td>{{o.Name}}</td>
                <td>{{o.Image}}</td>
                <td class="c">
                  <a href="javascript:void(0)" @click="propertiesShow(o)">{{o.Properties.length}}</a>
                </td>
              </tr>
            </table>
          </div>
        </b-tab-item>

        <b-tab-item label="Result as tree">
          <div v-html="getTree()" class="items"></div>
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
  import {EnumBase} from "@/views/EnumBase";
  import {store} from "@/main";
  import {IEnumDriverItem} from "@/components/ServiceConnector";

  @Component
  export default class EnumDriversView extends EnumBase {

    getTree():string {
      return this.makeTree(store.state.Drivers, (c:IEnumDriverItem) => c.DriverID);
    }

    execute() {
      this.updateDrivers().then(r => this.Content = JSON.stringify(r, null, "  "));
    }
  }
</script>
