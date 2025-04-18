import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    DB_PASSWORD: Joi.string().required().default('MySecretPassword'),
    DB_NAME: Joi.string().required().default('DeliveryDB'),
    DB_HOST: Joi.string().required().default('localhost'),
    DB_PORT: Joi.number().required().default(5432),
    DB_USER: Joi.string().required().default('postgres'),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
});