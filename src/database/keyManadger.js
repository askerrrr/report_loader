import { MongoClient, ClientEncryption } from "mongodb";

var keyVaultNamespace = process.env.KEY_VAULT_NAME_SPACE;
var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };

var client = new MongoClient(process.env.MONGO_URI);
await client.connect();

var dataKeyId;

var keyVault = client.db(process.env.KEY_VAULT_DATABASE_NAME).collection(process.env.KEY_VAULT_COLLECTION_NAME);
var existingKey = await keyVault.findOne({
  keyAltNames: process.env.MONGO_KEY_ALT_NAME,
});

if (!existingKey) {
  var encryption = new ClientEncryption(client, { kmsProviders, keyVaultNamespace });
  dataKeyId = await encryption.createDataKey("local", { keyAltNames: [process.env.MONGO_KEY_ALT_NAME] });
} else {
  dataKeyId = existingKey._id;
}

await client.close();

export { dataKeyId };
