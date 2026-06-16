**Step 1: Install postgres**

- Open the Command Prompt
- Type "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -h localhost -d postgres
- Enter the password : Password for user postgres:
- Write SQL for the creating the table
- 
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE insurance_claims (
    claim_id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL
);

