INSERT INTO users (email, password_hash)
VALUES
    ('mdohdv@gmail.com', 'utopie'),
    ('user2@example.com', 'hashed_password_2'),
    ('user3@example.com', 'hashed_password_3');

-- Exemple pour un utilisateur avec un id donné (remplacez-le par l'ID réel de l'utilisateur)
INSERT INTO health_data (user_id, gender, height, age, weight, last_modified)
VALUES
    ('10bcaa8a-7edf-4f24-b771-02b06a2cbb94', 'M', 186, 30, 84.0, '2024-11-12 08:00:00'),
    ('2468515c-2383-4b5b-bb37-bbbb40718714', 'F', 165, 28, 65.0, '2024-11-12 09:00:00'),
    ('d6c0e43a-7f4d-49da-9c6b-ac35847046c7', 'M', 175, 35, 78.5, '2024-11-12 10:00:00');

-- Exemple d'activités pour un utilisateur spécifique
INSERT INTO activities (user_id, activity_type, duration, calories_burned, timestamp)
VALUES
    ('10bcaa8a-7edf-4f24-b771-02b06a2cbb94', 'running', 30, 300, '2024-11-12 07:00:00'),
    ('10bcaa8a-7edf-4f24-b771-02b06a2cbb94', 'cycling', 45, 450, '2024-11-12 15:00:00'),
    ('2468515c-2383-4b5b-bb37-bbbb40718714', 'walking', 60, 200, '2024-11-12 08:30:00'),
    ('d6c0e43a-7f4d-49da-9c6b-ac35847046c7', 'swimming', 25, 350, '2024-11-12 18:00:00');
