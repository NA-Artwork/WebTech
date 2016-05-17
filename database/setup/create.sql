CREATE TABLE User(userId INTEGER,
                  name VARCHAR(100) NOT NULL,
                  email VARCHAR(100) NOT NULL,
                  CONSTRAINT pkUid PRIMARY KEY(userId)
);
CREATE TABLE Message (mesId INTEGER,
                      userId INTEGER,
                      body TEXT NOT NULL,
                      tstamp INTEGER,
                      CONSTRAINT pkPid PRIMARY KEY(userId)
                      CONSTRAINT fkUid FOREIGN KEY(userId) REFERENCES User(userId)

);
