---
title: Model.getKeys - Nobox API Reference
description: Explanation of how Nobox Model Method "getKeys" works
---

# `model.getKeys()`

The `model.getKeys()` method in Nobox allows you to retrieve the key values stored in a key-group model.

## Return Value

- `Promise<Array<ReturnObject<T>>>`: A promise that resolves to an array of objects representing the key values. Each object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your KeyGroupModel and necessary resources

// Retrieve the key values
const keys = await KeyGroupModel.getKeys();

// Output the key values
console.log(keys);
```

The model.getKeys() method retrieves all the key values stored in a key-group model. It returns an array of objects representing the key values. Each object in the array has the same structure as the model's schema, including additional fields such as id, createdAt, and updatedAt. Use this method to fetch the key values and utilize them in your application as needed.