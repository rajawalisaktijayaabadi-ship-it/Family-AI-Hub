export type MapProvider = 'OpenStreetMap' | 'GoogleMaps' | 'VectorCanvas';
export type MapStyleMode = 'Light' | 'Dark' | 'Satellite' | 'Terrain';

export interface MapTileConfig {
  tileUrl: string;
  attribution: string;
  maxZoom: number;
}

export class MapProviderService {
  static getTileConfig(provider: MapProvider, style: MapStyleMode): MapTileConfig {
    if (provider === 'OpenStreetMap') {
      if (style === 'Dark') {
        return {
          tileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
          maxZoom: 19,
        };
      } else if (style === 'Satellite') {
        return {
          tileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 18,
        };
      }
      return {
        tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      };
    }

    // Google Maps adapter placeholder / Vector canvas
    return {
      tileUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; Google Maps / OpenStreetMap Adapter',
      maxZoom: 20,
    };
  }

  static getStaticMapUrl(
    lat: number,
    lng: number,
    zoom: number = 14,
    width: number = 600,
    height: number = 300
  ): string {
    // OpenStreetMap static image tile helper using Geoapify / Carto fallback URL
    return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=${width}&height=${height}&center=lonlat:${lng},${lat}&zoom=${zoom}&apiKey=static_map_preview_key`;
  }
}
