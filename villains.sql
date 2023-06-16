CREATE database l_villains

USE l_villains;

CREATE USER 'l_villains_user'@'%' IDENTIFIED WITH mysql_native_password BY 'villains';

GRANT ALL ON l_villains.* TO 'l_villains_user'@'%';

SELECT * FROM l_villains

CREATE TABLE villains (
    name VARCHAR(255),
    movie VARCHAR(255),
    slug VARCHAR(255),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME,
    PRIMARY KEY(name)
);

INSERT INTO villains (name, movie, slug) VALUES ('Captain Hook', 'Peter Pan', 'captain-hook'), ('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil'), ('Gaston', 'Beauty and the Beast', 'gaston'), ('Hades', 'Hercules', 'hades'), ('Horned King', 'The Black Cauldron', 'horned-king'), ('Jafar', 'Aladdin', 'jafar'), ('Lady Tremaine', 'Cinderella', 'lady-tremaine'), ('Madame Medusa', 'The Rescuers', 'madame-medusa'), ('Madam Mim', 'The Sword in the Stone', 'madam-mim'), ('Maleficent', 'Sleeping Beauty', 'maleficent'), ('Prince John', 'Robin Hood', 'prince-john'), ('Sir Hiss', 'Robin Hood', 'sir-hiss'), ('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde'), ('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'), ('Scar', 'The Lion King', 'scar'), ('Shan Yu', 'Mulan', 'shan-yu'), ('Shere Khan', 'The Jungle Book', 'shere-khan'), ('Ursula', 'The Little Mermaid', 'ursula')
