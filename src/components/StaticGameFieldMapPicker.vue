<template>
  <div>
    <div id="map" style="height: 500px;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Set default marker icons (so they don't 404)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default {
  name: 'StaticGameFieldsMapPicker',
  props: {
    zoomLevel: Number,
    latitude: Number,
    longitude: Number,

    markers: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['update:latitude', 'update:longitude', 'update:zoomLevel'],
  data() {
    return {
      map: null,
      marker: null,
      mapReady: false
    };
  },


  mounted() {
    const defaultLat = 58.7;
    const defaultLng = 25.0;

    const lat = this.isValidNumber(this.latitude) ? this.latitude : defaultLat;
    const lng = this.isValidNumber(this.longitude) ? this.longitude : defaultLng;
    const zoom = this.zoomLevel || 7;

    this.map = L.map('map').setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    this.setMarker(lat, lng);

    // Initialize the layer group for markers:
    this.markersLayer = L.layerGroup().addTo(this.map);

    this.map.on('zoomend', () => {
      const zoomLevel = this.map.getZoom();
      this.$emit('update:zoomLevel', zoomLevel);
    });

    this.mapReady = true;
  },

  watch: {
    markers: {
      handler(newMarkers) {
        this.updateMarkers(newMarkers);
      },
      deep: true,
    },
  },


  computed: {
    coordinates() {
      return [this.latitude, this.longitude, this.zoomLevel];
    }
  },

  methods: {


    updateMarkers(markers) {
      if (!this.markersLayer) {
        this.markersLayer = L.layerGroup().addTo(this.map);
      }
      this.markersLayer.clearLayers(); // remove old markers

      markers.forEach(({ lat, lng }) => {
        if (this.isValidLatLng(lat, lng)) {
          L.marker([lat, lng]).addTo(this.markersLayer);
        } else {
          console.warn('Invalid marker coords:', lat, lng);
        }
      });
    },

    isValidNumber(value) {
      return typeof value === 'number' && !isNaN(value);
    },

    isValidLatLng(lat, lng) {
      return (
          this.isValidNumber(lat) &&
          this.isValidNumber(lng) &&
          lat >= -90 && lat <= 90 &&
          lng >= -180 && lng <= 180
      );
    },

    setMarker(lat, lng) {
      if (!this.isValidLatLng(lat, lng)) {
        console.warn("Invalid lat/lng passed to setMarker:", lat, lng);
        return;
      }
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng], {draggable: false}).addTo(this.map);
      }
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
  border: 5px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
