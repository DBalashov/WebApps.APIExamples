<template>
  <div class="columns">
    <div class="column is-offset-2 is-8">
      window["external-settings"] = <pre v-html="JSON.stringify(getSettings(), null, '  ')"></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {ExternalSettings} from '@/main';
import {VueEx} from "@/VueEx";

@Component
export default class HomeView extends VueEx {

}
</script>
