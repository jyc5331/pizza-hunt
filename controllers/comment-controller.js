const { Comment, Pizza } = require("../models");

const commentController = {
  // add comment to pizza use this to add information to another schema (like thoughts to a user)
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          //$push works exactly like it would in vanilla JS and is built into mongoose
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },

  //the following code removes the comment from the pizza and deletes it
  removeComment({ params }, res) {
    //findoneanddelete deletes whatever is associated with the id and returns the data to us
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          //pull removes the established item to be deleted from the database
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      //the new DB is returned to the user
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
