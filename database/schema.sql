-- Table users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table health_data
CREATE TABLE health_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    gender CHAR(1) NOT NULL,      -- 'M' for male, 'F' for female
    height INTEGER NOT NULL,      -- Height in centimeters
    age INTEGER NOT NULL,         -- Age in years
    weight FLOAT NOT NULL,        -- Weight in kilograms
    last_modified TIMESTAMPTZ DEFAULT NOW()
);

-- Table activities
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL,
    duration INTEGER NOT NULL,
    calories_burned FLOAT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE temp_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    verification_code INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
