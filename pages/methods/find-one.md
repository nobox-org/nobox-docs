---
title: Model.findOne() - Nobox API Reference
description: Explanation of how Nobox Model Methods "FindOne" works
---

# `model.findOne(query, options)`

The `model.findOne()` method in Nobox allows you to retrieve a single document from a model based on a specified query and customize the returned result using options.

> **💡 Tip**: This method supports population to fetch related data from other record spaces. See the [Population Example](#example-with-population) below or visit [Population](/methods/populate) for detailed information. 

## Parameters 

- `query`: An object that represents the search criteria. Each key in the object corresponds to a field in the model, and its value is used to match documents with matching field values. For example, `{ age: 25, role: 'admin' }` will return a document where the `age` field is 25 and the `role` field is "admin".

- `options`: An object that provides additional configuration for the query result. It includes the following properties:

  - `paramRelationship` (optional): Specifies the relationship between multiple search parameters. It can be set to `'Or'` or `'And'`. When set to `'Or'`, the query will return a document that matches any of the provided search parameters. When set to `'And'`, the query will return a document that matches all of the provided search parameters. If not specified, the default behavior is `'And'`.

  - `populate` (optional): An array of population configurations to fetch related data from other record spaces. See [Population](/methods/populate) for detailed information.


With the `model.findOne()` method, you can retrieve a single document that matches specific criteria. Adjust the query and options based on your model's fields and desired behavior.

## Return Value

- `Promise\<ReturnObject<T>>`: A promise that resolves to an objects representing the inserted documents. Each object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
//.... import your Usermodel and necessary resources here

// Define the parameters for the findOne operation
const params = {
  id: '123456789',
};

// Define the options for the findOne operation
const options = {
  paramRelationship: 'And',
};

// Perform the findOne operation
const result = await UserModel.findOne(params, options);

// Output the result
console.log(result);
```

## Example: With Population

```ts
// Find a single post with author and category information
const postWithDetails = await PostModel.findOne(
  { id: "post123" },
  {
    populate: [
      {
        fields: {
          from: "user",
          localKey: "authorId",
          foreignKey: "id",
          newField: "author"
        },
        space: "user"
      },
      {
        fields: {
          from: "category",
          localKey: "categoryId",
          foreignKey: "id",
          newField: "category"
        },
        space: "category"
      }
    ]
  }
);

// Result includes populated author and category data
console.log(postWithDetails);
```

## Next steps

- [Insert](/methods/insert)
- [Search](/methods/search)