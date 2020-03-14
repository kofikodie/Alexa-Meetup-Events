import {Context, interfaces} from "ask-sdk-model";
import GeolocationState = interfaces.geolocation.GeolocationState;
import {ILocation} from "./Interfaces/ILocation";

export class Location implements ILocation{
  readonly #context: Context;

  constructor(context: Context) {
    this.#context = context;
  }

  isGeolocationSupported(): Boolean {
    const isGeolocationSupported =
        this.#context.System.device.supportedInterfaces.Geolocation;
    if (true === isGeolocationSupported) {
      const geoObject: GeolocationState = this.#context.Geolocation;
      if (!geoObject || !geoObject.coordinate) {
        return false
      }
      return true;
    }
    return false;
  }
}
