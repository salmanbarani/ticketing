import { Subject } from "./subjects";


export interface TicketUpdatedEvent {
    readonly subject: Subject.TicketUpdated;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}