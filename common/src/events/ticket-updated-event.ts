import { Subjects } from "./subjects";

export interface TicketUpadatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
