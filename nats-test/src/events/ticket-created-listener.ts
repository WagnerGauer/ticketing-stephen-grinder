import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

// by extending the Listener class, this class inherits all the methods and properties of the parent class
// the Listener class is a generic class and according to its imprementation I need to pass a type
// argument. TicketCreatedEvent is passed as a type argument to the Listener class here.

// In the implementation of the Listener class it expects to receive a type paremeter by having this
// syntax: <T extends Event>. In this case T will be the type variable TicketCreatedEvent and it will
// extend the Event variable. The event variable contains type anotations that determine that
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data:", data);

    msg.ack();
  }
}
