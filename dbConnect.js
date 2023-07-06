const mongoose = require('mongoose');

async function connectToDB() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@blogai.whyjkyb.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}
connectToDB();
