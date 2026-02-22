"""
Script to create users table in the database.
"""
import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("ERROR: DATABASE_URL not found in environment variables")
    exit(1)

print(f"Connecting to database...")

try:
    # Connect to database
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    print("Connected successfully!")

    # Create users table
    create_table_query = """
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    """

    print("Creating users table...")
    cursor.execute(create_table_query)
    conn.commit()

    print("✅ Users table created successfully!")

    # Verify table exists
    cursor.execute("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users';
    """)

    result = cursor.fetchone()
    if result:
        print(f"✅ Verified: Table '{result[0]}' exists in database")

    # Show table structure
    cursor.execute("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'users'
        ORDER BY ordinal_position;
    """)

    columns = cursor.fetchall()
    print("\n📋 Table Structure:")
    for col in columns:
        print(f"  - {col[0]}: {col[1]} (nullable: {col[2]})")

    cursor.close()
    conn.close()

    print("\n✅ Database setup complete!")

except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
