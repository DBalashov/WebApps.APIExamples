import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', name: 'home', component: () => import('./views/Home.vue')},
    {path: '/Enum/Devices', name: 'EnumDevices', component: () => import('./views/EnumDevices.vue')},
    {path: '/Enum/Geofences', name: 'EnumGeofences', component: () => import('./views/EnumGeofences.vue')},
    {path: '/Enum/Implements', name: 'EnumImplements', component: () => import('./views/EnumImplements.vue')},
    {path: '/Enum/Drivers', name: 'EnumDrivers', component: () => import('./views/EnumDrivers.vue')},
  ]
});
