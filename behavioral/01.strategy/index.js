import ContextStrategy from './src/base/contextStrategy.js';
import MongoDBStrategy from './src/strategies/mongoDBStrategy.js';
import PostgresStrategy from './src/strategies/postgresStrategy.js';

const connectionStringPostgres = 'postgres://bruna:senha@localhost:5432/heroes';
const postgresContext = new ContextStrategy(
  new PostgresStrategy(connectionStringPostgres),
);
await postgresContext.connect();

const connectionStringMongoDB =
  'mongodb://bruna:senha001@localhost:27017/heroes';
const mongoDBContext = new ContextStrategy(
  new MongoDBStrategy(connectionStringMongoDB),
);

await mongoDBContext.connect();

const data = [
  { name: 'bruna', type: 'transaction' },
  { name: 'maria', type: 'activitylog' },
];

const contextTypes = {
  transaction: postgresContext,
  activitylog: mongoDBContext,
};

for (const { type, name } of data) {
  const context = contextTypes[type];
  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}
