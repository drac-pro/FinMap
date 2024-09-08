const mongoose = require('mongoose');
require('dotenv').config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || '127.0.0.1';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'finmap';
    const url = `mongodb://${host}:${port}/${dbName}`;

    this.connectDB(url);
  }

  // method to connect to the mongodb database
  async connectDB(url) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
      this.db = mongoose.connection;
    } catch (error) {
      console.error(`Database Connection Error: ${error.message}`);
      process.exit(1);
    }
  }

  // checks if the database is connected
  isAlive() {
    return this.db && this.db.readyState === 1;
  }
}

module.exports = new DBClient();
