<template>
  <div class="">
    <label for="countyId" class="form-label">County</label>
    <select :value="selectedCountyId"
            @change="handleCountyDropdownChange"
            id="countyId" class="form-select">

      <option disabled value="">Please select a county</option>
      <option v-for="county in counties" :key="county.id" :value="county.id">{{ county.name }}</option>
    </select>
  </div>
</template>


<script>
export default {
  name: "CountiesDropdown",

  props: {
    selectedCountyId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      counties: [
        { id: 1, name: "Harjumaa" },
        { id: 2, name: "Hiiumaa" },
        { id: 3, name: "Põlva" },
        { id: 4, name: "Rapla" },
        { id: 5, name: "Viljandi" },
        { id: 6, name: "Võrumaa" },
      ],
      selectedCounty: null,
    };
  },
  /*
  props: {
     todo COMMENT THIS IN AFTER getCounties() via backend is working!!!!
    counties: {
      type: Array
    },

    selectedCountyId: {
      type: Number,
      defaultValue: 0
    },
  },
  */

  methods: {
    handleCountyDropdownChange(event) {
      const newValue = Number(event.target.value);
      this.$emit("event-new-county-selected", newValue);
    },
  },
}
</script>