---
title: Integrate Nobox into your Javascript/Typescript project
description: How to integrate nobox into your project
---

# {% $markdoc.frontmatter.title %}
{% callout type="note" %}
You can clone or study our [nobox example project](https://github.com/nobox-org/nobox-react-example)
{% /callout %}

1. Install nobox client `npm i nobox-client` if you haven't
1. Go to [nobox.cloud](https://nobox.cloud) or your local Nobox console, register and copy the token provided
2. Create a folder and name it `nobox` or anything else
3. Create a `config.ts` file in the `nobox` folder you created and add the following code:
    ```ts
    import  {  Config,  getFunctions,  getSchemaCreator  }  from  "nobox-client";

    export const config: Config = {
    endpoint:  "https://api.nobox.cloud", // or http://localhost:8000 if you are running local
    project:  "[yourproject]", //Replace [yourProject] with your desired project name
    token: "[yourToken]", //Replace [yourtoken] with the token you copied in step 2
    };

    export const createRowSchema = getSchemaCreator(config, { type: "rowed" });

    export const createKeyGroupSchema = getSchemaCreator(config, { type: "key-group" });

    export  const  Nobox  =  getFunctions(config);
    ```

4. Create a folder called `record-structures` (or any other name) inside the nobox folder
5. Create a file inside the `record-structures` folder and name it `user.ts` (or any other name). This is just an example.
6. Copy the following code into the `user.ts` file. You can modify the structure as needed:

    ```ts
    import { Space } from "nobox-client";
    import { createRowSchema } from "../config";

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
                description: "User's Age",
                required: false,
                type: Number,
            }
        }
    }

    export const UserModel = createRowSchema<User>(UserStructure);
    ```

 6. After following these steps, your project folder structure should look like the tree representation below::
    ```md
    .
    ├── nobox
    │   ├── config.ts
    │   └── record-structures
    │       ├── app-details.ts
    │       ├── cars.ts
    │       └── user.ts
    ├── package.json
    ```

## Next steps
- [Use Nobox](/nobox-examples)