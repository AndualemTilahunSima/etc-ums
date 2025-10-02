import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV || 'development';

const development = {
    filePath: `${__dirname}/local`
}
const staging = {
    filePath: `${__dirname}/stage`
}

const production = {
    filePath: `${__dirname}/prod`
}

const config = { "development": development, "staging": staging, "production": production }

// Get current environment config
const currentConfig = config[NODE_ENV];

export default currentConfig;