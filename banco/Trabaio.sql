CREATE TABLE "usuario" (
  "id_usuario" integer PRIMARY KEY,
  "username" varchar(100),
  "senha" varchar(200)
);

CREATE TABLE "produto" (
  "id_produto" integer PRIMARY KEY,
  "id_usuario" integer,
  "id_produto_compra" integer,
  "nome" varchar(255),
  "descricao" varchar(2000),
  "preco" numeric(15,2),
  "estoque" bigint(8),
  "categoria" varchar(50),
  "imagem" blob
);

CREATE TABLE "compra" (
  "id_compra" integer PRIMARY KEY,
  "id_usuario" integer,
  "id_produto_compra" integer,
  "id_transacao" integer
);

CREATE TABLE "transacao" (
  "id_transacao" integer PRIMARY KEY,
  "dt_transacao" timestamp,
  "valor" numeric(15,2),
  "tipo" varchar(100)
);

CREATE TABLE "produto_compra" (
  "id_compra" integer,
  "id_produto" integer
);

ALTER TABLE "transacao" ADD CONSTRAINT "fk_transacao_compra" FOREIGN KEY ("id_transacao") REFERENCES "compra" ("id_transacao");

ALTER TABLE "produto_compra" ADD CONSTRAINT "fk_produto_compra" FOREIGN KEY ("id_produto") REFERENCES "produto" ("id_produto_compra");

ALTER TABLE "produto_compra" ADD CONSTRAINT "fk_compra_produto" FOREIGN KEY ("id_compra") REFERENCES "compra" ("id_produto_compra");

ALTER TABLE "usuario" ADD CONSTRAINT "fk_produto_compra" FOREIGN KEY ("id_usuario") REFERENCES "compra" ("id_usuario");

ALTER TABLE "usuario" ADD CONSTRAINT "fk_produto_usuario" FOREIGN KEY ("id_usuario") REFERENCES "produto" ("id_usuario");
