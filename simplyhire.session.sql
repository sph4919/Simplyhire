
CREATE TABLE user (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    job_id INT,
    name VARCHAR(255)
);

CREATE TABLE serviceagent (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    name VARCHAR(255),
    service_type VARCHAR(255),
    current_charges INT,
    job_description TEXT,
    FOREIGN KEY (job_id) REFERENCES user(userid)
);

INSERT INTO user (userid, email, password, job_id, name) 
VALUES (1, 'patelsugnay49@gmail.com', 'qwertyu', 1, 'sugnay');

SELECT * FROM user;

DELETE FROM user
WHERE email = 'nirjar000@gmail.com';

ALTER TABLE user
DROP COLUMN job_id;

-- Create the serviceagent table
CREATE TABLE serviceagent (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    name VARCHAR(255),
    service_type VARCHAR(255),
    current_charges INT,
    job_description TEXT
);

-- Insert five records with service_type 'snowblower'
INSERT INTO serviceagent (job_id, name, service_type, current_charges, job_description)
VALUES 
(1, 'Tom Baker', 'snowblower', 40, 'Tom specializes in residential snow blowing services. He ensures prompt and efficient snow removal. Available for regular and emergency services.'),
(2, 'Lucy Williams', 'snowblower', 50, 'Lucy offers commercial snow removal services. She uses advanced equipment to handle large areas. Reliable and punctual in all weather conditions.'),
(3, 'Jack Taylor', 'snowblower', 60, 'Jack is available for emergency snow removal services. He responds quickly to urgent requests. Jack is known for his thorough work and friendly demeanor.'),
(4, 'Emily Davis', 'snowblower', 45, 'Emily provides residential and commercial snow blowing services. She is known for her attention to detail and quality work. Emily also offers seasonal contracts.'),
(5, 'Chris Johnson', 'snowblower', 55, 'Chris excels in both residential and commercial snow removal. He has years of experience in the field. Chris is dedicated to customer satisfaction and safety.');




SHOW CREATE TABLE serviceagent;

ALTER TABLE serviceagent
DROP FOREIGN KEY serviceagent_ibfk_1;

ALTER TABLE serviceagent
ADD COLUMN email VARCHAR(255),
ADD COLUMN password VARCHAR(255);

SELECT * FROM serviceagent;

INSERT INTO serviceagent (name, service_type, current_charges, job_description, email, password)
VALUES ('John Doe', 'plumbing', 20, 'I am the best', 'johndoe@example.com', 'password123');

DROP TABLE serviceagent;

CREATE TABLE serviceagent (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    name VARCHAR(255),
    service_type VARCHAR(255),
    current_charges INT,
    job_description TEXT,
    rating DECIMAL(3, 2)
);


INSERT INTO serviceagent (job_id, name, service_type, current_charges, job_description, rating)
VALUES (1, 'Tom Baker', 'snowblower', 40, 'Tom specializes in residential snow blowing services. He ensures prompt and efficient snow removal. Available for regular and emergency services.', 4.5),
       (2, 'Lucy Williams', 'snowblower', 50, 'Lucy offers commercial snow removal services. She uses advanced equipment to handle large areas. Reliable and punctual in all weather conditions.', 4.7),
       (3, 'Jack Taylor', 'snowblower', 60, 'Jack is available for emergency snow removal services. He responds quickly to urgent requests. Jack is known for his thorough work and friendly demeanor.', 4.6),
       (4, 'Emily Davis', 'snowblower', 45, 'Emily provides residential and commercial snow blowing services. She is known for her attention to detail and quality work. Emily also offers seasonal contracts.', 4.8),
       (5, 'Chris Johnson', 'snowblower', 55, 'Chris excels in both residential and commercial snow removal. He has years of experience in the field. Chris is dedicated to customer satisfaction and safety.', 4.9);
