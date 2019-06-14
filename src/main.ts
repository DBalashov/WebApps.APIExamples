import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import Menu from './components/Menu.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import './assets/common.scss';

import {IExternalSettings} from '@/components/IExternalSettings';
import {IEnumCommonGroup, IEnumCommonItem} from '@/components/ServiceConnector';

Vue.config.productionTip = false;

Vue.component('Menu', Menu);
Vue.use(Vuex);
Vue.use(Buefy, { defaultIconPack: 'fas' });

export const ExternalSettings: IExternalSettings = (window as any)['external-settings'];

export interface IElementItem {
  ID: string;
  Name: string;
  Data: string;
  Checked: boolean;

  Item: any;
}

export interface IElementDataStore {
  Groups: IEnumCommonGroup[];
  Items: IEnumCommonItem[];
  Checked: IElementItem[];
}

export interface IDataStore {
  Devices: IElementDataStore;
  Geofences: IElementDataStore;
  Drivers: IElementDataStore;
  Implements: IElementDataStore;
}

export const store = new Vuex.Store<IDataStore>({
  state: {
    Devices: {Items: [], Groups: [], Checked: []},
    Geofences: {Items: [], Groups: [], Checked: []},
    Drivers: {Items: [], Groups: [], Checked: []},
    Implements: {Items: [], Groups: [], Checked: []}
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
