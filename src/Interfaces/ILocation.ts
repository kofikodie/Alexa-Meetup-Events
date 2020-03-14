export interface ILocation {
  isGeolocationSupported(): Boolean;
  getLatitude(): number;
  getLongitude(): number;
}
