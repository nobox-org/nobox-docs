---
title: Model.search - Nobox API Reference
description: Explanation of how Nobox Model Method "search" works
---

# `model.search(params)`

The `model.search()` method in Nobox allows you to search for documents in a model based on specified search parameters and customize the returned results using options.

## Parameters
- `params` (object): An object that contains the search parameters. It includes the following properties:
  - `searchableFields` (array): An array of fields to be searched within the model.
  - `searchText` (string): The text to search for within the specified fields.

- `options`: An object that provides additional configuration for the query results. It includes the following properties:

> **Note**: The `search()` method does not support population. If you need to fetch related data, use the `find()` method instead.
  - `pagination` (optional): An object that enables pagination of the query results. It includes the following properties:

    - `limit` (required): The maximum number of records to be returned per page. For example, setting `limit` to 10 will return a maximum of 10 documents per page.

    - `page` (optional): The page number to retrieve. If not specified, the default is the first page. For example, setting `page` to 2 will retrieve the second page of results based on the specified `limit`.

  - `sort` (optional): An object that allows you to sort the query results based on a specific field. It includes the following properties:

    - `by` (required): The field to use for sorting. It should be one of the keys of the `ReturnObject<T>` type. For example, setting `by` to `'createdAt'` will sort the documents based on their creation date.

    - `order` (optional): The sort order for the results. It can be `'asc'` (ascending) or `'desc'` (descending). If not specified, the default is `'asc'`. For example, setting `order` to `'desc'` will sort the documents in descending order.

## Return Value

- `Promise<ReturnObject<T>>[]`: A promise that resolves to an object representing the search result. The object will have the same structure as the model's schema, including additional fields such as `id`, `createdAt`, and `updatedAt`.

## Example: Basic Usage

```ts
// Import your UserModel and necessary resources

// Define the search parameters
const params = {
  searchableFields: ['name', 'description'],
  searchText: 'example',
};

// Define the options for the search
const options = {
  pagination: {
    limit: 10,
    page: 1,
  },
  sort: {
    by: 'name',
    order: 'asc',
  },
};


// Perform the search
const searchResult = await UserModel.search(params, options);

// Output the search result
console.log(searchResult);
```

In the above example, we define the search parameters params with the fields to search (name and description) and the search text (example). We also provide options in the options object, specifying the paramRelationship as 'Or' and populating the author field from the AuthorModel to the authorName field in the search results. We call UserModel.search() with the params and options parameters and await the result. Finally, we log the search result to the console.

## Next steps
- [updateOne](/methods/updateOne)
