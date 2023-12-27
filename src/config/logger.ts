import winston from 'winston';

const customColors = {
  info: 'yellow',
  error: 'red',
  warn: 'orange',
};

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true, colors: customColors })),
    }),
  ],
});
