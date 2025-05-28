<template>
  <div>
    <h2>{{ locationInfo.locationName }}</h2>
    <ul>
      <li><strong>County ID:</strong> {{ locationInfo.countyId }}</li>
      <li><strong>Longitude:</strong> {{ locationInfo.longitude }}</li>
      <li><strong>Latitude:</strong> {{ locationInfo.latitude }}</li>
      <li><strong>Teaser:</strong> {{ locationInfo.teaser }}</li>
      <li><strong>Extended Info:</strong> {{ locationInfo.extendedInfo }}</li>
      <li><strong>Question:</strong> {{ locationInfo.question }}</li>
      <li><strong>Answer:</strong> {{ locationInfo.answer }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    locationInfo: {
      type: Object,
      required: true
    }
  }
};
</script>
