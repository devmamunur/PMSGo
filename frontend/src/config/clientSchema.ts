import z from 'zod';
require('dotenv').config();

const envSchema = z.object({
    APP_ENVIRONMENT: z
        .enum(['local', 'development', 'production'])
        .default('local'),
    NEXT_PUBLIC_LOCAL_API: z.string().optional(),
    NEXT_PUBLIC_DEVELOPMENT_API: z.string().optional(),
    NEXT_PUBLIC_PRODUCTION_API: z.string().optional(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
});
const extendedEnvSchema = envSchema.extend({
    BASE_URL: z.string(),
});

const clientEnvCheck = envSchema.safeParse(process.env);

if (!clientEnvCheck.success) {
    console.error('There is an error with the server environment variables');
    // console.error(clientEnvCheck.error.issues);
    process.exit?.(1);
}

console.log('The server environment variables are valid!');

let BASE_URL = '';
const APP_ENVIRONMENT: string = 'local';
if (APP_ENVIRONMENT === 'local') {
    BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API || '';
} else if (APP_ENVIRONMENT === 'development') {
    BASE_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_API || '';
} else if (APP_ENVIRONMENT === 'production') {
    BASE_URL = process.env.NEXT_PUBLIC_PRODUCTION_API || '';
}
export const clientEnv = {
    ...clientEnvCheck.data,
    BASE_URL: BASE_URL,
};
