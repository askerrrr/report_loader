var getClientOptions = () => {
  var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };
  var extraOptions = { cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH, cryptSharedLibRequired: true };

  var authOptions = JSON.parse(process.env.MONGO_AUTH_OPTIONS);
  var autoEncryption = { kmsProviders, extraOptions, keyVaultNamespace: process.env.KEY_VAULT_NAME_SPACE, bypassAutoEncryption: true };
  var options = { autoEncryption, serverSelectionTimeoutMS: 5000, ...authOptions };

  return options;
};

export default getClientOptions;
