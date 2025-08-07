---
title: Population Guide - Best Practices
description: A comprehensive guide to using population in Nobox
---

# Population Guide

This guide provides best practices and advanced techniques for using population in Nobox.

## Understanding Relationships

### Where Do Space Names Come From?
The `from` and `space` values in population come from the `space` property in your schema definitions:

```typescript
// Your schema definitions
export const UserStructure: Space<User> = {
  space: "user",           // ← Use this as "from" and "space"
  // ...
};

export const CategoryStructure: Space<Category> = {
  space: "category",       // ← Use this as "from" and "space"  
  // ...
};
```

### One-to-One Relationships
- Each record in the current space has at most one related record
- Example: User → Profile

### Many-to-One Relationships  
- Multiple records can relate to the same record
- Example: Post → User (many posts, one user)

### One-to-Many Relationships
- One record relates to multiple records
- Use with `multi: true` option

```typescript
// Example: User → Posts (one user has many posts)
{
  fields: {
    from: "post",
    localKey: "id",         // User.id
    foreignKey: "authorId", // Post.authorId
    newField: "posts",
    multi: true             // ← Returns array of posts
  },
  space: "post"
}
```

## Advanced Patterns

### Conditional Population
```typescript
// First, check your schema definitions to get the space names:
// UserStructure.space = "user"
// CategoryStructure.space = "category"

const posts = await PostModel.find(
  { published: true },
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
      }
    ]
  }
);
```

### Multiple Population Levels
```typescript
// Fetch posts with author and author's profile
const postsWithAuthorAndProfile = await PostModel.find(
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
          from: "profile",
          localKey: "author.id", // Access populated field
          foreignKey: "userId",
          newField: "authorProfile"
        },
        space: "profile"
      }
    ]
  }
);
```

## Performance Optimization

### 1. Selective Population
Only populate the fields you need:
```typescript
// Only populate essential author fields
const posts = await PostModel.find(
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

### 2. Pagination with Population
```typescript
const posts = await PostModel.find(
  {},
  {
    pagination: {
      limit: 10,
      page: 1
    },
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

## Common Patterns

### User Management System
```typescript
// Users with profiles and posts
const usersWithDetails = await UserModel.find(
  {},
  {
    populate: [
      {
        fields: {
          from: "profile",
          localKey: "id",
          foreignKey: "userId",
          newField: "profile"
        },
        space: "profile"
      },
      {
        fields: {
          from: "post",
          localKey: "id",
          foreignKey: "authorId",
          newField: "posts"
        },
        space: "post"
      }
    ]
  }
);
```

### E-commerce System
```typescript
// Products with category and reviews
const productsWithDetails = await ProductModel.find(
  {},
  {
    populate: [
      {
        fields: {
          from: "category",
          localKey: "categoryId",
          foreignKey: "id",
          newField: "category"
        },
        space: "category"
      },
      {
        fields: {
          from: "review",
          localKey: "id",
          foreignKey: "productId",
          newField: "reviews"
        },
        space: "review"
      }
    ]
  }
);
```

## Real-World Use Case: Blog Management System

Based on a practical blog system implementation:

```typescript
// Define interfaces
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  publishedAt: string;
  status: "draft" | "published" | "archived";
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

// Calculate post statistics
const calculatePostStats = (posts: any[]) => {
  let publishedPosts = 0;
  let draftPosts = 0;
  let archivedPosts = 0;

  posts.forEach((post: any) => {
    switch (post.status) {
      case "published":
        publishedPosts++;
        break;
      case "draft":
        draftPosts++;
        break;
      case "archived":
        archivedPosts++;
        break;
    }
  });

  return {
    total: posts.length,
    published: publishedPosts,
    draft: draftPosts,
    archived: archivedPosts
  };
};
```

## Troubleshooting

### Common Issues

1. **No Related Data Found**
   - Check that the `localKey` and `foreignKey` values match
   - Verify the source space exists and contains data
   - **Verify the `from` and `space` values match your schema definitions**

2. **Type Errors**
   - Define proper TypeScript interfaces for populated data
   - Use optional chaining when accessing populated fields

3. **Performance Issues**
   - Limit the number of populated fields
   - Use pagination for large datasets
   - Consider if population is necessary for your use case

4. **Space Name Errors**
   - Ensure `from` and `space` values match the `space` property in your schema definitions
   - Check that the source record space exists in your project
   - Verify spelling and case sensitivity of space names

### Debugging Tips

```typescript
// Log the query to debug population issues
const posts = await PostModel.find(
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

console.log('Posts with population:', JSON.stringify(posts, null, 2));
```

## Best Practices Summary

1. **Use Descriptive Field Names**: Choose clear names for `newField` that indicate the relationship
2. **Handle Missing Data**: Always use optional chaining when accessing populated fields
3. **Type Safety**: Define TypeScript interfaces for your populated data structures
4. **Performance**: Only populate what you need and consider pagination for large datasets
5. **Error Handling**: Gracefully handle cases where related data doesn't exist

## Next Steps

- [Population API Reference](/methods/populate)
- [Schema Overview](/schema/overview)
- [Find Method](/methods/find) 