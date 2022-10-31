const { MongoClient, ServerApiVersion } = require('mongodb');
const dbUsername = 'andreroda235';
const dbPass = '3yKdive4ymfcH3iJ';
const uri = `mongodb+srv://andreroda235:${dbPass}@simple-app-cluster.0qbj7eb.mongodb.net/simple-app?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });