import { createLogger, format, Logger, transports } from 'winston';
import { ColorizeOptions } from 'logform';
import { hostname } from 'os';

import { version, name } from 'package.json';

export const logLevels: ColorizeOptions = {
  // level: true,
  message: true,
  colors: {
    info: 'blue',
    error: 'red',
    debug: 'green',
  },
};
const maxsize: number = parseInt(
  process.env.MAX_LOG_SIZE ? process.env.MAX_LOG_SIZE : '5000000',
  10,
);
const maxFiles: number = parseInt(
  process.env.MAX_LOG_FILES ? process.env.MAX_LOG_FILES : '5',
  10,
);

function getTimeZone(): string {
  const date = new Date();
  const utc =
    date.getUTCFullYear.toString() +
    '-' +
    date.getUTCMonth() +
    '-' +
    date.getUTCDate() +
    '-' +
    date.getUTCHours() +
    '-' +
    date.getUTCMinutes() +
    '-' +
    date.getUTCSeconds() +
    '-' +
    date.getUTCMilliseconds();
  return utc;
}

export function getLogger(
  host_name: string,
  application_name: string,
  buildVersion: string,
  level: string,
): Logger {
  const env = process.env.NODE_ENV;
  if ('production' === env) {
    return createLogger({
      transports: [
        new transports.Console({
          level: 'error',
          handleExceptions: false,
          format: format.combine(
            format.colorize({
              message: true,
            }),
            format.timestamp(),
            format.simple(),
            format.printf(
              (info) =>
                `[${getTimeZone()}]:[${host_name.toString()}]:[${application_name.toString()}]:[${buildVersion}]:[${
                  process.env.NODE_ENV
                }]:[ ${info.level.toUpperCase()} ]: ${info.message}`,
            ),
          ),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          handleExceptions: false,
          maxsize,
          maxFiles,
          format: format.combine(
            format.timestamp(),
            format.ms(),
            format.json(),
            format.printf(
              (info) =>
                `[${getTimeZone()}]:[${host_name.toString()}]:[${application_name.toString()}]:[${buildVersion}]:[${
                  process.env.NODE_ENV
                }]:[ ${info.level.toUpperCase()} ]: ${info.message}`,
            ),
          ),
        }),
      ],
      exceptionHandlers: [
        new transports.File({
          filename: 'logs/exceptions.log',
          level,
          maxsize,
          maxFiles,
        }),
      ],
    });
  }
  if ('staging' === env) {
    return createLogger({
      transports: [
        new transports.Console({
          level: 'error',
          handleExceptions: false,
          format: format.combine(
            format.colorize({
              message: true,
            }),
            format.timestamp(),
            format.simple(),
            format.printf(
              (info) =>
                `[${getTimeZone()}]:[${host_name.toString()}]:[${application_name.toString()}]:[${buildVersion}]:[${
                  process.env.NODE_ENV
                }]:[ ${info.level.toUpperCase()} ]: ${info.message}`,
            ),
          ),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          handleExceptions: false,
          maxsize,
          maxFiles,
          format: format.combine(
            format.timestamp(),
            format.ms(),
            format.json(),
            format.printf(
              (info) =>
                `[${getTimeZone()}]:[${host_name.toString()}]:[${application_name.toString()}]:[${buildVersion}]:[${
                  process.env.NODE_ENV
                }]:[ ${info.level.toUpperCase()} ]: ${info.message}`,
            ),
          ),
        }),
      ],
      exceptionHandlers: [
        new transports.File({
          filename: 'logs/exceptions.log',
          level,
          maxsize,
          maxFiles,
        }),
      ],
    });
  } else {
    return createLogger({
      transports: [
        new transports.Console({
          level,
          handleExceptions: false,
          format: format.combine(
            format.colorize(logLevels),
            format.timestamp(),
            format.simple(),
            format.printf(
              (info) =>
                `[${getTimeZone()}]:[${host_name.toString()}]:[${application_name.toString()}]:[${buildVersion}]:[${
                  process.env.NODE_ENV
                }]:[ ${info.level.toUpperCase()} ]: ${info.message}`,
            ),
          ),
        }),
        new transports.File({
          filename: 'logs/combined.log',
          level,
          handleExceptions: false,
          maxsize,
          maxFiles,
          format: format.combine(
            format.timestamp(),
            format.ms(),
            format.json(),
            format.printf(
              (info) =>
                `[${getTimeZone()}]:[${host_name.toString()}]:[${application_name.toString()}]:[${buildVersion}]:[${
                  process.env.NODE_ENV
                }]:[ ${info.level.toUpperCase()} ]: ${info.message}`,
            ),
          ),
        }),
      ],
      exceptionHandlers: [
        new transports.File({
          filename: 'logs/exceptions.log',
          level,
          maxsize,
          maxFiles,
        }),
      ],
    });
  }
}
export const logger = getLogger(
  hostname(),
  name,
  version,
  process.env.LOGGER_LEVEL ?? 'debug',
);
