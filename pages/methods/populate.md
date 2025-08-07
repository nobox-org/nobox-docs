---
title: Population - Nobox API Reference
description: Explanation of how Nobox Population works to fetch related data
---

# Population

Population in Nobox allows you to fetch related data from other record spaces in a single query, similar to SQL JOINs but with the flexibility of NoSQL. This feature enables you to create rich, relational-like data structures without the complexity of traditional database joins.

## Overview

Population works by defining relationships between record spaces using field mappings. When you perform a `find()` or `findOne()` operation, you can specify population options to automatically fetch related data and include it in your results.

## Population Structure

The population is defined in the `options` parameter using the `populate` property:

```typescript
export type Options<T extends CObject> = {
  // ... other options
  populate?: {
    fields: {
      from: string;        // Source space name
      foreignKey: string;  // Field in source space to match
      localKey: string;    // Field in current record to match against
      newField: string;    // New field name to add populated data
    };
    space: string;         // Target space name
  }[];
};
```

## Parameters

### `populate` Array
An array of population configurations, each containing:

- **`fields.from`** (string): The name of the source record space to fetch data from. This is the `space` property from your schema definition (e.g., "user", "category", "profile")
- **`fields.foreignKey`** (string): The field name in the source space to match against
- **`fields.localKey`** (string): The field name in the current record to match with the foreign key
- **`fields.newField`** (string): The name of the new field that will contain the populated data
- **`fields.multi`** (boolean, optional): When `true`, returns an array of related records. When `false` or omitted, returns a single record. Defaults to `false`.
- **`space`** (string): The target space name (usually same as `from`). This should match the `space` property from your schema definition

## Where Do the Values Come From?

The `from` and `space` values come from the `space` property in your schema definitions. Here's how to find them:

### Schema Definitions
```typescript
// User Schema
export const UserStructure: Space<User> = {
  space: "user",           // ← This is your "from" value
  description: "User records",
  structure: { /* ... */ }
};

// Profile Schema  
export const ProfileStructure: Space<Profile> = {
  space: "profile",        // ← This is your "from" value
  description: "User profiles",
  structure: { /* ... */ }
};

// Category Schema
export const CategoryStructure: Space<Category> = {
  space: "category",       // ← This is your "from" value
  description: "Post categories", 
  structure: { /* ... */ }
};
```

### Using in Population
```typescript
// When populating, use the "space" values from your schemas
const postsWithDetails = await PostModel.find(
  {},
  {
    populate: [
      {
        fields: {
          from: "user",        // ← From UserStructure.space
          localKey: "authorId",
          foreignKey: "id", 
          newField: "author"
        },
        space: "user"          // ← Same as "from"
      },
      {
        fields: {
          from: "category",    // ← From CategoryStructure.space
          localKey: "categoryId",
          foreignKey: "id",
          newField: "category"
        },
        space: "category"      // ← Same as "from"
      }
    ]
  }
);
```

## Relationship Types

### One-to-One Relationship
When each record in the current space has at most one related record in the source space.

```typescript
// Example: User → Profile (one user has one profile)
{
  fields: {
    from: "profile",        // ← From ProfileStructure.space
    localKey: "id",         // User.id
    foreignKey: "userId",   // Profile.userId
    newField: "profile"     // Result: user.profile
  },
  space: "profile"          // ← Same as "from"
}
```

### Many-to-One Relationship
When multiple records in the current space can relate to the same record in the source space.

```typescript
// Example: Post → User (many posts can belong to one user)
{
  fields: {
    from: "user",
    localKey: "authorId",      // Post.authorId
    foreignKey: "id",          // User.id
    newField: "author"         // Result: post.author
  },
  space: "user"
}
```

## Examples

### Example 1: Basic Population

```typescript
// Define schemas
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Find posts with author information
const postsWithAuthors = await PostModel.find(
  { authorId: "user123" },
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

// Result:
// [
//   {
//     id: "post1",
//     title: "Getting Started with Nobox",
//     content: "Nobox is a powerful BaaS solution...",
//     authorId: "user123",
//     author: {
//       id: "user123",
//       name: "John Doe",
//       email: "john@example.com"
//     }
//   }
// ]
```

### Example 2: Multiple Population Fields

```typescript
// Find posts with both author and category information
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
```

### Example 3: One-to-Many Population

```typescript
// Find users with all their posts (one-to-many)
const usersWithPosts = await UserModel.find(
  {},
  {
    populate: [
      {
        fields: {
          from: "post",
          localKey: "id",
          foreignKey: "authorId",
          newField: "posts",
          multi: true  // ← Returns array of posts
        },
        space: "post"
      }
    ]
  }
);

// Result:
// [
//   {
//     id: "user123",
//     name: "John Doe",
//     email: "john@example.com",
//     posts: [
//       { id: "post1", title: "First Post", authorId: "user123" },
//       { id: "post2", title: "Second Post", authorId: "user123" }
//     ]
//   }
// ]
```

### Example 4: Real-World Use Case

Based on a practical blog system implementation:

```typescript
// Define record structures
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  publishedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

// Fetch posts with populated data
const getPostsWithDetails = async (userId?: string) => {
  const posts = await PostModel.find(
    userId ? { authorId: userId } : {},
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

  return posts.map((post: any) => ({
    ...post,
    authorName: post.author?.name,
    authorEmail: post.author?.email,
    categoryName: post.category?.name
  }));
};
```

## Best Practices

### 1. **Field Naming**
- Use descriptive names for `newField` to clearly indicate the relationship
- Consider using camelCase for consistency with JavaScript conventions

### 2. **Performance Considerations**
- Population adds complexity to queries, so use it judiciously
- Consider the number of related records that will be fetched
- For large datasets, consider pagination

### 3. **Type Safety**
- Define interfaces for populated data to maintain type safety
- Use TypeScript interfaces to describe the expected structure

```typescript
interface PostWithAuthor extends Post {
  author?: User;
  category?: Category;
}
```

### 4. **Error Handling**
- Handle cases where related data might not exist
- Use optional chaining when accessing populated fields

```typescript
const authorEmail = post.author?.email || 'No email available';
```

## Method Support

Population is supported by the following methods:
- ✅ **`find()`**: Full population support
- ✅ **`findOne()`**: Full population support
- ❌ **`search()`**: Population not supported
- ❌ **`insert()`**: Population not supported
- ❌ **`insertOne()`**: Population not supported
- ❌ **`updateOne()`**: Population not supported
- ❌ **`updateOneById()`**: Population not supported
- ❌ **`deleteOneById()`**: Population not supported

## Limitations

1. **Single Query**: Population happens in a single query, so all related data is fetched at once
2. **No Nested Population**: Currently, you cannot populate data from already populated fields
3. **No Aggregation**: Population is for fetching related records, not for aggregating data
4. **Limited Method Support**: Only `find()` and `findOne()` methods support population

## Quick Reference

### Finding Space Names
```typescript
// Look at your schema definitions:
export const UserStructure: Space<User> = {
  space: "user",           // ← Use this as "from" and "space"
  // ...
};

export const CategoryStructure: Space<Category> = {
  space: "category",       // ← Use this as "from" and "space"
  // ...
};
```

### Population Template
```typescript
{
  fields: {
    from: "SPACE_NAME",    // ← From your schema.space
    localKey: "FIELD_IN_CURRENT_RECORD",
    foreignKey: "FIELD_IN_SOURCE_RECORD", 
    newField: "NEW_FIELD_NAME",
    multi: false           // ← true for arrays, false for single record
  },
  space: "SPACE_NAME"      // ← Same as "from"
}
```

## Next Steps

- [Find Method](/methods/find)
- [FindOne Method](/methods/find-one)
- [Search Method](/methods/search)
- [Schema Overview](/schema/overview) 