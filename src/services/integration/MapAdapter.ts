export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export interface MapMarker {
  id: string;
  title: string;
  lat: number;
  lng: number;
  icon?: string;
  address?: string;
}

export interface MapProviderAdapter {
  id: 'google_maps' | 'openstreetmap' | 'mapbox';
  name: string;
  getStaticMapUrl(center: MapCoordinates, zoom?: number): string;
  getEmbedUrl(center: MapCoordinates): string;
  geocodeAddress(address: string): Promise<MapCoordinates>;
}

export class GoogleMapsAdapter implements MapProviderAdapter {
  id = 'google_maps' as const;
  name = 'Google Maps Platform API';

  getStaticMapUrl(center: MapCoordinates, zoom = 14): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:red%7C${center.latitude},${center.longitude}&key=MOCK_GOOGLE_MAPS_KEY`;
  }

  getEmbedUrl(center: MapCoordinates): string {
    return `https://maps.google.com/maps?q=${center.latitude},${center.longitude}&z=15&output=embed`;
  }

  async geocodeAddress(address: string): Promise<MapCoordinates> {
    // Geocoding fallback for Indonesia default coordinates (Jakarta)
    return { latitude: -6.2088, longitude: 106.8456 };
  }
}

export class OpenStreetMapAdapter implements MapProviderAdapter {
  id = 'openstreetmap' as const;
  name = 'OpenStreetMap (OSM) Free Tier';

  getStaticMapUrl(center: MapCoordinates, zoom = 14): string {
    return `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${center.longitude},${center.latitude}&z=${zoom}&l=map&size=600,300`;
  }

  getEmbedUrl(center: MapCoordinates): string {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${center.longitude - 0.01}%2C${
      center.latitude - 0.01
    }%2C${center.longitude + 0.01}%2C${center.latitude + 0.01}&layer=mapnik&marker=${center.latitude}%2C${
      center.longitude
    }`;
  }

  async geocodeAddress(): Promise<MapCoordinates> {
    return { latitude: -6.2088, longitude: 106.8456 };
  }
}
