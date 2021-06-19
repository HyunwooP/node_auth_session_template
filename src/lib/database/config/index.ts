export interface DataBaseEntytiIE {
  // typeorm interface
  name?: string;
  type?: string;
  host?: string;
  port?: string | number;
  username?: string;
  password?: string;
  database?: string;
  synchronize?: boolean;
  logging?: boolean;
  dropSchema?: boolean;
  entities?: string[];
  migrationsTableName?: string;
  cli?: {
    entitiesDir?: string;
    migrationsDir?: string;
    subscribersDir?: string;
  };

  // redis interface
}

export interface DataBaseConfigIE {
  [index: string]: DataBaseEntytiIE;
}

/**
 * Typeorm Mysql config
 */
export const mysqlConfig: DataBaseConfigIE = {
  dev: {
    name: "dev",
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    database: "localDB",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    name: "production",
    type: "mysql",
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
    synchronize: false,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/entity",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
  },
};

/**
 * Typeorm Mongo config
 */
export const mongoConfig: DataBaseConfigIE = {
  dev: {
    name: "dev",
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    username: "root",
    database: "localDB",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    name: "production",
    type: "mongodb",
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
    synchronize: false,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/models/**/*.ts",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
  },
};

export const redisConfig: DataBaseConfigIE = {
  dev: {
    host: "127.0.0.1",
    port: 6379,
  },
  production: {
    host: "",
    port: "",
  },
};
