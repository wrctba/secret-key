# Usa Node 20 (Vercel também roda nesse)
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia configs
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto
COPY . .

# Porta padrão do Next.js
EXPOSE 3000

# Rodar em modo dev (pode trocar por build/start se preferir)
CMD ["npm", "run", "dev"]
