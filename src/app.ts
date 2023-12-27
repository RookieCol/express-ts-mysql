import Server from './server';
import dotenv from 'dotenv';
dotenv.config()
const server = new Server();
server.listen(process.env.PORT || '8000');
