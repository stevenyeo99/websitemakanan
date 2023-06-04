CREATE DATABASE website_makanan;

use website_makanan;

CREATE TABLE USERS (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    primary key (id)
);

INSERT INTO USERS (username, email, password)
VALUES ('test', 'test@gmail.com', '$2a$10$9ojdPKI/0VHkz9gC7zBtVetHxTsvkT9V4AQwsljLLU3ZKgpT0/S5.');

-- reservation config
CREATE TABLE RESERVATION (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    table_no INT NOT NULL,
    is_reservated VARCHAR(5),
    reset_hours INT,
    reserved_datetime DATETIME,
    primary key (id),
    foreign key (user_id) references users (id)
);

-- 1-9
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 1, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 2, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 3, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 4, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 5, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 6, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 7, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 8, 'NO', 2, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 9, 'NO', 2, NULL);
-- 10-11
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 10, 'NO', 0, NULL);
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 11, 'NO', 0, NULL);
-- 12
INSERT INTO RESERVATION (user_id, table_no, is_reservated, reset_hours, reserved_datetime)
VALUES ((SELECT id FROM users WHERE username = 'test'), 12, 'NO', 5, NULL);