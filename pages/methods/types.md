---
title: Types of Nobox Methods
description: API Reference for Type of Nobox Methods
---

# Types of Nobox Methods
There are two types of methods in Nobox NPM Client. 


{% side-by-side %}

{% item %}

## Rowed Models Methods
  This is the kind of methods generated from models created with `{type: "rowed"}` config on `getSchemaCreator` like we have below:


  ```ts
  import { getSchemaCreator } from 'nobox-client';
   
   // ..... UserStructure and config code here

  const createRowedSchema = getSchemaCreator(config, {type: "rowed"})

  const UserModel = createSchema(UserStructure);
  ```

  The `UserModel` in the above example will only have access to  Rowed Schema Methods because it was created with `getSchemaCreator` and a config of `{type: "rowed"}`

  Note: When  second arugment (`{type: "rowed"}`) is not set, `getSchemaCreator` will still assume a default of `{type: rowed}`

### Available Rowed Models Methods
- find
- findOne
- search
- insert
- InsertOne
- UpdateOne
- UpdatedOneById
- getTokenOwner

{% /item %}

{% item %}

## Key Group Models Methods
  This is the kind of methods generated from models created with `{type: "key-group"}` config on `getSchemaCreator` like we have below:

  ```ts
  import { getSchemaCreator } from 'nobox-client';
   
   // ..... SettingsStructure and config code here

  const createRowedSchema = getSchemaCreator(config, {type: "key-group"})

  const SettingsModel = createSchema(SettingsStructure);

  ```
  The `UserModel` in the above example will only have access to Key Group Methods because it was created with `getSchemaCreator` and a config of `{type: "key-group"}`

### Available Key Group Schema Methods
- setKeys
- getKeys

{% /item %}
{% /side-by-side %}

