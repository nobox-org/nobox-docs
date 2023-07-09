---
title: Example Usage
description: How to use nobox via examples
---

# {% $markdoc.frontmatter.title %}

Since you have created the needed structure in the installation and integration process. Below are examples of how nobox can be used.

### Example 1: Insert Data

  ```ts
  //Step 1: import the model from the record structure folder
  import UserModel from "../record-structures/user.ts";

  // Step 2: Insert the Data you want 
  const returnedData = await UserModel.insertOne({
    email: "test@gmail.com",
    password: "123456",
    firstName: "akintunde",
    age: 24
  });
  ```

### Example 2: Insert Data in React

In the case of react , this code will look like this below. Check out on how `UserModel` was used.

```ts
import React, { useState } from 'react';
import UserModel from '../record-structures/user.ts';

function UserComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    age: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const returnedData = await UserModel.insertOne(formData); // Nobox was used here
    console.log('User created:', returnedData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
```

### Example 3: Performing CRUD operations
 
 ```ts

// Insert
const insertedData = await UserModel.insertOne(data);
console({ insertedData });

// FindOne
//The below operation will return the inserted data
const foundData = await UserModel.findOne({id: insertedData.id});
console.log({ foundData})

//UpdateOneById
// The below operation allows you to update a previously inserted record with its id
const updatedData = await UserModel.updateOneById(id, { firstName: "akin2"})
console.log({ updatedData})

// Find
//This will return all data in within that space with `email: test@gmail.com`
const allData = await UserModel.find({email: "test@gmail.com"})
console.log(allData);
```
## Next steps

- [Nobox Usage](/use-nobox)
