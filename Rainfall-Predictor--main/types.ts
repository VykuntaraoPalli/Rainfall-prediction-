
export interface RainfallData {
  SUBDIVISION: string;
  YEAR: number;
  JAN: number;
  FEB: number;
  MAR: number;
  APR: number;
  MAY: number;
  JUN: number;
  JUL: number;
  AUG: number;
  SEP: number;
  OCT: number;
  NOV: number;
  DEC: number;
  ANNUAL: number;
}

export interface ModelMetrics {
  name: string;
  trainAccuracy: number;
  testAccuracy: number;
  description: string;
}

export interface PredictionFeatures {
  pressure: number;
  temperature: number;
  humidity: number;
  cloudCover: number;
  windSpeed: number;
}
