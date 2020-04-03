import axios from "axios";
import { EventsEntity, IEvents } from "../Interfaces/IEvents";

export class Events {
  async getEvents(latitude: number, longitude: number): Promise<string> {
    const MEETUP_API_KEY = "Pending";
    let meetupEvents = `Ecco alcuni eventi interessanti nella tua zona. `;
    const apiClient = axios.create({
      baseURL: `https://api.meetup.com/find/upcoming_events?key${MEETUP_API_KEY}&sign=true&photo-host=public`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const BASE_URL = `https://api.meetup.com/find/upcoming_events?key${MEETUP_API_KEY}&sign=true&photo-host=public`;
    const NUMBER_OF_EVENTS = 5;
    if (!latitude || !longitude) {
      return "Nessun evento trovato nella tua zona";
    }
    try {
      const response = await apiClient.get<IEvents>(
        `${BASE_URL}&lon=${longitude}&page=${NUMBER_OF_EVENTS}&lat=${latitude}`
      );
      response.data.events.forEach((event: EventsEntity) => {
        meetupEvents += `A ${event.venue.city} nella sede di ${event.venue.name} si terrà il meetup sul ${event.name} il ${event.local_date} alle ${event.local_time} organizzato da ${event.group.who} `;
      });

      return meetupEvents;
    } catch (error) {
      console.error("Errore risposta api", error);

      return "Nessun evento trovato nella tua zona";
    }
  }
}
