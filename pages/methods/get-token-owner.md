---
title: Model.getTokenOwner - Nobox API Reference
description: Explanation of how Nobox Model Method "getTokenOwner" works
---

# `model.getTokenOwner(token)`

The `model.getTokenOwner()` method in Nobox allows you to retrieve the owner of a token associated with a model.

Note: This token should be the token returned by `Nobox.login`, and the model used here should be the model used for creating `Nobox.login`

## Parameters
- `token` (string): The token for which you want to retrieve the owner.

## Return Value

- `Promise\<ReturnObject<T>>`: A promise that resolves to an object representing the owner of the token. The object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your UserModel and necessary resources

// Define the token for which you want to retrieve the owner
const token = 'abcdef123456';

// Retrieve the token owner
const tokenOwner = await UserModel.getTokenOwner(token);

// Output the token owner
console.log(tokenOwner);
```
In the above example, we define the token for which we want to retrieve the owner. We call UserModel.getTokenOwner() with the token parameter and await the result. Finally, we log the token owner to the console.


## Next steps

- [SetKeys](/model/set-keys)