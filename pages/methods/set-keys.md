---
title: Model.setKeys - Nobox API Reference
description: Explanation of how Nobox Model Method "setKeys" works
---

# `model.setKeys(body)`

The `model.setKeys()` method in Nobox allows you to set key-value pairs in the key-group model.

## Parameters
- `body` (object): An object representing the key-value pairs to be set in the key-group model. Each key-value pair should correspond to a field and its value in the model's schema.

## Return Value

- `Promise\<ReturnObject<T>[]>`: A promise that resolves to an array of objects representing the updated key-value pairs. Each object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your KeyGroupModel and necessary resources

// Define the key-value pairs to be set
const keyValues = {
  key1: 'value1',
  key2: 'value2',
};

// Set the key-value pairs
const updatedKeys = await KeyGroupModel.setKeys(keyValues);

// Output the updated key-value pairs
console.log(updatedKeys);

```

## Next steps

- [GetKeys](/methods/get-keys)
- [Search](/methods/search)
