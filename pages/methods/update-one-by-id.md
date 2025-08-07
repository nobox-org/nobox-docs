---
title: Model.updateOneById - Nobox API Reference
description: Explanation of how Nobox Model Method "updateOneById" works
---

# `model.updateOneById(id, body)`

The `model.updateOneById()` method in Nobox allows you to update a single document in a model based on the document's ID and with the provided data in the `body` object.

## Parameters
- `id` (string): The ID of the document to be updated.

- `body` (object): An object that contains the updated data for the document. The structure of this object should match the model's schema.

## Return Value

- `Promise\<ReturnObject<T>>`: A promise that resolves to an object representing the updated document. The object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your UserModel and necessary resources

// Define the ID of the document to be updated
const id = '1234567890';

// Define the updated data
const body = {
  name: 'John Doe',
  age: 30,
};

// Perform the update operation
const updatedDocument = await UserModel.updateOneById(id, body);

// Output the updated document
console.log(updatedDocument);
```

## Next steps
- [GetTokenOwner](/methods/get-token-owner)
- [Search](/methods/search)


