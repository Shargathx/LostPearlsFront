<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12">
        <h2>MINU SISESTATUD ASUKOHAD</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-10 ">
        <LocationsTable/>
      </div>

    </div>
  </div>
</template>


<script>
import LocationsTable from "@/components/location/LocationsTable.vue";

export default {
  name: "LocationsView",
  components: {LocationsTable},
  data(){
    return {
      //todo uuri kas Martinil tekib session storage
      userId: 1,
      roleName: ''
    }
  }

}
</script>


