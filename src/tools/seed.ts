// src/tools/seed.ts
import { MongoClient } from "mongodb";

/**
 * Clase para poblar (seed) la base de datos con datos de ejemplo.
 * Permite insertar datos en las colecciones 'users' y 'nomina' de la base de datos especificada.
 */
export class DatabaseSeeder {
  /** URI de conexión a MongoDB */
  private uri: string;
  /** Nombre de la base de datos */
  private dbName: string;
  /** Cliente de MongoDB */
  private client: MongoClient;

  /**
   * Crea una instancia de DatabaseSeeder.
   * @param uri URI de conexión a MongoDB
   * @param dbName Nombre de la base de datos
   */
  constructor(uri: string, dbName: string) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }

  /**
   * Conecta el cliente a la base de datos.
   */
  async connect() {
    await this.client.connect();
  }

  /**
   * Cierra la conexión con la base de datos.
   */
  async disconnect() {
    await this.client.close();
  }

  /**
   * Inserta un arreglo de usuarios en la colección 'users'.
   * @param users Arreglo de objetos usuario a insertar
   */
  async seedUsers(users: any[]) {
    const db = this.client.db(this.dbName);
    const collection = db.collection("users");
    await collection.insertMany(users);
  }

  /**
   * Inserta un arreglo de registros en la colección 'nomina'.
   * @param nomina Arreglo de objetos nómina a insertar
   */
  async seedNomina(nomina: any[]) {
    const db = this.client.db(this.dbName);
    const collection = db.collection("nomina");
    await collection.insertMany(nomina);
  }

  // Puedes agregar más métodos para otras colecciones
}

/**
 * Ejemplo de uso (descomenta para ejecutar como script):
 *
 * (async () => {
 *   const seeder = new DatabaseSeeder("mongodb://localhost:27017", "empresa");
 *   await seeder.connect();
 *   await seeder.seedUsers([{ nombre: "Juan" }, { nombre: "Ana" }]);
 *   await seeder.seedNomina([{ empleado: "Juan", salario: 1000 }]);
 *   await seeder.disconnect();
 * })();
 */
