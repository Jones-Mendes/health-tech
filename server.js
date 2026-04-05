const app = require("./src/app");
const { initDatabase } = require("./src/database/init");

const PORT = process.env.PORT || 5000;

async function start() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Falha ao iniciar o servidor:", err);
  process.exit(1);
});