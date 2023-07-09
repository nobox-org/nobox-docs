---
title: Schema - API Reference
description: API Reference for Schema
---

# {% $markdoc.frontmatter.title %}

## Schema Structure
Here are the available options you can include in your schema structure:

- `space` (string): The name of the schema space. It represents the logical grouping or category of your data.
- `description` (string): A description of the schema, providing additional information about its purpose or usage.
- `structure` (object or Type Constructor): An object that defines the properties for your fields or a type constructor that determines the type of your field

For Example:

```ts
//....

const userSchema: Space<User> = {
  space: "User",
  description: "Schema for User records",
  structure: {
    id: String,
    name: String,
    age: Number,
    email: {
      type: String,
      required: true,
      description: "User's email address",
    },
  },
};
//....

```

## Structure

There are two ways to define the structure of a schema, you can specify the field property with an Object value or a type constructor. Here are examples explaining the concept below:

{% side-by-side %}

{% item %}

### Example: Using Object Value

{% markdoc-example %}

```ts
const userSchema: Space<User> = {
  space: "User",
  description: "Schema for User records",
  // With Descriptive Object Value for Each Fields
  structure: {
    id: {
      type: String,
      required: true,
      description: "User ID",
    },
    name: {
      type: String,
      required: true,
      description: "User's name",
    },
    age: {
      type: Number,
      required: true,
      description: "User's age",
    },
    email: {
      type: String,
      required: true,
      description: "User's email address",
    },
  },
};
```

{% /markdoc-example %}

When using the object value: Here are the available configuration options for each property:

- `type` (string or constructor): The data type of the property. Below are the data types allowed.
    - `String`: Represents textual data.
    - `Number`: Represents numeric data.
    - `Boolean`: Represents a boolean value (true or false).
    - `Array`: Represents an array of values. You can choose the appropriate data type based on the nature of your data and the operations you intend to perform.
- `required` (boolean): Indicates whether the property is required or optional.
- `defaultValue` (any): Specifies a default value for the property if no value is provided.
- `hashed` (boolean): Indicates whether the property value should be hashed for secure storage, such as passwords or sensitive data.
- `comment` (string): A comment or additional information about the property.

{% /item %}

{% item %}

### Example: Using Type Constructors

{% markdoc-example %}

```ts
const userSchema: Space<User> = {
  space: "User",
  description: "Schema for User records",
  // With Only String COnstructor
  structure: {
    id: String,
    name: String,
    age: Number,
    email: {
      type: String,
      required: true,
      description: "User's email address",
    },
  },
};
```

{% /markdoc-example %}


When using the type constructor: Here are the available types for each property, same as the `type` field in the Object Configuration above:
- `String`: Represents textual data.
- `Number`: Represents numeric data.
- `Boolean`: Represents a boolean value (true or false).
- `Array`: Represents an array of values. You can choose the appropriate data type based on the nature of your data and the operations you intend to perform.

**Note**: When type constructor is being used instead of the Object configuration, the other configuration fields are assumed with the following defaults:
- `required`: false,
-  `description`: empty string
-  `required`: empty string
-  `defaultValue`: undefined
- `hashed`: false
- `comment`: undefined


{% /markdoc-example %}

{% /item %}

{% /side-by-side %}


### Example: Using Both Object Value and Type Constructors


```ts
const userSchema: Space<User> = {
  space: "User",
  description: "Schema for User records",
  // With Only String COnstructor
  structure: {
    id: String,
    name: String,
    age: Number,
    email: String,
  },
};
```

## Next steps

- [Schema Example Usage](/schema/example-usage)