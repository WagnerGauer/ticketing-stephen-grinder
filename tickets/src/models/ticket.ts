import mongoose from "mongoose";

// defines the expected attributes of a new ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// defines the expected attributes of a ticket document in MongoDB
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// extends mongoose's Model interface and creates custom interface called TicketModel which inherits
// type anotations from the Model interface and also defines a new anotation which defines that
// TicketModel interface can have a function called build which has to receive a parameter called
interface TicketModel extends mongoose.Model<TicketDoc> {
  // It is not necessary to have the parameter name to be the same as the one in the actual
  // function implementation, but it is good to be consistent. What is important is to anotate that
  // the parameter must be of type TicketAttrs and the return type of the function must be of type TicketDoc
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },

  // this is an optional object that allows me to change the behavior
  // when storing and retrieving a document from the database
  {
    // this is one of the options that are available in this optional object
    toJSON: {
      transform(doc, ret) {
        // Here I can define the JSON representation of the document data that is
        //  returned(what the json object sent upon a query looks like)
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
// here I access the build function and pass
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
