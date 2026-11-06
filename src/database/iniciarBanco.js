// Executado pelo SQLiteProvider (onInit) antes de renderizar as telas.
// Cria as estruturas do banco caso ainda nao existam ("migracoes").
export async function iniciarBanco(db) {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);
  console.log("Banco de Dados inicializado e tabelas criadas!");
}
