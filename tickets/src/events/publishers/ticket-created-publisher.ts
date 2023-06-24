import { Publisher, Subject, TicketCreatedEvent } from "@salmantickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
}