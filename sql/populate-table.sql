CREATE TABLE IF NOT EXISTS Visitors (
ID SERIAL PRIMARY KEY,
Full_Name varchar(100) NOT NULL,
Age Integer NOT NULL,
Visit_Date Date NOT NULL,
Visit_Time TIME NOT NULL,
Comments varchar(200),
Assistant_Name varchar(100) 
); 
