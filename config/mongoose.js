import mongoose from "mongoose";

const username = 'praneshaditya3';
const password = 'Pranesh#3013';
const dbName = 'IssueTracker';

const encodedPassword = encodeURIComponent(password);

// Construct the URI using template literals
const uri = `mongodb+srv://praneshaditya3:pK0r0ib69tCyQUzv@cluster0.es9mcig.mongodb.net/`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting MongoDB'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});


