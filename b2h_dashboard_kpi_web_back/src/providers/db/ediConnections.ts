import mysql from 'mysql2/promise';

export async function executeQuery(sql: string): Promise<any[]> {
       try {
              const connection = await mysql.createConnection({
                     host: 'localhost',
                     port: 3306,
                     user: 'root',
                     password: 'root',
                     database: 'b2h_edi_parser_db'
              });

              console.log('Connected to MySQL database');

              const result: any = await connection.execute(sql);

              if (Array.isArray(result[0])) {
                     const [rows] = result;
                     await connection.end(); // Close the connection after fetching results
                     return rows;
              } else {
                     const resultSetHeader = result[0];
                     console.log('Query OK. Affected rows:', resultSetHeader.affectedRows);
                     await connection.end(); // Close the connection after fetching results
                     return resultSetHeader;
              }
       } catch (error) {
              console.error('Error executing query:', error);
              throw error;
       }
}
