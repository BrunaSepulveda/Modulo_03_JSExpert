// const express = require('express');

// const app = express();
// app.use(express.json());

// curl -i localhost:3000
InjectHttpInterceptor()
import http from 'http';
import { InjectHttpInterceptor } from '../src/agent';

function handleRequest(request, response) {
  response.end('Oi gente!');
}

const server = http.createServer(handleRequest);
const port = 3000;
server.listen(port, () =>
  console.log('Rodando na porta', server.address().port),
);
