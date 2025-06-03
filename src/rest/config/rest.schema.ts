import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  DB_HOST: string;
  PORT: number;
  SALT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: string;
  UPLOAD_DIRECTORY: string;
}

export const configRestSchema = convict<RestSchema>({
  DB_HOST: {
    doc: 'IP address of the database server',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_USER: {
    doc: 'Database username',
    format: String,
    env: 'DB_USER',
    default: 'null'
  },
  DB_PASSWORD: {
    doc: 'Database password',
    format: String,
    env: 'DB_PASSWORD',
    default: 'null'
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
  DB_PORT: {
    doc: 'Database port',
    format: 'port',
    env: 'DB_PORT',
    default: '27017'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Upload files directory',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  }
});
