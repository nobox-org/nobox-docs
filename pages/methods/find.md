---
title: Model.find - Nobox API Reference
description: Explanation of how Nobox Model Methods "Find" works
---


# `model.find(query, options)`
The `model.find()` method in Nobox allows you to retrieve documents from a model based on a specified query and customize the returned results using options.

## Parameters 

- `query`: An object that represents the search criteria. Each key in the object corresponds to a field in the model, and its value is used to match documents with matching field values. For example, `{ age: 10, gender: 'female' }` will return documents where the `age` field is 10 and the `gender` field is "female".

- `options`: An object that provides additional configuration for the query results. It includes the following properties:

  - `paramRelationship` (optional): Specifies the relationship between multiple search parameters. It can be set to `'Or'` or `'And'`. When set to `'Or'`, the query will return documents that match any of the provided search parameters. When set to `'And'`, the query will return documents that match all of the provided search parameters. If not specified, the default behavior is `'And'`.

  - `pagination` (optional): An object that enables pagination of the query results. It includes the following properties:

    - `limit` (required): The maximum number of records to be returned per page. For example, setting `limit` to 10 will return a maximum of 10 documents per page.

    - `page` (optional): The page number to retrieve. If not specified, the default is the first page. For example, setting `page` to 2 will retrieve the second page of results based on the specified `limit`.

  - `sort` (optional): An object that allows you to sort the query results based on a specific field. It includes the following properties:

    - `by` (required): The field to use for sorting. It should be one of the keys of the `ReturnObject<T>` type. For example, setting `by` to `'createdAt'` will sort the documents based on their creation date.

    - `order` (optional): The sort order for the results. It can be `'asc'` (ascending) or `'desc'` (descending). If not specified, the default is `'asc'`. For example, setting `order` to `'desc'` will sort the documents in descending order.

With the `model.find()` method, you can efficiently retrieve documents that match specific criteria and control the pagination and sorting of the returned results. Adjust the query and options based on your model's fields and desired behavior.

## Return Value

- `Promise\<ReturnObject<T>[]>`: A promise that resolves to an array of objects representing the inserted documents. Each object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
//.... import your Usermodel  and necessary resources heres

// Define the parameters for the find operation
const params = {
  age: 25,
  role: 'admin',
};

// Define the options for the find operation
const options = {
  paramRelationship: 'And',
  pagination: {
    limit: 10,
    page: 1,
  },
  sort: {
    by: 'name',
    order: 'asc',
  },
};

// Perform the find operation
const results = await UserModel.find(params, options);

// Output the results
console.log(results);
```

## Next steps

- [FindOne](/methods/find-one)