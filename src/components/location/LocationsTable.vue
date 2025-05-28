<template>
  <div>
    <table class="table-striped">
      <thead>
        <tr>
          <th  scope="col">Nimi
            <a href='#' @click="Navigation.navigateToLocationView()">  </a>
          </th>
          <th scope="col">Maakond</th>
          <th scope="col">Lühiinfo</th>
          <th scope="col">Lisatud kuupäev</th>
          <th scope="col">Hinne</th>
        </tr>
      </thead>
      <tbody>
        <tr>

        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import Navigation from "@/navigation/Navigation";

export default {
  name: "LocationsTable",
  computed: {
    Navigation() {
      return Navigation
    }
  },
  props:{

  },

  data(){
    return{

    }
  }
}
</script>

