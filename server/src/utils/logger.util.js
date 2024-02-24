const { createLogger, format, transports } = require('winston');
require('winston-mongodb');

const logLevels = {
  info: 'info',
  error: 'error',
  warn: 'warn',
};

const createCustomLogger = (level) => {
  return createLogger({
    level,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: `src/logs/${level}.log`,
        level,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      new transports.MongoDB({
        db: process.env.MONGO_URI,
        options: { useUnifiedTopology: true },
        collection: `logs_${level}`,
        capped: true,
        cappedMax: 5,
        level,
      }),
    ],
  });
};

const allLoggers = {};

Object.keys(logLevels).forEach((level) => {
  allLoggers[level] = createCustomLogger(logLevels[level]);
});

const logger = {
  log: (level, message) => {
    if (logLevels[level]) allLoggers[level][level](message);
  },
};

module.exports = logger;
