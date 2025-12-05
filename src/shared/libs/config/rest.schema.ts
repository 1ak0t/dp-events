import convict from "convict";
import validators from "convict-format-with-validator";

convict.addFormats(validators);

export type RestSchema = {
    PORT: number;
    SSL_PORT: number;
    SALT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    DB_NAME: string;
    JWT_SECRET: string;
    UPLOAD_DIRECTORY: string;
    SUBSCRIBE_PUB_KEY: string;
    SUBSCRIBE_PRIV_KEY: string;
}

export const configRestSchema = convict<RestSchema>({
    PORT: {
        doc: 'Port for incoming connection',
        format: "port",
        env: 'PORT',
        default: 4874
    },
    SSL_PORT: {
        doc: 'SSL Port for incoming connection',
        format: "port",
        env: 'SSL_PORT',
        default: 4875
    },
    SALT: {
        doc: 'Salt for password hash',
        format: String,
        env: 'SALT',
        default: null
    },
    DB_HOST: {
        doc: 'IP address of the database server',
        format: 'ipaddress',
        env: 'DB_HOST',
        default: '127.0.0.1'
    },
    DB_USER: {
        doc: 'Username to connect to the database',
        format: String,
        env: 'DB_USER',
        default: null,
    },
    DB_PASSWORD: {
        doc: 'Password to connect to the database',
        format: String,
        env: 'DB_PASSWORD',
        default: null,
    },
    DB_PORT: {
        doc: 'Port to connect to the database (MongoDB)',
        format: 'port',
        env: 'DB_PORT',
        default: '27017',
    },
    DB_NAME: {
        doc: 'Database name (MongoDB)',
        format: String,
        env: 'DB_NAME',
        default: 'buy-and-sell'
    },
    JWT_SECRET: {
        doc: 'Secret fo sign JWT',
        format: String,
        env: 'JWT_SECRET',
        default: null
    },
    UPLOAD_DIRECTORY: {
        doc: 'Directory for upload files',
        format: String,
        env: 'UPLOAD_DIRECTORY',
        default: null
    },
    SUBSCRIBE_PRIV_KEY: {
        doc: 'Subscription private key',
        format: String,
        env: 'SUBSCRIBE_PRIV_KEY',
        default: null
    },
    SUBSCRIBE_PUB_KEY: {
        doc: 'Subscription public key',
        format: String,
        env: 'SUBSCRIBE_PUB_KEY',
        default: null
    },
});