---
title: Schema Creation Concepts
description: Some Concepts on Nobox Schema
---

# {% $markdoc.frontmatter.title %}

## Required Fields and Default Values
Fields in a schema can be marked as required or optional. Required fields must have a value assigned to them when creating or updating records. Optional fields, on the other hand, can be left empty if needed.

You can specify the required flag for each field in the schema definition. For example:

```ts
age: {
  description: "User's age",
  type: Number,
  required: true,
}
```

Additionally, you can define default values for fields using the default property. The default value will be assigned to the field if no explicit value is provided during record creation. Here's an example:
```ts
age: {
  description: "User's age",
  type: Number,
  defaultValue: 18,
},

```

## Hashing Fields
Nobox allows you to apply hashing to any field within your schema. Hashing sensitive data adds an extra layer of security by transforming the data into a fixed-size hash value that is non-reversible.

To hash a field in Nobox, you can use the `hashed: true` option in the field definition within the schema. This option instructs Nobox to automatically hash the field value before storing it in the database.

Here's an example:
```ts
age: {
  description: "User's Password",
  type: Number,
  defaultValue: 18,
}
```

### Benefits of Field Hashing
Hashing sensitive fields in your Nobox schema offers several benefits:
- Data Security: Hashing transforms sensitive data into a non-reversible format, making it more secure. Even if the database is compromised, the original data remains protected.
- Privacy Protection: By hashing sensitive fields, you ensure that the actual values are not easily accessible to unauthorized individuals or even administrators with database access.
- Data Integrity: Hashing allows you to verify the integrity of the data. If the hashed value matches the stored hash, it indicates that the field value has not been tampered with.

### Note on Querying
When using a hashed field in your schema, it's important to note that the hashed value will be stored and used for querying purposes. This means you can still query with your hashed field. However, when records are returned through any of the Rowed Schema methods, the hashed field value will not be included. This ensures that the hashed value remains protected and secure.

## Next steps

- [Creating Schemas](/schema/concepts)