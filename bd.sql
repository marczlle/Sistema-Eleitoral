create database eleicao;
use eleicao;

CREATE TABLE Eleitores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nasc date,
    endereco varchar(100),
    genero char(1)
);

CREATE TABLE Candidatos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
   -- partido_polit varchar(20),
   -- numero_candidato char(13)
    -- Outros campos relevantes, como partido político, número do candidato, etc.
);

CREATE TABLE Votos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_eleitor INT,
    id_candidato INT,
    FOREIGN KEY (id_eleitor) REFERENCES Eleitores(id),
    FOREIGN KEY (id_candidato) REFERENCES Candidatos(id)
);

INSERT INTO Candidatos (nome) VALUES ('Candidato 1');
INSERT INTO Candidatos (nome) VALUES ('Candidato 2');
INSERT INTO Candidatos (nome) VALUES ('Candidato 3');



