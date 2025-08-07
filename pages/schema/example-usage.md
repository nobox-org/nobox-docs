---
title: Example Usage - Rowed Schema vs Key-Value Schema
description: Examples on how to setup rowed and key group schemas in Nobox
---

# {% $markdoc.frontmatter.title %}
In this example, we'll demonstrate the usage of Nobox with both Rowed Schema and Key-Value Schema, emphasizing their differences in data structure and available methods.

### Rowed Schema Example
Rowed Schema represents structured data in a row-based format, similar to a traditional table structure in a relational database. Let's create a simple "User" record using Rowed Schema.

#### Step 1: Define the Rowed Schema
First, define the Rowed Schema for the "User" record:

```ts
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

export const UserModel = createSchema<User>(UserStructure);
```
#### Step 2: Perform Operations with Rowed Schema
Now, let's perform some operations using the Rowed Schema:

```ts
// Find all users
const allUsers = await UserModel.find();
console.log("All Users:", allUsers);

// Insert a new user
const newUser = {
  id: "1",
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
};
const insertedUser = await UserModel.insertOne(newUser);
console.log("Inserted User:", insertedUser);

// Update user by ID
const updatedUser = await UserModel.updateOneById("1", { age: 31 });
console.log("Updated User:", updatedUser);
```
With Rowed Schema, data is structured in rows, and we can perform operations like finding all users, inserting new users, and updating existing users by their ID.

### Advanced Rowed Schema with Population

Rowed Schema also supports population to fetch related data from other record spaces:

```ts
// Define related schemas
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string; // Foreign key to User
  categoryId: string; // Foreign key to Category
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

// Find posts with author and category using population
const postsWithDetails = await PostModel.find(
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

// Result includes populated author and category for each post
console.log(postsWithDetails);
```

### Key-Value Schema Example
Key-Value Schema represents data as a collection of key-value pairs, similar to a dictionary or JSON object structure. Let's create a simple "Settings" record using Key-Value Schema.

#### Step 1: Define the Key-Value Schema
First, define the Key-Value Schema for the "Settings" record:

```ts
import { Space } from "nobox-client";
import { createSchema } from "../config";

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

export const SettingsModel = createSchema<Settings>(SettingsStructure);
```

#### Step 2: Perform Operations with Key-Value Schema
Now, let's perform some operations using the Key-Value Schema:

```ts
// Set key-value pairs for settings
const settingsData = {
  id: "1",
  values: {
    theme: "dark",
    notifications: true,
  },
};
const updatedSettings = await SettingsModel.setKeys(settingsData);
console.log("Updated Settings:", updatedSettings);

// Get all key-value pairs for settings
const allSettings = await SettingsModel.getKeys();
console.log("All Settings:", allSettings);
```

With Key-Value Schema, we can set key-value pairs for settings and retrieve all key-value pairs associated with the settings.

### Important Note: Interface Definition Best Practices

When defining interfaces for your record structures, **do not include** `id`, `createdAt`, and `updatedAt` fields in your interface definition. These fields are automatically added by Nobox and are always returned with every record.

**❌ Incorrect:**
```ts
interface User {
  id: string;           // Don't include these
  name: string;
  age: number;
  email: string;
  createdAt: string;    // Don't include these
  updatedAt: string;    // Don't include these
}
```

**✅ Correct:**
```ts
import { ReturnObject } from "nobox-client";

interface User {
  name: string;
  age: number;
  email: string;
  // id, createdAt, updatedAt are automatically added
}

// For return types, use ReturnObject<T>
const user: ReturnObject<User> = await UserModel.findOne({ email: "john@example.com" });
```

The `ReturnObject<T>` type automatically extends your interface with the required fields:
```ts
type ReturnObject<T> = T & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
```

## Next steps

- [Interface Guidelines](/schema/interface-guidelines)
- [Population Guide](/schema/population-guide)
- [Population API Reference](/methods/populate)