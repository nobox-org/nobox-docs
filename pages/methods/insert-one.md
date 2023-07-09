---
title: Model.insertOne - Nobox API Reference
description: Explanation of how Nobox Model Method "insertOne" works
---

# `model.insertOne(body)`

The `model.insertOne()` method in Nobox allows you to insert a single document into a model. 

## Parameters
  - `body` (object): An object representing the document to be inserted. It should have the same structure as the model's schema.

## Return Value

- `Promise\<ReturnObject<T>>`: A promise that resolves to an object representing the inserted document. The object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your UserModel and necessary resources

// Define the document to be inserted
const document = { name: 'John', age: 25, role: 'user' };

// Insert the document
const insertedDocument = await UserModel.insertOne(document);

// Output the inserted document
console.log(insertedDocument);
```
In the above example, we define a document to be inserted into the UserModel. We then call UserModel.insertOne() with the document object as the body parameter. The method returns a promise that resolves to the inserted document. We log the inserted document to the console for verification.


## Next steps
- [Search](/methods/search)
