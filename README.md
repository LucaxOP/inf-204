# INF204 - Prática Laboratorial 07

Aplicativo desenvolvido com React Native e Expo para a Prática Laboratorial 07: consumo de API REST com Axios.

## Integrantes

- Lucas Oliveira Paiva - Matrícula: 27940
- Gabryel Messias Oliveira de Assis - Matrícula: 27316

## Funcionalidades

- Instância do Axios isolada em `src/services/api.js` (padrão Service).
- URL base da API lida da variável de ambiente `EXPO_PUBLIC_API_URL` (arquivo `.env`).
- Busca de utilizadores com `useEffect` e bloco `try/catch/finally`.
- Indicador de carregamento com `ActivityIndicator`.
- Desafio extra: pull-to-refresh na `FlatList`, chamando a API novamente.
- Desafio extra: tela de cadastro (Nome e Email) que envia `api.post()` e exibe alerta de sucesso ou erro.

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
