<template>
  <div>
    <table class="table table-dark table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Keyword</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="keyword in keywords" :key="keyword.keywordId">
        <td>{{keyword.keyword}}</td>
        <td>
          <font-awesome-icon icon="trash"/>
        </td>

      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "LocationKeywordsTable",
  components: {FontAwesomeIcon},
  props:{
    keywords: Array
  }
}
</script>


