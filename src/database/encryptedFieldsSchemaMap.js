import { dataKeyId } from "./keyManadger.js";

var schemaMap = { fields: [{ path: `${process.env.DB_NAME}.token`, bsonType: "string", keyId: [dataKeyId] }] };

export { schemaMap };
