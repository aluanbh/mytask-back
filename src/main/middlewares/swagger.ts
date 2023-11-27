import swaggerUi from 'swagger-ui-express';
import swaggerDocJson from '@/main/documentation/swagger.json';

export const swagger = swaggerUi;
export const swaggerBaseURL = '/api-docs';
export const swaggerDocument = swaggerDocJson;
