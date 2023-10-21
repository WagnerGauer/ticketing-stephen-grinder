import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@wagtickets/common/build";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
