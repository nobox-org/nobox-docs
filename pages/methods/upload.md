---
title: File Upload - Nobox API Reference
description: Upload files to Nobox cloud storage using the direct API endpoint with authentication and progress tracking
---

# File Upload

The Nobox file upload system allows you to upload files directly to cloud storage (AWS S3) and manage them through the Nobox API. This feature is part of the Nobox backend-as-a-service platform and provides secure, scalable file storage with automatic metadata management.

## Prerequisites

Before using the file upload feature, ensure you have:

- A Nobox account and project created
- Your API token (NOBOX_TOKEN) from your Nobox dashboard
- Your project slug (projectSlug) from your Nobox dashboard
- A file to upload (supports all common file types)

## Examples

### Basic File Upload

```ts
// Import necessary dependencies
import axios from 'axios';

// Define your Nobox configuration
const NOBOX_TOKEN = 'your-api-token-from-dashboard';
const projectSlug = 'your-project-slug';
const UPLOAD_URL = `https://api.nobox.cloud/_f_/${projectSlug}/upload`;

// Create form data with the file
const formData = new FormData();
formData.append('file', file); // file is a File object from input or drag-drop

// Upload the file
const response = await axios.post(UPLOAD_URL, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${NOBOX_TOKEN}`,
    },
});

// Get the uploaded file data
const uploadedFile = response.data;
console.log('Upload successful:', uploadedFile);
```

### File Upload with Progress Tracking

```ts
// Upload with progress tracking for better user experience
const response = await axios.post(UPLOAD_URL, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${NOBOX_TOKEN}`,
    },
    onUploadProgress: (progressEvent) => {
        const percent = Math.floor(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload progress: ${percent}%`);
        // Update UI progress bar here
    },
});
```

### Error Handling

```ts
try {
    const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${NOBOX_TOKEN}`,
        },
    });
    
    const uploadedFile = response.data;
    console.log('Upload successful:', uploadedFile);
} catch (error) {
    if (error.response?.status === 401) {
        console.error('Authentication failed - check your API token');
    } else if (error.response?.status === 413) {
        console.error('File too large - check file size limits');
    } else if (error.response?.status === 400) {
        console.error('Invalid request - check file format and request structure');
    } else {
        console.error('Upload failed:', error.message);
    }
}
```

## Endpoint

**POST** `https://api.nobox.cloud/_f_/{projectSlug}/upload`

**Base URL**: `https://api.nobox.cloud/_f_/`  
**Path Parameter**: `{projectSlug}` - Your Nobox project slug  
**Method**: POST  
**Content Type**: multipart/form-data

## Authentication

All file upload requests require authentication using your Nobox API token:

```
Authorization: Bearer {NOBOX_TOKEN}
```

**Token Location**: Available on the Access Tokens page in your Nobox dashboard  
**Token Format**: Bearer token authentication  
**Security**: HTTPS required for all requests

## Request Structure

### Headers

```
Content-Type: multipart/form-data
Authorization: Bearer {NOBOX_TOKEN}
```

### Body (FormData)

- `file` (File): The file to be uploaded. This should be sent as part of a FormData object.

**File Requirements**:
- Supported formats: All common file types

## Response Structure

### Success Response

**Status Code**: 200 OK  
**Content Type**: application/json

```typescript
interface CloudFile {
    _id: string;           // Unique file identifier (UUID)
    name: string;          // Generated filename with unique ID
    originalName: string;  // Original filename as uploaded
    ownedBy: string;       // User ID who uploaded the file
    s3Link: string;        // Direct link to the file in S3
    updatedAt: string;     // Last update timestamp (ISO 8601)
    createdAt: string;     // Creation timestamp (ISO 8601)
}
```

### Error Responses

**401 Unauthorized**: Invalid or missing API token  
**413 Payload Too Large**: File exceeds size limit  
**400 Bad Request**: Invalid file or malformed request  
**500 Internal Server Error**: Server processing error

## Troubleshooting

### Common Issues

**401 Unauthorized Error**
- Verify your API token is correct
- Ensure the token is included in the Authorization header
- Check that your token hasn't expired

**413 Payload Too Large**
- Check file size (limit is typically 100MB)
- Compress large files before upload
- Consider chunked upload for very large files

**400 Bad Request**
- Ensure file is properly added to FormData
- Check that Content-Type header is set correctly
- Verify file is not corrupted

**Network Errors**
- Check internet connection
- Verify endpoint URL is correct
- Ensure HTTPS is used for all requests

### Best Practices

1. **File Validation**: Always validate file type and size before upload
2. **Error Handling**: Implement comprehensive error handling for all upload scenarios
3. **Progress Tracking**: Use progress tracking for better user experience
4. **Security**: Never expose API tokens in client-side code for production
5. **Retry Logic**: Implement retry logic for network failures
6. **File Naming**: Consider sanitizing filenames for security

## Related Documentation

- [Integration Guide](/integrate-nobox) - Learn how to integrate Nobox into your application

## Next Steps

- [Find](/methods/find) - Query uploaded files and metadata
- [Search](/methods/search) - Search through uploaded files and metadata
- [InsertOne](/methods/insert-one) - Store file references in your database 