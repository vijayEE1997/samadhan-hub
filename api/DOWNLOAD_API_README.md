# PDF Download API

This API endpoint allows users to download PDF files in different languages from the assets folder.

## Endpoint

```
GET /api/download
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `language` | string | Yes | The language of the PDF to download. Must be either `english` or `hindi` |

## Usage Examples

### Download English PDF
```bash
curl "http://localhost:5000/api/download?language=english"
```

### Download Hindi PDF
```bash
curl "http://localhost:5000/api/download?language=hindi"
```

### Browser Usage
```javascript
// Download English PDF
fetch('/api/download?language=english')
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'English.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  });

// Download Hindi PDF
fetch('/api/download?language=hindi')
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Hindi.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  });
```

## Response

### Success Response (200 OK)
- **Content-Type**: `application/pdf`
- **Content-Disposition**: `attachment; filename="English.pdf"` or `attachment; filename="Hindi.pdf"`
- **Content-Length**: File size in bytes
- **Body**: PDF file stream

### Error Responses

#### 400 Bad Request - Invalid Language
```json
{
  "success": false,
  "error": "Invalid language parameter",
  "message": "Please specify language as \"english\" or \"hindi\"",
  "example": "/api/download?language=english"
}
```

#### 404 Not Found - File Not Found
```json
{
  "success": false,
  "error": "File not found",
  "message": "english PDF not available"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Download failed",
  "details": "Error message details"
}
```

## File Structure

The API expects the following file structure in the `assest` folder:

```
samadhan/api/
├── assest/
│   ├── English.pdf
│   └── Hindi.pdf
├── server.js
└── ...
```

## Security Features

- **File Path Validation**: Prevents directory traversal attacks
- **Language Parameter Validation**: Only allows specified languages
- **File Existence Check**: Verifies file exists before serving
- **Stream Error Handling**: Graceful error handling for file operations
- **Client Disconnect Handling**: Properly closes file streams on client disconnect

## Testing

Run the test script to verify the API works:

```bash
cd samadhan/api
node test-download.js
```

Make sure your server is running on port 5000 before running the tests.

## Client Integration

The client-side code has been updated to use this API:

```typescript
import { getPdfPath } from '@/utils/assetUtils';

// Download English PDF
const englishUrl = getPdfPath('english'); // Returns: /api/download?language=english

// Download Hindi PDF  
const hindiUrl = getPdfPath('hindi'); // Returns: /api/download?language=hindi
```

## Notes

- The API automatically sets appropriate headers for PDF downloads
- Files are streamed to prevent memory issues with large PDFs
- The API includes proper error handling and logging
- Caching is disabled to ensure fresh downloads
- File names are automatically set based on the selected language
