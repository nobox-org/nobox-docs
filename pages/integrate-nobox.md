---
title: Integrate Nobox into your project
description: How to integrate nobox into your project
---

# {% $markdoc.frontmatter.title %}

Follow the [Installation process](/install-box) before following the integration steps below.

## Use Nobox Example Project
Depending on how you learn, you can decide to clone or study this [nobox example project](https://github.com/nobox-org/nobox-react-example) and use that to learn how to integrate nobox, else you can follow the steps below


## Integrate Nobox into your project
Follow the steps below to integrate Nobox into your project:
1. Create a folder and name it `nobox`
2. Create a `config.ts` file in the `nobox` folder you created and add the following code:
    ```ts
    import  {  Config,  getFunctions,  getSchemaCreator  }  from  "nobox-client";

    export const config: Config = {
    endpoint:  "https://api.nobox.cloud",
    project:  "[yourproject]",
    token: "[yourToken]",
    };

    export const createRowSchema = getSchemaCreator(config, { type: "rowed" });

    export const createKeyGroupSchema = getSchemaCreator(config, { type: "key-group" });

    export  const  Nobox  =  getFunctions(config);
    ```
    - Replace `[yourProject]` with your desired project name
    - Replace `[yourtoken]` with the token you copied on nobox.cloud website

3. Create a folder called record-structures (or any other name) inside the nobox folder
4. Create a file inside the record-structures folder and name it user.ts (or any other name). This is just an example.
5. Copy the following code into the user.ts file. You can modify the structure as needed:

    ```ts
    import { Space } from "nobox-client";
    import { createSchema } from "../config";

    interface User {
        email: string;
        password: string;
        firstName: string;
        age: number;
    }

    export const UserStructure: Space<User> = {
        space: "User",
        description: "A Record Space for Users",
        structure: {
            email: {
                description: "User's Email",
                type: String,
                required: true
            },
            password: {
                description: "User's Password",
                required: true,
                type: String,
                hashed: true
            },
            firstName: {
                description: "User's First Name",
                required: true,
                type: String,
            },
            age: {
                description: "User's Street Number",
                required: false,
                type: Number,
            }
        }
    }

    export const UserModel = createRowSchema<User>(UserStructure);
    ```

 6. After following these steps, your project folder structure should resemble the following:
    ```md
    .
    ├── next-env.d.ts
    ├── next.config.js
    ├── nobox
    │   ├── config.ts
    │   └── record-structures
    │       ├── app-details.ts
    │       ├── cars.ts
    │       └── user.ts
    ├── package.json
    ├── pages
    │   ├── _app.tsx
    │   ├── _document.tsx
    │   ├── api
    │   │   └── hello.ts
    │   └── index.tsx
    ├── postcss.config.js
    ├── public
    │   ├── favicon.ico
    │   ├── next.svg
    │   └── vercel.svg
    ├── styles
    │   └── globals.css
    ├── tailwind.config.js
    ├── tsconfig.json
    └── yarn.lock
    ```

## Next steps

- [Use Nobox](/nobox-examples)