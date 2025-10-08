/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBook = onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      const {isbn, name} = request.body || {};
      if (!isbn || !name) {
        return response
            .status(400)
            .json({error: "'isbn' and 'name' are required fields."});
      }

      const docRef = await admin.firestore().collection("books").add({
        isbn,
        name,
      });
      return response.status(201)
          .json({id: docRef.id, message: "Book added successfully"});
    } catch (error) {
      console.error("Error add books:", error.message);
      response.status(500).send("Error add book");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const bookList = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        bookList.push(doc.data());
      });
      res.status(200).send({bookList});
    } catch (error) {
      console.error("Error getting books:", error.message);
      res.status(500).send("Error getting books");
    }
  });
});

setGlobalOptions({maxInstances: 10});


