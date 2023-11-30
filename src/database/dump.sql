CREATE DATABASE pdv;

CREATE TABLE usuarios(
  id serial PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  senha text NOT NULL
);

CREATE TABLE categorias(
	id serial PRIMARY KEY,
  descricao text NOT NULL UNIQUE
);

INSERT INTO categorias (descricao) 
VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');