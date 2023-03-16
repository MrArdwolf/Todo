# Installations Instruktioner Frontend
## installera next.js och react
1. För att installer next.js och react så ska man starta en terminal i project mappen ock köra:
    ```
    yarn create next-app .
    ```
2. välja vad man ska ha i sitt projekt
- Typescript = No
- ESLint = No
- `src/` directory = No
- experimental `app/` directory = No

## Installera Tailwind CSS
1. För att installer Tailwind CSS så ska man köra:
    ```
    yarn add -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p -full
    ```
2. Ändra namnet på `-u` till `tailwind.config.js` och byta ut content i `tailwind.config.js` till
    ```js
      content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    ```
## Byta Ut Filer
1. öppna `pages/index.js` och ersätt allt med:
    ```js
    import { Inter } from '@next/font/google'

    const inter = Inter({ subsets: ['latin'] })

    export default function Home() {
        return (
            <main>
                <p className='text-blue-600'>Hello World!</p>
            </main>
        )
    }
    ```
2. ta bort `styles/Home.module.css` och öppna `styles/globals.css`. ersätt sedan allt med:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
## Starta Hemsidan
1. för att starta hemsidan kör:
    ```
    yarn dev
    ```

# Installations Instruktioner Backend
## Installera Stapi Och PostgreSQL
1. 