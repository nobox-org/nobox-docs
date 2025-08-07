---
title: The Nobox Schema
description: How to Set up Nobox Schema
---

# {% $markdoc.frontmatter.title %}

To perform CRUD operations on records using Nobox, you will need to define the schema for each type of record. For instance, for you to create or delete Users in an application, you will need to define the schema for `Users`.

## Schema Types

Nobox supports two types of schemas for structuring your data: 
   - Rowed Schema
   - Key-Value Schema.
   
Each schema type offers different ways to organize and represent your data. Let's explore these schema types in more detail:

### Rowed Schema

Rowed Schema represents structured data in a row-based format. It is similar to a traditional table structure in a relational database, where each row represents an individual record. Here's an example of defining a Rowed Schema using Nobox:

> Note: Check [Nobox Integration Guide](/integrate-nobox) to see how the config file in the code was created

```typescript
import { Space } from "nobox-client";
import { createRowedSchema } from "../config";

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
}

export const UserStructure: Space<User> = {
  space: "User",
  description: "A Rowed Schema for User records",
  structure: {
    id: {
      description: "User ID",
      type: String,
      required: true,
    },
    name: {
      description: "User's name",
      type: String,
      required: true,
    },
    age: {
      description: "User's age",
      type: Number,
      required: true,
    },
    email: {
      description: "User's email address",
      type: String,
      required: true,
    },
  },
};

export const UserModel = createRowedSchema<User>(UserStructure);
```

In this example, we define a User record with fields such as "id", "name", "age", and "email". Each field has a specified type and can be marked as required or optional based on your needs.

### Advanced Features

Rowed Schema also supports population, allowing you to fetch related data from other record spaces in a single query. This enables you to create rich, relational-like data structures without the complexity of traditional database joins.

**Example:**
```typescript
// Fetch posts with author information
const postsWithAuthors = await PostModel.find(
  {},
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
      }
    ]
  }
);
```

For detailed information about population, see [Population](/methods/populate). 


### Key-Value Schema
Key-Value Schema represents data as a collection of key-value pairs. It is similar to a dictionary or a JSON object structure, where the keys uniquely identify the values associated with them. Here's an example of defining a Key-Value Schema using Nobox:

```typescript
import { Space } from "nobox-client";
import { createKeyValueSchema } from "../config";

interface Settings {
  id: string;
  values: Record<string, any>;
}

export const SettingsStructure: Space<Settings> = {
  space: "Settings",
  description: "A Key-Value Schema for application settings",
  structure: {
    id: {
      description: "Settings ID",
      type: String,
      required: true,
    },
    values: {
      description: "Key-Value pairs representing settings",
      type: Object,
      required: true,
    },
  },
};

export const SettingsModel = createKeyValueSchema<Settings>(SettingsStructure);
```

In this example, we define a Settings record with a "values" field of type Object, which can hold various key-value pairs representing application settings.

These schema types provide flexibility in representing structured data in Nobox. Choose the schema type that best fits your data model and use case to create powerful and scalable applications with ease.

## Differences between Rowed and Key-value Schema
|                   | Rowed Schema                                                                                                                                                                                                                                                                                                            | Key-Value Schema                                                                                                                                                                                                                                                           |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Definition        | Represents structured data in a row-based format, similar to a traditional table structure in a relational database.                                                                                                                                                                                                    | Represents data as a collection of key-value pairs, similar to a dictionary or JSON object structure.                                                                                                                                                                      |
| Methods           | - `find`: Retrieves an array of records that match the specified parameters.                                                                                                                                                                             | - `setKeys`: Sets the key-value pairs for the specified space.                                                                                                                                                                                                               |
|                   | - `findOne`: Retrieves a single record that matches the specified parameters.                                                                                                                                                                           | - `getKeys`: Retrieves the key-value pairs for the specified space.                                                                                                                                                                                                           |
|                   | - `search`: Searches for records based on the provided search text in the specified searchable fields.                                                                                                                                                  |                                                                                                                                                                                                              |
|                   | - `insert`: Inserts an array of records into the specified space.                                                                                                                                                                                     |                                                                                                                                                                                                              |
| Data Structure    | Structured data organized in rows, where each row represents an individual record.                                                                                                                                                                                                                                     | Collection of key-value pairs where keys uniquely identify the associated values.                                                                                                                                                                                        |


## Next steps

- [Schema -  API Reference](/schema/api-reference)
- [Population Guide](/schema/population-guide)