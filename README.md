# Fórmula Emagrecer

Aplicativo frontend (Vite + React + TypeScript + Tailwind) de acompanhamento de emagrecimento, refeições, chás e exercícios.

## Requisitos
- Node.js 18+ recomendado
- npm 9+

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:8080

## Build de produção

```bash
npm run build
npm run preview
```

## Scripts
- `npm run dev` — ambiente de desenvolvimento (Vite)
- `npm run build` — build de produção
- `npm run build:dev` — build em modo development
- `npm run preview` — servir o build localmente
- `npm run lint` — análise estática (ESLint)
- `npm run test` — testes (Vitest)

## Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3 + shadcn/ui (Radix UI)
- React Router 6
- TanStack Query 5
- Recharts, Lucide Icons

## Estrutura
- `src/pages` — páginas roteadas
- `src/screens` — telas principais do app
- `src/components` — componentes reutilizáveis e UI (shadcn)
- `src/contexts` — contextos React (estado global do app)
- `src/hooks` — hooks customizados
- `src/data` — dados estáticos (planos de refeição, chás, exercícios, etc.)
- `src/assets` — imagens

## Observações para exportação
O projeto é puramente frontend e está pronto para ser importado em ambientes externos como Firebase Studio ou Google AI Studio.
Não há backend nem banco de dados conectado — toda a persistência atual é via `localStorage`.
