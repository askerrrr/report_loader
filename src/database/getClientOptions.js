var getClientOptions = () => {
  var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };

  var extraOptions = {
    cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH,
    cryptSharedLibRequired: true,
  };
  var auth = {
    username: process.env.MONGO_AUTH_USER,
    password: process.env.MONGO_AUTH_PWD,
  };

  var autoEncryption = {
    kmsProviders,
    extraOptions,
    keyVaultNamespace: process.env.KEY_VAULT_NAME_SPACE,
    bypassAutoEncryption: true,
  };

  var options = {
    auth,
    autoEncryption,
    autoIndex: false,
    serverSelectionTimeoutMS: 5000,
    authSource: process.env.MONGO_AUTH_DB,
    authMechanism: process.env.MONGO_AUTH_MECHANISM || "SCRAM-SHA-1",
  };

  return options;
};

export default getClientOptions;
