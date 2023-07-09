---
title: Model.updateOne - Nobox API Reference
description: Explanation of how Nobox Model Method "updateOne" works
---

# `model.updateOne(query, body, options)`

The `model.updateOne()` method in Nobox allows you to update a single document in a model based on specified parameters including

## Parameters
- `query` (object): An object that represents the search criteria. Each key in the object corresponds to a field in the model and an extra key called `id` for querying by id, and its value is used to match documents with matching field values.

- `body` (object): An object that contains the updated data for the document. The structure of this object should match the model's schema.

## Return Value

- `Promise\<ReturnObject<T>>`: A promise that resolves to an object representing the updated document. The object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your UserModel and necessary resources

// Define the parameters for the update operation
const params = {
  id: '1234567890',
};

// Define the updated data
const body = {
  name: 'John Doe',
  age: 30,
};
         
// Perform the update operation
const updatedDocument = await UserModel.updateOne(params, body);

// Output the updated document
console.log(updatedDocument);
```

## Next steps
- [updateOneById](/methods/update-one-by-id)


