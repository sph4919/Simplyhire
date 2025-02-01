
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