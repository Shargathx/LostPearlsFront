<template>
  <div>
    <table class="table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th class="col" scope="col">Nimi</th>
          <th scope="col">Maakond</th>
          <th scope="col">Lühiinfo</th>
          <th scope="col">Lisatud kuupäev</th>
          <th scope="col">Asukoht</th>
          <!--<th scope="col">Hinne</th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="userLocation in userLocations" :key="userLocation.locationId">
          <td>{{userLocation.locationName}}</td>
          <td>{{userLocation.countyName}}</td>
          <td>{{userLocation.teaser}}</td>
          <td>{{userLocation.dateAdded}}</td>
          <td>
            <button @click="navigateToLocationView(userLocation.locationId)">Vaata</button></td>
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

