---
title: Nobox API Reference
description: Complete API reference for Nobox backend as a service
---

# Nobox API Reference

Complete API reference for Nobox backend as a service.

## Authentication

```typescript
import { NoboxClient } from "nobox-client";

const client = new NoboxClient({
  token: "your-api-token",
  projectId: "your-project-id"
});
```

## Schema Types

### Rowed Schema
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}
```

### Key-Value Schema
```typescript
interface Settings {
  id: string;
  values: Record<string, any>;
}
```

## CRUD Operations

### Create
- `insert(data: T[])` - Insert multiple records
- `insertOne(data: T)` - Insert single record

### Read
- `find(filter?, options?)` - Get multiple records
- `findOne(filter?, options?)` - Get single record

### Update
- `updateOne(filter, data)` - Update single record
- `updateOneById(id, data)` - Update by ID

### Delete
- `deleteOneById(id)` - Delete by ID

## Search Operations

```typescript
const results = await UserModel.search({
  searchableFields: ['name', 'email'],
  searchText: 'john'
});
```

## File Operations

```typescript
const upload = await UserModel.upload(file, {
  folder: 'avatars',
  maxSize: 5 * 1024 * 1024
});
```

## Advanced Features

### Population
```typescript
const postsWithAuthors = await PostModel.find({}, {
  populate: [{
    fields: {
      from: "user",
      localKey: "authorId", 
      foreignKey: "id",
      newField: "author"
    },
    space: "user"
  }]
});
```

### Key-Value Operations
- `setKeys(keys)` - Set key-value pairs
- `getKeys()` - Get all key-value pairs
- `getTokenOwner()` - Get token owner info

## Error Handling

```typescript
try {
  const user = await UserModel.insertOne(data);
} catch (error) {
  console.error('Error:', error.message);
}
```

## Next Steps

- [Install Nobox](/install-nobox)
- [Integration Guide](/integrate-nobox)
- [Examples](/nobox-examples) 