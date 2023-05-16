import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.APP_PORT || 8000;

app.listen(port, () => {
    console.log("Application Start");
});
