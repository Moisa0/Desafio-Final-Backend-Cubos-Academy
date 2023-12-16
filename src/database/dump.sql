DROP DATABASE IF EXISTS pdv;

CREATE DATABASE pdv;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  senha text NOT NULL
);

CREATE TABLE categorias (
	id serial PRIMARY KEY,
  descricao text NOT NULL UNIQUE
);

CREATE TABLE produtos (
  id serial PRIMARY KEY,
  descricao text NOT NULL,
  quantidade_estoque int NOT NULL,
  valor int NOT NULL,
  categoria_id int REFERENCES categorias(id),
  produto_image text
);

CREATE TABLE clientes (
  id serial PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  cpf text NOT NULL UNIQUE,
  cep text,
  rua text,
  numero int,
  bairro text,
  cidade text,
  estado text
);

CREATE TABLE pedidos (
  id serial PRIMARY KEY,
  cliente_id int REFERENCES clientes(id),
  observacao,
  valor_total
);

CREATE TABLE pedido_produtos (
  id serial PRIMARY KEY,
  pedido_id int REFERENCES pedidos(id),
  produto_id int REFERENCES produto(id),
  quantidade_produto int,
  valor_produto int
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