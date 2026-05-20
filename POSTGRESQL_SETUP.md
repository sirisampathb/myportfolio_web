# PostgreSQL Setup Guide

## 📌 Overview

Your portfolio website now uses **PostgreSQL** instead of MongoDB. PostgreSQL is a powerful relational database that offers excellent performance and reliability.

---

## 🔧 Local Setup

### Step 1: Install PostgreSQL

#### **Windows**
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Keep default port: `5432`

#### **Mac**
```bash
# Using Homebrew
brew install postgresql@15
brew services start postgresql@15
```

#### **Linux (Ubuntu/Debian)**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

### Step 2: Create Database

Open PostgreSQL command line:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE portfolio_db;

# List databases (verify it was created)
\l

# Exit
\q
```

### Step 3: Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Start Server

```bash
npm run dev
```

You should see:
```
✅ PostgreSQL Connected
✅ Database Models Synced
🚀 Server running on http://localhost:5000
```

### Step 6: Seed Data (Optional)

```bash
npm run seed
```

---

## ☁️ Cloud Database Setup

### Option 1: Render PostgreSQL

1. Go to https://render.com
2. Create account (free)
3. Click "New +" → "PostgreSQL"
4. Choose free tier (500MB)
5. Copy connection string
6. In your `.env`:
   ```env
   DB_HOST=your-render-host.postgres.render.com
   DB_PORT=5432
   DB_NAME=portfolio_db
   DB_USER=your_user
   DB_PASSWORD=your_password
   ```

### Option 2: ElephantSQL

1. Go to https://www.elephantsql.com/
2. Create free account
3. Create instance (free tier = 20MB)
4. Copy connection details
5. Add to `.env`

### Option 3: Heroku Postgres (Paid)

1. Create Heroku app: https://heroku.com
2. Add PostgreSQL add-on ($9/month)
3. Get credentials from `Config Vars`
4. Add to `.env`

### Option 4: AWS RDS

1. Go to https://aws.amazon.com/rds/
2. Create PostgreSQL database
3. Configure security groups
4. Get endpoint
5. Add to `.env`

---

## 🔄 Migration from MongoDB

### Data Migration (Manual)

If you have existing MongoDB data:

1. **Export from MongoDB:**
   ```bash
   mongoexport --collection projects --out projects.json
   ```

2. **Transform JSON format** if needed

3. **Import to PostgreSQL:**
   ```bash
   npm run seed
   ```
   (Or write a migration script)

---

## 🧪 Testing Connection

### Test in Terminal

```bash
# Test connection
psql -h localhost -U postgres -d portfolio_db

# If successful, you'll see:
# portfolio_db=>

# View tables
\dt

# Exit
\q
```

### Test with API

```bash
# Start server
npm run dev

# In another terminal
curl http://localhost:5000/api/health

# Should return:
# {"message":"Server is running","timestamp":"..."}
```

---

## 📊 Database Administration

### Connect to Database

```bash
psql -U postgres -d portfolio_db
```

### Useful Commands

```sql
-- List all tables
\dt

-- Describe table
\d projects

-- View all projects
SELECT * FROM projects;

-- Count projects
SELECT COUNT(*) FROM projects;

-- Delete all projects
DELETE FROM projects;

-- Drop table
DROP TABLE projects;

-- Exit
\q
```

### Using pgAdmin (GUI)

1. Download: https://www.pgadmin.org/
2. Create connection to localhost:5432
3. Browse databases visually
4. Run SQL queries through UI

---

## 🐛 Troubleshooting

### Connection Refused

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solutions:**
```bash
# Check if PostgreSQL is running
sudo service postgresql status    # Linux
brew services list               # Mac
Get-Service PostgreSQL           # Windows PowerShell
```

### Wrong Password

**Problem:** `Error: password authentication failed`

**Solution:**
- Reset password:
  ```bash
  psql -U postgres -c "ALTER USER postgres PASSWORD 'newpassword';"
  ```

### Database Doesn't Exist

**Problem:** `FATAL: database "portfolio_db" does not exist`

**Solution:**
```bash
psql -U postgres -c "CREATE DATABASE portfolio_db;"
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE :::5432`

**Solution:**
```bash
# Find process using port 5432
lsof -i :5432        # Mac/Linux
netstat -ano | findstr 5432  # Windows

# Kill process and restart PostgreSQL
```

---

## 📈 Performance Tips

### Create Indexes

```sql
-- Index for faster queries
CREATE INDEX idx_featured ON projects(featured);
CREATE INDEX idx_created ON projects("createdAt");
```

### Backup Database

```bash
# Backup
pg_dump -U postgres portfolio_db > backup.sql

# Restore
psql -U postgres portfolio_db < backup.sql
```

---

## 🔐 Security

### Change Default Password

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'strong_password';"
```

### Create Application User

```sql
-- Create user with limited privileges
CREATE USER app_user WITH PASSWORD 'app_password';

-- Grant privileges
GRANT CONNECT ON DATABASE portfolio_db TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
```

Then use in `.env`:
```env
DB_USER=app_user
DB_PASSWORD=app_password
```

---

## 📚 Resources

- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Sequelize Docs:** https://sequelize.org/
- **pgAdmin:** https://www.pgadmin.org/
- **pgBrowser:** https://www.pgadmin.org/

---

## ✅ Checklist

- [ ] PostgreSQL installed
- [ ] Database `portfolio_db` created
- [ ] `.env` configured with credentials
- [ ] Dependencies installed: `npm install`
- [ ] Server starts: `npm run dev`
- [ ] Sample data loaded: `npm run seed`
- [ ] API working: `curl http://localhost:5000/api/projects`
- [ ] Frontend loads projects

---

Last updated: January 2025
