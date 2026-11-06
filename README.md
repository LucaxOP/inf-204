# INF204 - Prática Laboratorial 09

Aplicativo desenvolvido com React Native e Expo para a Prática Laboratorial 09: estado global com Context API e autenticação.

## Integrantes

- Lucas Oliveira Paiva - Matrícula: 27940
- Gabryel Messias Oliveira de Assis - Matrícula: 27316

## Funcionalidades

- `AuthContext` com `AuthProvider` em `src/contexts/AuthContext.js` (login/logout simulados).
- Custom Hook `useAuth` em `src/hooks/useAuth.js`, evitando importar `useContext` em cada tela.
- Rotas protegidas em `src/routes/index.js`: a Stack mostra `Login` ou `Dashboard` conforme o estado global `logado`.
- `App.js` envolve a aplicação com os Providers, eliminando o Prop Drilling.
- Desafio extra (Múltiplos Contextos): `TemaContext` com `ThemeProvider` envolvendo o `AuthProvider`; o Dashboard alterna entre tema claro e escuro e muda a cor de fundo.
- Desafio extra (Persistência de Sessão): `signIn` grava o usuário no AsyncStorage com `JSON.stringify` e um `useEffect` no `AuthProvider` restaura a sessão ao abrir o app; `signOut` remove a sessão salva.

## Estrutura

```
src/
  contexts/AuthContext.js
  contexts/TemaContext.js
  hooks/useAuth.js
  hooks/useTema.js
  routes/index.js
  utils/sessao.js
```

## Como executar

```bash
npm install
npx expo start
```

No terminal do Expo, use o QR Code para abrir no Expo Go ou pressione `w` para executar no navegador.

## Testes

```bash
npm test
```
