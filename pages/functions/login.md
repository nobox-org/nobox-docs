---
title: Nobox Login - API Reference
description: Explanation of the Nobox inbuilt function "Login"
---

# Nobox Login

The Nobox inbuilt function "Login" allows users to authenticate and obtain an access token for accessing protected resources within the application. This function is commonly used for user authentication and session management.

## Function Signature

```ts
login({ email, password }: { email: string, password: string }): Promise<{ token: string, user: UserType } | null>
```

## Parameters
- email (string): The email of the user for authentication.
- password (string): The password of the user for authentication.


## Return Value
A promise that resolves to an object containing the access token and the user information if the authentication is successful. If the authentication fails, the promise resolves to null.

##Example: Basic Usage

```ts
import {  getFunctions } from "./nobox";

// create your config
export const Nobox = getFunctions(config);

// Define the login credentials
const email = 'user@example.com';
const password = 'password123';

// Call the login function
const result = await Nobox.login({ email, password });

if (result) {
  // Authentication successful
  const { token, user } = result;
  console.log('Logged in successfully');
  console.log('Access Token:', token);
  console.log('User:', user);
} else {
  // Authentication failed
  console.log('Login failed');
}
```

In the above example, we define the login credentials with the user's email and password. Then, we call the login function with the provided credentials and await the result. If the authentication is successful, we log the access token and user information to the console. Otherwise, we log a failure message.
