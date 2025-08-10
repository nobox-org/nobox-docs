# Building SDK for Nobox Core API

## Introduction
This documentation provides guidance on building an SDK (Software Development Kit) for the Nobox Core API. The API uses the OpenAPI 3.0.0 specification and provides various endpoints to interact with the Nobox platform.

{% callout type="note" %}
AI integration does not require an SDK. To call AI models, use the direct HTTP endpoint documented here: [AI Models (Direct API)](/ai/access-model).
{% /callout %}

## SDK Components
These SDK you will be developing would possibly have the following:

1. API Request Methods: Methods for making requests to the various endpoints of the Nobox API.
2. Authentication: Handling authentication with the API using the "bearer" token.
3. Models: Define data models to represent the responses from the API.
4. Error Handling: Handle API errors gracefully and provide meaningful error messages.
5. Utility Functions: Additional utility functions to enhance SDK usability.

## Building the SDK
As far as we are concerned,a NOBOX SDK is simply a wrapper around the Nobox Core API endpoints. This document will outline and explain each endpoint and how it can be used. Most of these endpoints share some similarities too, making it easy to implement.


## Nobox API Endpoints
- Base URL: https://api.nobox.cloud
- Authentication: Auth token can be generated on https://nobox.cloud by registering or logging into the dashboard
- Allowed Methods in the SDK 
    There are three types of methods that the API faciliates:
    - Rowed Schema Methods:
         This includes:
            - find,
            - findOne,
            - search,
            - insert,
            - insertOne,
            - updateOne,
            - updateOneById,
            - getTokenOwner
    - KeyGroup Schema Methods:
        This includes:
            - setKeys
            - getKeys
   - In-built Function Methods:
        This includes:
            - login

### Methods Implementation: 
Here , we explain how each of the methods can be built using the Nobox Core API. As of right now, all calls to the Nobox API is RESTful and there are certain headers that needs to passed to all API Endpoint calls.

Compulsory Headers:
These headers need to be passed with your API calls. Apart from the `authorization` and the `structure` headers, the values of the other headers are expected to be used as is.
  - 'Accept: application/json, text/plain, */*'
  - 'authorization: Bearer [token]'
  - 'auto-create-project: true'
  - 'auto-create-record-space: true'
  - 'clear-all-spaces: false'
  - 'mutate: true'
  - 'structure: [structure]'

- `[token]` represents the token you generated on the Nobox Dashboard
- `[structure]` represents the stringified structure of the record space you are making a call to

### Find:
-  Introduction
The `FIND_ONE` endpoint in the Nobox Core API is used to retrieve a single record that matches the specified criteria. It allows you to search for a specific user based on their email and password. This documentation provides details on how to make a request to the `FIND_ONE` endpoint and explains the required headers and parameters.

- Verb: GET
- Url: `https://api.nobox.cloud/[project-slug]/[record-space-slug]`
> Where `[project-slug]` and `[record-space-slug]` should be replaced with the slug of your project and slug of recordspace you are making a call on.
- Url Params: `?age=22&gender=male`
> the Url Params represent the kind of data being queried, in this case, you are looking for a record that has a matching data of `{age: 22, gender: "male"}`. FYI, this data will be reformated in the NOBOX API based on the TYPE supplied in the `structure` header for the related fields.
- Find-specific Headers: These are headers that should are specific to the FIND API call
  - `'options: {"paramRelationship":"And"}'` or `'options: {"paramRelationship":"And"}'`
When you use `'options: {"paramRelationship":"And"}'`, it means both conditions (age and gender) must be true for a user to be included in the result. In other words, as the example stated previously, the user must be 22 years old and male.
When you use ``,  it means both conditions (age and gender) must be true for a user to be included in the result. In other words, as the example stated previously, the user must be 22 years old and male.

Here is an example of a CURL find on the Nobox Core API
```
curl --request GET \
  --url 'https://api.nobox.cloud/kitchenApp/users?age=22&gender=male' \
  --header 'Accept: application/json, text/plain, */*' \
  --header 'Origin: http://localhost:8081' \
  --header 'Referer: http://localhost:8081/' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI3MjM5MzYzfQ.3kxhzvCD6GInXJYzCEZtVpBHbTn10hXyHM2Wt86URp0' \
  --header 'auto-create-project: true' \
  --header 'auto-create-record-space: true' \
  --header 'clear-all-spaces: false' \
  --header 'mutate: true' \
  --header 'options: {"paramRelationship":"And"}' \
  --header 'structure: {"name":"Users","description":"List of Users Using my Kitchen App","projectSlug":"kitchenApp","slug":"users","recordStructure":[{"required":true,"unique":false,"description":"Age of the user","comment":"","hashed":false,"type":"NUMBER","slug":"age","name":"age"},{"required":true,"unique":false,"description":"Name of the user","comment":"","hashed":false,"type":"TEXT","slug":"name","name":"name"},{"required":true,"unique":false,"description":"Password of the user","comment":"","hashed":true,"type":"TEXT","slug":"password","name":"password"},{"required":false,"unique":false,"description":"Gender of the user","comment":"","hashed":false,"type":"TEXT","slug":"gender","name":"gender","defaultValue":"undisclosed"}]}' \
  ```
### FIND_ONE

#### Introduction
The `FIND_ONE` endpoint in the Nobox Core API is used to retrieve a single record that matches the specified criteria. It allows you to search for a specific user based on their email and password. This documentation provides details on how to make a request to the `FIND_ONE` endpoint and explains the required headers and parameters.
- Verb: GET
- Url: `https://api.nobox.cloud/[project-slug]/[record-space-slug]/_single_`
> Where `[project-slug]` and `[record-space-slug]` should be replaced with the slug of your project and slug of recordspace you are making a call on.
- Url Params: `?age=22&gender=male`
> the Url Params represent the kind of data being queried, in this case, you are looking for a record that has a matching data of `{age: 22, gender: "male"}`. FYI, this data will be reformated in the NOBOX API based on the TYPE supplied in the `structure` header for the related fields.
- Find-specific Headers: These are headers that should are specific to the FIND API call
  - `'options: {"paramRelationship":"And"}'` or `'options: {"paramRelationship":"And"}'`
When you use `'options: {"paramRelationship":"And"}'`, it means both conditions (age and gender) must be true for a user to be included in the result. In other words, as the example stated previously, the user must be 22 years old and male.
When you use ``,  it means both conditions (age and gender) must be true for a user to be included in the result. In other words, as the example stated previously, the user must be 22 years old and male.


## CURL Command Example
Here's an example `curl` command for making a `FIND_ONE` request to the Nobox Core API for the "User" record space:

```bash
curl --request GET \
  --url 'https://api.nobox.cloud/kitchenApp/users/_single_?age=22&gender=male' \
  --header 'Accept: application/json, text/plain, */*' \
  --header 'Origin: http://localhost:8081' \
  --header 'Referer: http://localhost:8081/' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI3MjM5MzYzfQ.3kxhzvCD6GInXJYzCEZtVpBHbTn10hXyHM2Wt86URp0' \
  --header 'auto-create-project: true' \
  --header 'auto-create-record-space: true' \
  --header 'clear-all-spaces: false' \
  --header 'mutate: true' \
  --header 'options: {"paramRelationship":"And"}' \
  --header 'structure: {"name":"Users","description":"List of Users Using my Kitchen App","projectSlug":"kitchenApp","slug":"users","recordStructure":[{"required":true,"unique":false,"description":"Age of the user","comment":"","hashed":false,"type":"NUMBER","slug":"age","name":"age"},{"required":true,"unique":false,"description":"Name of the user","comment":"","hashed":false,"type":"TEXT","slug":"name","name":"name"},{"required":true,"unique":false,"description":"Password of the user","comment":"","hashed":true,"type":"TEXT","slug":"password","name":"password"},{"required":false,"unique":false,"description":"Gender of the user","comment":"","hashed":false,"type":"TEXT","slug":"gender","name":"gender","defaultValue":"undisclosed"}]}' \
  ```

