import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders
} from "ask-sdk-core";
import { Response, SessionEndedRequest } from "ask-sdk-model";
import { Location } from "./Location";

const SKILL_NAME = "Meetup Events";

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = `Benvenuto su ${SKILL_NAME}. Puoi ottenere tutti gli eventi Meetup dicendo i miei eventi`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

const MeetupIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "MeetupIntent"
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const location = new Location(handlerInput.requestEnvelope.context);
    if (false === location.isGeolocationSupported()) {
      return handlerInput.responseBuilder
        .speak(
          `${SKILL_NAME} vorrebbe usare la tua posizione. Per attivare la condivisione della posizione, vai sull' app Alexa e segui le istruzioni`
        )
        .withAskForPermissionsConsentCard([
          "alexa::devices:all:geolocation:read"
        ])
        .getResponse();
    }
    const speechText = "Sono ancora in fase di sviluppo";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText =
      "Puoi ottenere tutti gli eventi Meetup dicendo i miei eventi";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = "A presto!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput): Response {
    console.log(
      `La sessione si è conclusa per via: ${
        (handlerInput.requestEnvelope.request as SessionEndedRequest).reason
      }`
    );

    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Scusa, non riesco a capire il comando. Per favore, ripeti.")
      .reprompt("Scusa, non riesco a capire il comando. Per favore, ripeti.")
      .getResponse();
  }
};

export const meetupHandler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    MeetupIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
