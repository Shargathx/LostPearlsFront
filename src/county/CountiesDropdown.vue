<template>
  <div class="">
    <label for="countyId" class="form-label">County</label>
    <select :disabled="disabled"
            :value="selectedCountyId"
            @change="handleCountyDropdownChange"
            id="countyId" class="form-select">

      <option disabled value="0">Please select a county</option>
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
    disabled: Boolean
  },

  data() {
    return {
      counties: [
        {id: 1, name: "Harjumaa"},
        {id: 2, name: "Hiiumaa"},
        {id: 3, name: "Põlva"},
        {id: 4, name: "Rapla"},
        {id: 5, name: "Viljandi"},
        {id: 6, name: "Võrumaa"},
      ],
    };
  },

  methods: {
    handleCountyDropdownChange(event) {
      const newValue = Number(event.target.value);
      this.$emit("event-new-county-selected", newValue);
    },
  },
}
</script>