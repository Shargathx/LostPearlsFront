<template>
  <div>
    <div id="map" style="height: 400px;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  // iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  // iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  // shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
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
      counties: [],
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
      const {lat, lng} = e.latlng;
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
      if (this.map && this.map._container) {
        this.map.setZoom(newLevel);
      } else {
        console.warn('Map not ready, cannot set zoom');
      }
    }

  },


  methods: {

    isValidLatLng(lat, lng) {
      return (
          typeof lat === "number" && !isNaN(lat) &&
          typeof lng === "number" && !isNaN(lng) &&
          lat >= -90 && lat <= 90 &&
          lng >= -180 && lng <= 180
      );
    },

    setMarker(lat, lng) {
      if (!this.isValidLatLng(lat, lng)) {
        console.warn("Invalid lat/lng passed to setMarker:", lat, lng);
        return; // skip invalid coords
      }
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }
    },

    updateMarkerPosition(lat, lng) {
      if (this.isValidLatLng(lat, lng)) {
        this.setMarker(lat, lng);
        this.map.panTo([lat, lng]);
      } else {
        console.warn("Invalid lat/lng for updateMarkerPosition:", lat, lng);
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

