const db = require("./db");

const schemaSql = `
CREATE TABLE IF NOT EXISTS pacientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  idade INTEGER,
  condicao TEXT,
  observacoes TEXT
);

CREATE TABLE IF NOT EXISTS atendimentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  paciente_id INTEGER NOT NULL,
  data_atendimento TEXT NOT NULL,
  observacoes TEXT,
  humor TEXT,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rotinas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  paciente_id INTEGER NOT NULL,
  descricao TEXT NOT NULL,
  periodo TEXT,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medicamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  paciente_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  dosagem TEXT,
  horario TEXT,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evolucoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  paciente_id INTEGER NOT NULL,
  data_registro TEXT NOT NULL,
  descricao TEXT NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_atendimentos_paciente ON atendimentos(paciente_id);
CREATE INDEX IF NOT EXISTS idx_rotinas_paciente ON rotinas(paciente_id);
CREATE INDEX IF NOT EXISTS idx_medicamentos_paciente ON medicamentos(paciente_id);
CREATE INDEX IF NOT EXISTS idx_evolucoes_paciente ON evolucoes(paciente_id);
`;

async function initDatabase() {
  await db.exec(schemaSql);
}

module.exports = {
  initDatabase,
};
