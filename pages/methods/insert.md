---
title: Model.insert - Nobox API Reference
description: Explanation of how Nobox Model Method "insert" works
---

# `model.insert(body)`

The `model.insert()` method in Nobox allows you to insert multiple documents into a model. 

## Parameters
  - `body` (array): An array of objects representing the documents to be inserted. Each object should have the same structure as the model's schema.

## Return Value

- `Promise\<ReturnObject<T>[]>`: A promise that resolves to an array of objects representing the inserted documents. Each object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your UserModel and necessary resources

// Define the documents to be inserted
const documents = [
  { name: 'John', age: 25, role: 'user' },
  { name: 'Jane', age: 30, role: 'admin' },
];

// Insert the documents
const insertedDocuments = await UserModel.insert(documents);

// Output the inserted documents
console.log(insertedDocuments);
```

## Next steps

- [InsertOne](/methods/insert-one)
- [Search](/methods/search)
