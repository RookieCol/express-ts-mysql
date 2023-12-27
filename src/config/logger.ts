import winston from 'winston';

// Define custom colors for different log levels
const customColors = {
  info: 'yellow',
  error: 'red',
  warn: 'orange',
};

// Inform winston about the custom colors
winston.addColors(customColors);

// Create the logger
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true, colors: customColors }),
        winston.format.simple()
      ),
    }),
  ],
});
