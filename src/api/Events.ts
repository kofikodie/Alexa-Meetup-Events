import axios from "axios";
export class Events {
  async getEvents(latitude: number, longitude: number): Promise<string> {
    const BASE_URL =
      "https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public";
    const NUMBER_OF_EVENTS = 5;
    if (!latitude || !longitude) {
      return "Nessun evento trovato nella tua zona";
    }
    try {
      const response = await axios.get(
        `${BASE_URL}&lon=9.74&page=${NUMBER_OF_EVENTS}&lat=45.73`
      );
      return JSON.stringify(response.data);
    } catch (error) {
      console.error("Errore risposta api", error);
      return "Nessun evento trovato nella tua zona";
    }
  }
}
