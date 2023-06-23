import { Subject } from "./subjects";


export interface TicketCreatedEvent {
    readonly subject: Subject.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}