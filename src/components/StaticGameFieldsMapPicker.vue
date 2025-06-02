<template>
  <div>
    <div id="dynamic-map" style="height: 500px;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default {
  name: 'StaticGameFieldsMapPicker',

  props: {
    gameCards: {
      type: Array,
      required: true // expects array of objects with locationLat, locationLng, etc.
    }
  },

  data() {
    return {
      map: null,
      markersLayer: null,
    };
  },

  mounted() {
    this.initMap();
    this.updateMarkers(this.gameCards);
  },

  watch: {
    gameCards: {
      handler(newCards) {
        this.updateMarkers(newCards);
      },
      deep: true
    }
  },

  methods: {
    initMap() {
      this.map = L.map('dynamic-map');

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);

      this.markersLayer = L.layerGroup().addTo(this.map);
    },

    updateMarkers(cards) {
      console.log('Updating markers with cards:', cards); // ✅ See if it's called
      if (!this.map || !this.markersLayer) return;

      this.markersLayer.clearLayers();

      const bounds = [];

      cards.forEach(card => {
        const {locationLat: lat, locationLng: lng, locationName, countyName, status} = card;
        if (this.isValidLatLng(lat, lng)) {
          const marker = L.marker([lat, lng]).bindPopup(
              `<strong>${locationName}</strong><br>${countyName}<br>Status: ${status}`
          );
          marker.addTo(this.markersLayer);
          bounds.push([lat, lng]);
        }
      });

      if (bounds.length > 0) {
        this.map.fitBounds(bounds, {padding: [30, 30]});
      } else {
        this.map.setView([58.5953, 25.0136], 7); // fallback center (Estonia)
      }
    },

    isValidLatLng(lat, lng) {
      return (
          typeof lat === 'number' &&
          typeof lng === 'number' &&
          lat >= -90 && lat <= 90 &&
          lng >= -180 && lng <= 180
      );
    }
  }
};
</script>

<style scoped>
#dynamic-map {
  width: 100%;
  height: 500px;
  border: 5px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
