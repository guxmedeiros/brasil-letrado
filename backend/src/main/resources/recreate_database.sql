-- Script para recriar o banco de dados com codificação UTF-8 correta
-- CUIDADO: Isso apagará todos os dados existentes!

-- Recriar o banco de dados com UTF-8
DROP DATABASE IF EXISTS brasil_letrado;
CREATE DATABASE brasil_letrado 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;