# Deploy to Hugging Face Spaces

This guide explains how to deploy the TaskForge backend to Hugging Face Spaces.

## Prerequisites

- A [Hugging Face](https://huggingface.co) account
- Git installed locally

## Deployment Steps

### Step 1: Create a New Space

1. Go tougging Face Spaces]( [Hhttps://huggingface.co/spaces)
2. Click **Create new Space**
3. Fill in the details:
   - **Owner**: Your username
   - **Space name**: `taskforge-api` (or your preferred name)
   - **License**: MIT
   - **SDK**: Docker
   - **Hardware**: CPU (free tier is sufficient)

### Step 2: Prepare Your Backend Files

The following files have been prepared for deployment:

- `app.py` - Main entry point for Hugging Face Spaces
- `Dockerfile` - Docker configuration
- `requirements.txt` - Python dependencies
- `src/` - Application source code

### Step 3: Upload Files to Your Space

You have two options:

#### Option A: Using Git (Recommended)

```bash
# Clone your Space repository
git clone https://huggingface.co/spaces/YOUR_USERNAME/taskforge-api

# Copy the backend files
cd taskforge-api

# Copy these files from your project:
# - app.py
# - Dockerfile
# - requirements.txt
# - src/ (entire directory)

# Commit and push
git add .
git commit -m "Add TaskForge API"
git push
```

#### Option B: Using the Web Interface

1. Go to your Space on Hugging Face
2. Click **Files** → **Upload**
3. Upload the following files/directories:
   - `app.py`
   - `Dockerfile`
   - `requirements.txt`
   - `src/` (entire folder)

### Step 4: Wait for Deployment

Hugging Face will automatically build and deploy your Docker container. This may take a few minutes.

Once deployed, you'll see:
- Your API running at `https://YOUR_USERNAME-taskforge-api.hf.space`
- API documentation at `https://YOUR_USERNAME-taskforge-api.hf.space/docs`

### Step 5: Update Frontend Configuration

After deployment, update your frontend to use the new API URL:

1. Create or edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-taskforge-api.hf.space
```

2. Update the API client in `frontend/lib/api-client.ts` to use the environment variable

## Environment Variables

The following environment variables can be configured in your Space settings:

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./taskforge.db` | Database connection string |
| `BETTER_AUTH_SECRET` | Auto-generated | Secret key for JWT tokens |
| `PORT` | `7860` | Server port (do not change) |

## API Endpoints

Once deployed, your API will have these endpoints:

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /api/tasks/register` - Register user
- `POST /api/tasks/login` - Login user
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Troubleshooting

### Build Failures

If the build fails:
1. Check the **Logs** tab in your Space for error messages
2. Ensure `requirements.txt` has all necessary dependencies
3. Make sure `Dockerfile` is in the root of your Space

### CORS Issues

If you encounter CORS errors:
1. The CORS settings in `app.py` are configured to allow all origins
2. If needed, set the `HF_SPACE_URL` environment variable in your Space settings

### Database Issues

The app uses SQLite by default, which is stored in the container. Note that:
- Data will persist during the container's lifetime
- Data will be lost if you redeploy or the container restarts
- For production, consider using a managed database service

