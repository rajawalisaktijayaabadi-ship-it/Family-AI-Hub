import { WeatherModel } from '../../types/integration';

export interface WeatherAdapter {
  id: 'bmkg' | 'openweather';
  name: string;
  getWeatherForCity(city: string): Promise<WeatherModel>;
}

export class BMKGWeatherAdapter implements WeatherAdapter {
  id = 'bmkg' as const;
  name = 'BMKG Indonesia Open Data API';

  async getWeatherForCity(city: string): Promise<WeatherModel> {
    return {
      city: city || 'Jakarta Selatan',
      province: 'DKI Jakarta',
      temperatureC: 29,
      condition: 'Cerah Berawan',
      humidity: 78,
      windSpeedKmH: 12,
      uvIndex: 6,
      airQualityAQI: 65,
      forecast7Days: [
        { day: 'Senin', condition: 'Cerah Berawan', tempHigh: 32, tempLow: 24 },
        { day: 'Selasa', condition: 'Hujan Ringan', tempHigh: 30, tempLow: 24 },
        { day: 'Rabu', condition: 'Berawan', tempHigh: 31, tempLow: 25 },
        { day: 'Kamis', condition: 'Cerah', tempHigh: 33, tempLow: 25 },
        { day: 'Jumat', condition: 'Hujan Lebat', tempHigh: 28, tempLow: 23 },
        { day: 'Sabtu', condition: 'Cerah Berawan', tempHigh: 31, tempLow: 24 },
        { day: 'Minggu', condition: 'Cerah', tempHigh: 33, tempLow: 25 },
      ],
    };
  }
}
