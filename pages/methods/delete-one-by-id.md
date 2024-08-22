---
title: Model.deleteOneById - Nobox API Reference
description: Explanation of how Nobox Model Method "deleteOneById" works
---

# `model.deleteOneById(id)`

The `model.deleteOneById()` method in Nobox allows you to delete a single document in a model based on the document's ID.

## Parameters
- `id` (string): The ID of the document to be deleted.

## Return Value
- `Promise\<ReturnObject<T>>`: A promise that resolves to an object representing the deleted document. The object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Define the ID of the document to be updated
const id = '1234567890';

// Perform the update operation
const deletedDocument = await UserModel.deleteOneById(id);

// Output the updated document
console.log(deletedDocument);
```