<template>
  <div>
    <table class="table-striped table-hover table-bordered me-2">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">County</th>
          <th scope="col">Description</th>
          <th scope="col">Date added</th>
          <th scope="col">Location</th>
          <!--<th scope="col">Hinne</th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="userLocation in userLocations" :key="userLocation.locationId">
          <td class="p-2">{{userLocation.locationName}}</td>
          <td class="p-2">{{userLocation.countyName}}</td>
          <td class="p-2">{{userLocation.teaser}}</td>
          <td class="p-2">{{userLocation.dateAdded}}</td>
          <td>
            <button class="btn btn-info me-1 ms-1" @click="navigateToLocationView(userLocation.locationId)">Go to</button></td>
          <!-- mis hrefi? , vaja oleks et läheks valitud asukohta!!-->
          <!--<a href='/location/" + locationId' @click="Navigation.navigateToLocationView(locationId)">  </a>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import Navigation from "@/navigation/Navigation";
import navigation from "@/navigation/Navigation";

export default {
  name: "LocationsTable",
  computed: {

  },
  props:{
    userLocations: Array
  },



  methods:{

    navigateToLocationView(locationId){
      Navigation.navigateToLocationEditView(locationId)
    }
  },

}
</script>

