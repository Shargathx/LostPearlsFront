<template>
  <div>
    <table class="table-striped table-hover table-bordered me-2">
      <thead>
        <tr>
          <th scope="col">Nimi</th>
          <th scope="col">Maakond</th>
          <th scope="col">Lühiinfo</th>
          <th scope="col">Lisatud kuupäev</th>
          <th scope="col">Detailne vaade</th>
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
            <button class="btn btn-info me-1 ms-1" @click="navigateToLocationView(userLocation.locationId)">Vaata</button></td>
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

