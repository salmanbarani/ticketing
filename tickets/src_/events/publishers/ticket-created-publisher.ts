import { Publisher, Subject, TicketCreatedEvent } from "@salmantickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subject.TicketCreated;
}