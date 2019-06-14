import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', name: 'home', component: () => import('./views/Home.vue')},
    {path: '/Enum/Devices', name: 'EnumDevices', component: () => import('./views/Enum/EnumDevices.vue')},
    {path: '/Enum/Geofences', name: 'EnumGeofences', component: () => import('./views/Enum/EnumGeofences.vue')},
    {path: '/Enum/Drivers', name: 'EnumDrivers', component: () => import('./views/Enum/EnumDrivers.vue')},
    {path: '/Enum/Implements', name: 'EnumImplements', component: () => import('./views/Enum/EnumImplements.vue')},

    {path: '/GetProperties/Devices', name: 'GetPropertiesDevices', component: () => import('./views/Properties/GetPropertiesDevices.vue')},
    {path: '/GetProperties/Geofences', name: 'GetPropertiesGeofences', component: () => import('./views/Properties/GetPropertiesGeofences.vue')},
    {path: '/GetProperties/Drivers', name: 'GetPropertiesDrivers', component: () => import('./views/Properties/GetPropertiesDrivers.vue')},

    {path: '/GetOnlineInfo', name: 'GetOnlineInfo', component: () => import('./views/GetInfo/GetOnlineInfo.vue')},
    {path: '/GetTrips', name: 'GetTrips', component: () => import('./views/GetInfo/GetTrips.vue')},
  ]
});
