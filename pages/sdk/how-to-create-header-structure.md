# Creating the Structure Header Field.
When interacting with the Nobox Core API , it is required to send a Header field called `structure` alongside every request made. Clearly, this field is stringified. This page explains how to create the value of this field.

First, lets talk about the model of this structure.

#### Pseudo Code of how the Model looks like
```ts
interface Structure {
  name: string; // name of record space
  description: string; // description of record space
  projectSlug: string; // project slug 
  slug: string; // record space slug
  recordStructure: RecordFieldStructure[]; // an array of the meta data of each record space field
  initialData?: Record<string, string | number | any[]>[]; // an optional array of records that follows the validation criteria of the meta data of the record space field
}

interface RecordFieldStructure {
  required: boolean;
  unique: boolean;
  description: string;
  comment: string;
  hashed: boolean;
  type: string;
  slug: string;
  name: string;
  defaultValue?: any;
}
```

Based on the Pseudo Code above, lets create our structure before we stringify it and make it ready for transport.

We will be creating the structure for a record space called Users with four fields: `age`, `name`, `password` and `gender` and the project would be a kitchen app.

Let's get to it.

Here is how my structure will look like without the recordStructure field.

```js
{
    name:  "Users",
    description: "List of Users Using my Kitchen App",
    projectSlug: "kitchenApp", // FYI, this value is the same for all structures you create
    slug: "users",
}
```
Nice, but we are not done yet. Let's add the recordStructure, remember I mentioned that this Record Space has four fields,
`age`, `name`, `password` and `gender`, this is where we explain their structure using the `RecordFieldStructure` interface.

```js
{
  name: "Users",
  description: "List of Users Using my Kitchen App",
  projectSlug: "kitchenApp",// FYI, this value is the same for all structures you create
  slug: "users",
  recordStructure: [
    {
      required: true,
      unique: false,
      description: "Age of the user",
      comment: "",
      hashed: false,
      type: "NUMBER",
      slug: "age",
      name: "age",
    },
    {
      required: true,
      unique: false,
      description: "Name of the user",
      comment: "",
      hashed: false,
      type: "TEXT",
      slug: "name",
      name: "name",
    },
    {
      required: true,
      unique: false,
      description: "Password of the user",
      comment: "",
      hashed: true,
      type: "TEXT",
      slug: "password",
      name: "name",
    },
    {
      required: false,
      unique: false,
      description: "Gender of the user",
      comment: "",
      hashed: false,
      type: "TEXT",
      slug: "gender",
      name: "gender",
      defaultValue: "undisclosed"
    },
  ],
}
```

As you can see, each object of the array gives an idea of how each of the fields is meant to operate. Here is a further breakdown:
- required (boolean): Indicates whether the field is required or optional.
- unique (boolean): Indicates if this field can have same values for different records, this will usually be `true` for a username field
- description (string): this field explains what the field is all about, you can leave it as an empty string
- comment (string): this field provides additional information about the field, more like a developer note. you can leave it as an empty string
- hashed (boolean): this field decides if the value of this field should be hashed or not. If this is true, the value of this field will be hashed on nobox database , and it won't be returned in queries but can still find a record using the value of this field. This is usually `true` for a password field.
- type (string): This can either be "TEXT" ,  "NUMBER" or "ARRAY". It simply provides validation for the type of value this field is designed.
- name (string): the name of the field, this name will be used to determine the name of the field key in the object that gets returned for this record space and the object that gets inserted in this record space. 
- slug (string): This is a unique identifier for this field. It should not be the same with any other field. Preferably, a lower case alphanumeric character 
- defaultValue (string): This value is what gets stored as the value of a field when it is set when inserting records.

