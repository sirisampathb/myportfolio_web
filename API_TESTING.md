# API Testing Guide

Complete guide to test all backend API endpoints using cURL commands or Postman.

## 📌 Base URL

```
http://localhost:5000/api
```

---

## ✅ Health Check

**Endpoint:** `GET /api/health`

### Using cURL
```bash
curl http://localhost:5000/api/health
```

### Expected Response (200 OK)
```json
{
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📋 Get All Projects

**Endpoint:** `GET /api/projects`

**Query Parameters:**
- `featured` (optional): Filter by featured status (`true` or `false`)

### Using cURL

Get all projects:
```bash
curl http://localhost:5000/api/projects
```

Get featured projects only:
```bash
curl "http://localhost:5000/api/projects?featured=true"
```

### Using Postman
1. Method: **GET**
2. URL: `http://localhost:5000/api/projects`
3. Click **Send**

### Expected Response (200 OK)
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce with payment integration",
      "technologies": ["React", "Node.js", "MongoDB"],
      "image": "https://example.com/image.jpg",
      "link": "https://example.com",
      "featured": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## 📖 Get Single Project

**Endpoint:** `GET /api/projects/:id`

**Parameters:**
- `id` (required): MongoDB Project ID

### Using cURL
```bash
curl http://localhost:5000/api/projects/507f1f77bcf86cd799439011
```

### Using Postman
1. Method: **GET**
2. URL: `http://localhost:5000/api/projects/507f1f77bcf86cd799439011`
3. Click **Send**

### Expected Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce with payment integration",
    "technologies": ["React", "Node.js", "MongoDB"],
    "image": "https://example.com/image.jpg",
    "link": "https://example.com",
    "featured": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

## ➕ Create New Project

**Endpoint:** `POST /api/projects`

**Request Body:**
```json
{
  "title": "Project Title",
  "description": "Project description",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "image": "https://example.com/image.jpg",
  "link": "https://example.com",
  "featured": false
}
```

### Using cURL
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Project",
    "description": "A cool project I built",
    "technologies": ["JavaScript", "React", "Node.js"],
    "image": "https://via.placeholder.com/300",
    "link": "https://mynewproject.com",
    "featured": true
  }'
```

### Using Postman
1. Method: **POST**
2. URL: `http://localhost:5000/api/projects`
3. Headers:
   - `Content-Type: application/json`
4. Body (select **raw** → **JSON**):
   ```json
   {
     "title": "My New Project",
     "description": "A cool project I built",
     "technologies": ["JavaScript", "React", "Node.js"],
     "image": "https://via.placeholder.com/300",
     "link": "https://mynewproject.com",
     "featured": true
   }
   ```
5. Click **Send**

### Expected Response (201 Created)
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "title": "My New Project",
    "description": "A cool project I built",
    "technologies": ["JavaScript", "React", "Node.js"],
    "image": "https://via.placeholder.com/300",
    "link": "https://mynewproject.com",
    "featured": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Title, description, and technologies are required"
}
```

---

## ✏️ Update Project

**Endpoint:** `PUT /api/projects/:id`

**Parameters:**
- `id` (required): MongoDB Project ID

**Request Body:** (only include fields you want to update)
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Using cURL
```bash
curl -X PUT http://localhost:5000/api/projects/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "featured": false
  }'
```

### Using Postman
1. Method: **PUT**
2. URL: `http://localhost:5000/api/projects/507f1f77bcf86cd799439011`
3. Body (JSON):
   ```json
   {
     "title": "Updated Title",
     "featured": false
   }
   ```
4. Click **Send**

### Expected Response (200 OK)
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Project Title",
    "description": "Full-stack e-commerce with payment integration",
    "technologies": ["React", "Node.js", "MongoDB"],
    "image": "https://example.com/image.jpg",
    "link": "https://example.com",
    "featured": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

## 🗑️ Delete Project

**Endpoint:** `DELETE /api/projects/:id`

**Parameters:**
- `id` (required): MongoDB Project ID

### Using cURL
```bash
curl -X DELETE http://localhost:5000/api/projects/507f1f77bcf86cd799439011
```

### Using Postman
1. Method: **DELETE**
2. URL: `http://localhost:5000/api/projects/507f1f77bcf86cd799439011`
3. Click **Send**

### Expected Response (200 OK)
```json
{
  "success": true,
  "message": "Project deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce with payment integration",
    "technologies": ["React", "Node.js", "MongoDB"],
    "image": "https://example.com/image.jpg",
    "link": "https://example.com",
    "featured": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

## 🧪 Test Workflow

Follow this complete workflow to test all endpoints:

### 1. Check Server Health
```bash
curl http://localhost:5000/api/health
```

### 2. Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### 3. Create a New Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "A test project for API testing",
    "technologies": ["Node.js", "Express", "MongoDB"],
    "image": "https://via.placeholder.com/300",
    "link": "https://test.example.com",
    "featured": true
  }'
```

### 4. Get Specific Project (use ID from step 3)
```bash
curl http://localhost:5000/api/projects/[PROJECT_ID]
```

### 5. Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/[PROJECT_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Project",
    "featured": false
  }'
```

### 6. Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/[PROJECT_ID]
```

### 7. Verify Deletion
```bash
curl http://localhost:5000/api/projects
```

---

## 🔍 Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET successful, PUT successful |
| 201 | Created | POST successful |
| 400 | Bad Request | Missing required fields |
| 404 | Not Found | Project ID doesn't exist |
| 500 | Server Error | Database connection issue |

---

## 💡 Pro Tips

### Using cURL with Variables

```bash
# Set variables
BASE_URL="http://localhost:5000/api"
PROJECT_ID="507f1f77bcf86cd799439011"

# Use in commands
curl $BASE_URL/projects/$PROJECT_ID
```

### Pretty Print JSON Response

```bash
# Using jq (install: npm install -g jq)
curl http://localhost:5000/api/projects | jq '.'

# Using Python
curl http://localhost:5000/api/projects | python -m json.tool
```

### Save Response to File

```bash
curl http://localhost:5000/api/projects > projects.json
```

### Add Bearer Token (when implemented)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/projects
```

---

## 📚 Postman Collection

You can import a Postman collection to test all endpoints automatically.

**Export from Postman:**
1. Click "File" → "Export"
2. Choose "Postman Collection v2.1"
3. Share with team

---

## 🆘 Troubleshooting

### "Connection refused"
- Ensure backend server is running: `npm run dev`
- Check if port 5000 is in use

### "CORS error"
- Backend CORS is configured in `server.js`
- Test from same domain/port or use API directly

### "Invalid JSON"
- Ensure JSON is properly formatted
- Use `jq` to validate: `echo '{}' | jq .`

### "Project not found"
- Verify ID is correct (copy from GET all projects)
- ID should be 24-character MongoDB ObjectId

---

Last updated: January 2025
