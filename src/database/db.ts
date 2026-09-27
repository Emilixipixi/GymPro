import type { SQLiteDatabase } from 'expo-sqlite';

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(
    `PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS rutinas(
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        muscleGroup TEXT NOT NULL,
        duration REAL NOT NULL,
        createdAt TEXT NOT NULL,
        featured INTEGER NOT NULL DEFAULT 0
    );
    `
  );

  const columnas = await db.getAllAsync<{ name: string }>('PRAGMA table_info(rutinas)');
  const tieneFeatured = columnas.some((columna) => columna.name === 'featured');

  if (!tieneFeatured) {
    await db.execAsync('ALTER TABLE rutinas ADD COLUMN featured INTEGER NOT NULL DEFAULT 0');
  }

  console.log('Base de datos local lista');
};