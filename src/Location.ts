import { ILocation } from "./Interfaces/ILocation";
import { Context } from "ask-sdk-model";

export class Location implements ILocation {
  readonly geoObject: Context;

  constructor(geoObject: Context) {
    this.geoObject = geoObject;
  }

  isGeolocationSupported(): Boolean {
    if (this.geoObject?.System.device?.supportedInterfaces.Geolocation) {
      if (
        !this.geoObject?.Geolocation ||
        !this.geoObject?.Geolocation?.coordinate
      ) {

        return false;
      }
      return true
    }

    return false;
  }
}
