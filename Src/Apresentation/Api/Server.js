const port = 3000
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./server/database/daelink-database.json');
const fs = require('fs');
const path = require('path');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const listEndpoints = require('express-list-endpoints');


const router = require('./server/routes/index');


const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
 console.log(`Servidor funcionando!!! ${port}!`)
  const endpoints = listEndpoints(app);
  console.log('Rotas disponíveis:');
  endpoints.forEach(endpoint => {
    console.log(`${endpoint.methods.join(', ')} ${endpoint.path}`);
  });

}
);
