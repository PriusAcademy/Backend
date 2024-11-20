import { IncomingMessage } from "http";

export interface CustomIncomingMessage extends IncomingMessage {
    rawBody : any
}