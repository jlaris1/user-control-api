export const config = () => ({
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity.js'],
    autoLoadEntities: true,
    ssl: {
      rejectUnauthorized: false
    }
    //migrations: ['dist/**/migration/.ts']
  },
  googleOauth: {
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    callbackUrl: process.env.CALLBACK_URL
  }
});