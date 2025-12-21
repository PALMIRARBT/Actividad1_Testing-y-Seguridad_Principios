import mongoose from 'mongoose';
import config from '../env';
import Logger from '../../utils/Logger';


import type { ConnectOptions } from 'mongoose';

const connectOptions: ConnectOptions = {
  // Mongoose 6+ usa estas opciones por defecto, pero puedes agregar más si lo requieres
};

const MONGO_URI = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;



export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

// handlers
db.on('connecting', () => {
  Logger.info('[MongoDB] connecting');
});

db.on('error', (error: any) => {
  Logger.error(`[MongoDB] connection ${error}`);
  mongoose.disconnect();
});

db.on('connected', () => {
  Logger.info('[MongoDB] connected');
});

db.once('open', () => {
  Logger.info('[MongoDB] connection opened');
});

db.on('reconnected', () => {
  Logger.warn('[MongoDB] reconnected');
});

db.on('reconnectFailed', () => {
  Logger.error('[MongoDB] reconnectFailed');
});

db.on('disconnected', () => {
  Logger.warn('[MongoDB] disconnected');
});

db.on('fullsetup', () => {
  Logger.debug('[MongoDB] reconnecting... %d');
});
