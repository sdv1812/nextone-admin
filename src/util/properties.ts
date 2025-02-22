type environment = 'development' | 'production' | 'test';

type Properties = {
    backend_url: string;
};

const properties: Record<environment, Properties> = {
    development: {
        backend_url: 'http://localhost:3002',
    },
    production: {
        backend_url: 'http://ec2-54-206-86-214.ap-southeast-2.compute.amazonaws.com:3002',
    },
    test: {
        backend_url: 'http://localhost:8080',
    },
};

export const getProperties = (): Properties => {
    const env = process.env.NODE_ENV as environment;
    return properties[env];
};