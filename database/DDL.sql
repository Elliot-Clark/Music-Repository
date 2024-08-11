-- Group 97
-- Elliot Clark
-- Aria Coalson

-- Disable foreign key checks and auto commit to minimize import errors
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Albums;
DROP TABLE IF EXISTS Artists;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Purchases;
DROP TABLE IF EXISTS Songs;

-- Artists Table
-- This table holds a record of all our artists involved with the music we sell.
CREATE TABLE Artists (
  artistID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  artistName VARCHAR(50) NOT NULL,
  country VARCHAR(50),
  website VARCHAR(50) UNIQUE NOT NULL CHECK (website REGEXP '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$')
);

-- Albums Table
-- This table catalogs albums with details like titles, genres, release dates, and prices.
CREATE TABLE Albums (
  albumID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  artistID INT NOT NULL,
  albumTitle VARCHAR(50) NOT NULL,
  albumGenre VARCHAR(50) NOT NULL,
  albumReleaseDate DATE NOT NULL,
  albumPrice DECIMAL(19,2) NOT NULL CHECK (albumPrice > 0),
  FOREIGN KEY (artistID) REFERENCES Artists(artistID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Songs Table
-- This table holds individual songs included in albums.
CREATE TABLE Songs (
  songID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  songTitle VARCHAR(50) NOT NULL,
  songDuration TIME NOT NULL,
  albumID INT NOT NULL,
  FOREIGN KEY (albumID) REFERENCES Albums(albumID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Customers Table
-- This table holds records of customers who have made purchases.
CREATE TABLE Customers (
  customerID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  phoneNumber VARCHAR(15) NOT NULL CHECK (phoneNumber REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$')
);

-- Purchases Table
-- This table records sales transactions between customers and albums.
CREATE TABLE Purchases (
  purchaseID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
  purchaseDate DATE NOT NULL,
  purchaseAmount DECIMAL(19,2) NOT NULL,
  customerID INT NOT NULL,
  albumID INT NOT NULL,
  FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (albumID) REFERENCES Albums(albumID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserting Sample Data:
INSERT INTO Artists (artistID, artistName, country, website)
VALUES
  (1001, 'The Beetles', 'United Kingdom', 'https://www.abeatle.com/'),
  (1002, 'Taylor Slow', 'United States', 'https://www.taylorslow.com/'),
  (1003, 'The Rolling Pebbles', 'United Kingdom', 'https://www.rolledstone.com/'),
  (1004, 'Frank Cilantro', 'United States', 'https://www.frankcilantro.com/');

INSERT INTO Albums (albumID, artistID, albumTitle, albumGenre, albumReleaseDate, albumPrice)
VALUES
  (1, 1001, 'Green Submarine', 'Rock', '1969-10-02', 25),
  (2, 1001, 'The Beetles at Hollywood', 'Rock', '1980-04-05', 22),
  (3, 1002, 'Blue', 'Country', '2012-12-21', 12),
  (4, 1003, 'Some Boys', 'Rock', '2002-04-05', 21),
  (5, 1004, 'Come Sink with Me', 'Jazz', '2011-03-08', 38);

INSERT INTO Songs (songID, songTitle, songDuration, albumID)
VALUES
  (20001, 'Green Submarine', '00:02:42', 1),
  (20002, 'Bugs Bugs Bugs', '00:03:21', 2),
  (20003, 'Let It Go', '00:02:02', 2),
  (20004, 'I Knew You Were Fine', '00:01:59', 3),
  (20005, 'Autumn in Ohio', '00:03:05', 5);

INSERT INTO Customers (customerID, email, phoneNumber)
VALUES
  (50001, 'realemail@gmail.com', '555-555-5555'),
  (50002, 'person@yahoo.com', '401-402-4003'),
  (50003, 'email@gmail.com', '210-021-2001');

INSERT INTO Purchases (purchaseID, purchaseDate, purchaseAmount, customerID, albumID)
VALUES
  (60001, '2024-02-01', 25, 50001, 1),
  (60002, '2024-02-01', 12, 50001, 3),
  (60003, '2024-01-06', 38, 50002, 3),
  (60004, '2024-01-06', 38, 50003, 5);

-- Re-enable foreign key checks and commit changes
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
