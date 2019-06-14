<template>
    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="dropdown navigation">
        <div class="navbar-brand">
            <router-link to="/" :exact="true" class="navbar-item has-text-weight-semibold">API Examples</router-link>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
               data-target="navbarMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" id="navbarMenu">
            <div class="navbar-start">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">Enum objects</a>
                    <div class="navbar-dropdown">
                        <router-link :to="ExternalSettings.Urls.Relative + '/Enum/Devices'" class="navbar-item">Devices</router-link>
                        <router-link :to="ExternalSettings.Urls.Relative + '/Enum/Geofences'" class="navbar-item">Geofences</router-link>
                        <router-link :to="ExternalSettings.Urls.Relative + '/Enum/Drivers'" class="navbar-item">Drivers</router-link>
                        <router-link :to="ExternalSettings.Urls.Relative + '/Enum/Implements'" class="navbar-item">Implements</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="ExternalSettings.Urls.Relative + '/Enum/Parameters'" class="navbar-item">Parameters</router-link>
                    </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">GetProperties</a>
                    <div class="navbar-dropdown">
                        <router-link :to="ExternalSettings.Urls.Relative + '/GetProperties/Devices'" class="navbar-item">Devices</router-link>
                        <router-link :to="ExternalSettings.Urls.Relative + '/GetProperties/Geofences'" class="navbar-item">Geofences</router-link>
                        <router-link :to="ExternalSettings.Urls.Relative + '/GetProperties/Drivers'" class="navbar-item">Drivers</router-link>
<!--                        <router-link :to="ExternalSettings.Urls.Relative + '/GetProperties/Implements'" class="navbar-item">Implements</router-link>-->
                    </div>
                </div>

                <router-link :to="ExternalSettings.Urls.Relative + '/GetOnlineInfo'" class="navbar-item">GetOnlineInformation</router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">GetTrips/GetStages</a>
                    <div class="navbar-dropdown">
                        <router-link :to="ExternalSettings.Urls.Relative + '/GetTrips'" class="navbar-item">GetTrips</router-link>
                        <router-link :to="ExternalSettings.Urls.Relative + '/GetTripTables'" class="navbar-item">GetTripTables</router-link>
                        <router-link :to="ExternalSettings.Urls.Relative + '/GetTrips'" class="navbar-item">GetTripsArea</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="ExternalSettings.Urls.Relative + '/GetTrips'" class="navbar-item">GetStages</router-link>
                    </div>
                </div>

                <router-link :to="ExternalSettings.Urls.Relative + '/Data'" class="navbar-item">Data store/load</router-link>
                <router-link :to="ExternalSettings.Urls.Relative + '/Reports'" class="navbar-item">Reports</router-link>
            </div>
        </div>

        <!--      <ul class="navbar-nav flex-row">-->
        <!--        <li class="nav-item" :style="Busy?'':'display:none'">-->
        <!--          <a class="nav-link btn-primary" style="color:white" href="#">Загрузка...</a>-->
        <!--        </li>-->
        <!--      </ul>-->

    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {IExternalSettings} from '@/components/IExternalSettings';
    import {ExternalSettings} from '@/main';

    @Component
    export default class Menu extends Vue {
        ExternalSettings: IExternalSettings | undefined;

        created() {
            this.ExternalSettings = ExternalSettings;
        }
    }
</script>

<style scoped lang="scss">

</style>
