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

## Next steps

- [Creating Schemas](/schema/creation-guide)