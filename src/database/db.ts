import type { SQLiteDatabase } from 'expo-sqlite';

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(
    `PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS rutinas(
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        muscleGroup TEXT NOT NULL,
        duration REAL NOT NULL,
        createdAt TEXT NOT NULL
    );
    `
  );

  console.log('Base de datos local lista');
};