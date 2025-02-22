type environment = 'development' | 'production' | 'test';

type Properties = {
    backend_url: string;
};

const properties: Record<environment, Properties> = {
    development: {
        backend_url: 'http://localhost:3002',
    },
    production: {
        backend_url: 'https://api.example.com',
    },
    test: {
        backend_url: 'http://localhost:8080',
    },
};

export const getProperties = (): Properties => {
    const env = process.env.NODE_ENV as environment;
    return properties[env];
};