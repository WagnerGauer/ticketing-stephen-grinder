import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

// This will enforce that the argument type passed to Listener contains a property called
// subject and its value is of type Subjects which is an enum which so far contains the
// property TicketCreated and OrderUpdated

// Bottom line:
// This interface allows me to force the custom type parameter passed to the generic Listener class to
// contain a property name subject whose value is present in one option in the Subjects enum

// It also says that the property data can be of any type which allows me to anotate the property data
// however I want in the concrete class implementation
interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
