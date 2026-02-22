"""
Script to verify users table in the database.
"""
import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

try:
    # Connect to database
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    print("Connected to database successfully!")

    # Check if users table exists
    cursor.execute("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users';
    """)

    result = cursor.fetchone()
    if result:
        print(f"[SUCCESS] Table '{result[0]}' exists in database")
    else:
        print("[ERROR] Users table not found")

    # Show table structure
    cursor.execute("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'users'
        ORDER BY ordinal_position;
    """)

    columns = cursor.fetchall()
    print("\nTable Structure:")
    for col in columns:
        print(f"  - {col[0]}: {col[1]} (nullable: {col[2]})")

    # Count users
    cursor.execute("SELECT COUNT(*) FROM users;")
    count = cursor.fetchone()[0]
    print(f"\nTotal users in database: {count}")

    cursor.close()
    conn.close()

    print("\n[SUCCESS] Database verification complete!")

except Exception as e:
    print(f"[ERROR] {e}")
