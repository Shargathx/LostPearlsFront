<template>
  <div class="">
    <label for="countyId" class="form-label">County</label>
    <select :disabled="disabled"
            :value="selectedCountyId"
            @change="handleCountyDropdownChange"
            id="countyId" class="form-select">

      <option disabled value="0">Please select a county</option>
      <option v-for="county in counties" :key="county.countyId" :value="county.countyId">{{ county.countyName }}</option>
    </select>
  </div>
</template>


<script>
import CountyService from "@/services/CountyService";

export default {
  name: "CountiesDropdown",

  props: {
    selectedCountyId: {
      type: Number,
      default: null,
    },
    disabled: Boolean
  },

  data() {
    return {
      counties: [],
    };
  },

  methods: {
    handleCountyDropdownChange(event) {
      const newValue = Number(event.target.value);
      this.$emit("event-new-county-selected", newValue);
    },
  },

  beforeMount() {
    CountyService.getAllCounties()
        .then(response => this.counties = response.data)
        .catch(error => console.error("Error fetching counties:", error));
    console.log(this.counties);
  }
}
</script>