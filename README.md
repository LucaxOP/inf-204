# INF204 - Prática Laboratorial 08

Aplicativo desenvolvido com React Native e Expo para a Aula 08: persistência local com AsyncStorage e SQLite.

## Integrantes

- Lucas Oliveira Paiva - Matrícula: 27940
- Gabryel Messias Oliveira de Assis - Matrícula: 27316

## Funcionalidades

- **Expo SQLite**: `SQLiteProvider` com `onInit` criando a tabela `tarefas` (`src/database/iniciarBanco.js`).
- Acesso ao banco na tela com o hook `useSQLiteContext`.
- CRUD de tarefas: `getAllAsync` (SELECT) e `runAsync` com parâmetros `?` (INSERT, UPDATE e DELETE), evitando SQL Injection.
- **AsyncStorage** (`src/storage/preferencias.js`):
  - Tema claro/escuro salvo como string na chave `@MeuApp:Tema`.
  - Perfil do usuário salvo como objeto com `JSON.stringify` / `JSON.parse`.
  - "Sair" remove só o perfil com `removeItem`, mantendo o tema salvo.
- Tarefas, tema e perfil continuam disponíveis depois de fechar e reabrir o aplicativo.

## Como executar

```bash
npm install
npx expo start
```

No terminal do Expo, use o QR Code para abrir no Expo Go (Android/iOS).

## Testes

```bash
npm test
```
