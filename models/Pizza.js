const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    //12-14 and the dateFormat file will get you prettier timestamps, you need to import dateFormat AND set getters to true in toJSON
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
    },
    //for the following, you could also do toppings: Array
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        //ref tells mongoose from whence to populate the specified array, in our case this is Comment.js
        ref: "Comment",
      },
    ],
  },
  {
    //this allows us to employee virtuals
    toJSON: {
      virtuals: true,
      getters: true,
    },
    //this tells mongoose to not automatically generate an id when we use virtuals
    id: false,
  }
);
//virtuals allow you to create properties that are NOT stored in the database

// get total count of comments and replies on retrieval
// Here we're using the .reduce() method to tally up the total of every comment with its replies. In its basic form, .reduce() takes two parameters, an accumulator and a currentValue. Here, the accumulator is total, and the currentValue is comment. As .reduce() walks through the array, it passes the accumulating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array.
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
