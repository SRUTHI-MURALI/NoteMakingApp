// connection/connection.js
import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/NoteMakingApp')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error(err);
    });
};

export default connectDB;