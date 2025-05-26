<template>
  <div id="map" style="height: 600px;"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the broken default icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default {
  name: 'MapPicker',
  props: {
    zoomLevel: Number,
    latitude: Number,
    longitude: Number
  },
  emits: ['update:latitude', 'update:longitude', 'update:zoomLevel'],
  data() {
    return {
      map: null,
      marker: null,
    };
  },


  mounted() {
    const defaultLat = 58.7;
    const defaultLng = 25.0;

    const isValidNumber = (value) =>
        typeof value === 'number' && !isNaN(value);

    const lat = isValidNumber(this.latitude) ? this.latitude : defaultLat;
    const lng = isValidNumber(this.longitude) ? this.longitude : defaultLng;

    this.map = L.map('map').setView([lat, lng], this.zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    this.setMarker(lat, lng);


    this.map.on('zoomend', () => {
      const zoomLevel = this.map.getZoom();
      this.$emit('update:zoomLevel', zoomLevel);
    });

    this.map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this.setMarker(lat, lng);
      this.$emit('update:latitude', parseFloat(lat.toFixed(18)));
      this.$emit('update:longitude', parseFloat(lng.toFixed(18)));
    });
  },


  watch: {
    latitude(newLat) {
      this.updateMarkerPosition(newLat, this.longitude);
    },
    longitude(newLng) {
      this.updateMarkerPosition(this.latitude, newLng);
    },
    zoomLevel(newLevel) {
      this.map.setZoom(newLevel)
    },

  },


  methods: {

    setMarker(lat, lng) {
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }
    },
    updateMarkerPosition(lat, lng) {
      if (lat !== null && lng !== null) {
        this.setMarker(lat, lng);
        this.map.panTo([lat, lng]);
      }
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px; /* or whatever size you're using */
  border: 5px solid #ccc; /* Light gray border */
  border-radius: 8px; /* Optional: rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow */
}
</style>

