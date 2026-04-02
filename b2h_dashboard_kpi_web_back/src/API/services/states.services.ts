// import { executeQuery } from '@src/providers/db/ediConnections';

// Define user services
const statesServices = {
       fetchOrdersByStatus: async () => {
              return {
        finished_successfully: 320,
        in_progress: 80,
        LIVRAISON_IMPOSSIBLE: 25,
        Total_orders: 425
    };


       //        try {
       //               const sqlQuery = `
       //          SELECT
       //              IFNULL(order_category, 'Total_orders') AS order_category,
       //              SUM(order_count) AS order_count
       //          FROM (
       //              SELECT
       //                  CASE
       //                      WHEN status IN ('TERMINEE', 'ENLEVEE') THEN 'finished_successfully'
       //                      WHEN status IN ('LIVRAISON_IMPOSSIBLE') THEN 'LIVRAISON_IMPOSSIBLE'
       //                      WHEN status IN ('SCHEDULE_WAIT', 'PROGRAMMEE', 'EN_ATTENTE') THEN 'in_progress'
       //                  END AS order_category,
       //                  COUNT(*) AS order_count
       //              FROM
       //                  \`order\`
       //              WHERE 
       //                  YEAR(created_at) = 2024
       //                  AND status IN ('TERMINEE', 'ENLEVEE', 'LIVRAISON_IMPOSSIBLE', 'SCHEDULE_WAIT', 'PROGRAMMEE', 'EN_ATTENTE')
       //              GROUP BY
       //                  order_category
       //              WITH ROLLUP
       //          ) AS result
       //          GROUP BY
       //              order_category
       //          ORDER BY
       //              CASE
       //                  WHEN order_category = 'Total_orders' THEN 1
       //                  ELSE 0
       //              END, order_category;
       //      `;
       //               const rows: any[] = await executeQuery(sqlQuery);
       //               const result: Object = {};

       //               rows?.forEach(item => {
       //                      result[item.order_category] = item.order_count;
       //               });
       //               return result;
       //        } catch (error) {
       //               throw new Error('Error fetching orders by status');
       //        }
       },
       averageWeightOrVolumePerOrder: async () => {
                return {
        2022: 1.2,
        2023: 1.5,
        2024: 1.8
    };
       //        try {
       //               const sqlQuery = `
       //               SELECT YEAR(created_at) AS year,
    
       //               AVG(weight) AS avg_weight_per_order
       //        FROM legacy.course where  weight IS NOT NULL  and created_at IS NOT NULL
       //        GROUP BY YEAR(created_at);
       //      `;

       //               const rows: any[] = await executeQuery(sqlQuery);
       //               const result: Object = {};

       //               rows?.forEach(item => {
       //                      result[item.year] = item.avg_weight_per_order / 1000;
       //               });
       //               return result;
       //        } catch (error) {
       //               throw new Error('Error fetching orders by status');
       //        }
       },
       fetchOrdersByTechnicalIssues: async () => {
     return {
        2024: [] // ← VERY IMPORTANT (must be array)
    };
},
              // try {
              //        const sqlQuery = `
                
              //                   SELECT 
              //                   YEAR(created_at) AS year,
              //                   MONTHNAME(created_at) AS month,
              //                   status,
              //                   COUNT(*) AS status_count
              //                   FROM 
              //                   (
              //                       SELECT 
              //                           status,
              //                           created_at
              //                       FROM 
              //                           b2h_edi_parser_db.\`order\`
              //                       WHERE 
              //                           status IN (
              //                               'ANNULLEE', 'NOT_RESPONDING',
              //                               'LIVRAISON_IMPOSSIBLE',
              //                               'RETRAIT_IMPOSSIBLE', 
              //                               'CANCELED_CENTIRO',
              //                               'ANNULEE_JOURJ', 
              //                               'CANCELED_MP',
              //                               'ABANDONNEE'
              //                           )

              //                       UNION ALL  

              //                       SELECT   
              //                           'TECHNICAL_ISSUES' AS status,
              //                           o.created_at
              //                       FROM 
              //                           b2h_edi_parser_db.\`order\` o
              //                       JOIN 
              //                           b2h_edi_parser_db.failed_request f ON o.edi_order_id = f.basic_id
              //                   ) AS combined_orders
              //                   GROUP BY   
              //                   year, month, status;  `;
              //        console.log('fetchOrdersByTechnicalIssues');
              //        const rows: any[] = await executeQuery(sqlQuery);

              //        let result: any = {};
              //        await Promise.all(
              //               rows?.map(item => {
              //                      if (!result[item.year]) {
              //                             // If the year doesn't exist in the result object, create it with an empty array
              //                             result[item.year] = [];
              //                      }

              //                      // Find the index of the month in the array for the current year
              //                      const monthIndex = result[item.year].findIndex((entry: any) => entry.month === item.month);

              //                      if (monthIndex === -1) {
              //                             // If the month doesn't exist in the array, push a new object for that month
              //                             result[item.year].push({ month: item.month, data: [{ status: item.status, status_count: item.status_count }] });
              //                      } else {
              //                             // If the month already exists in the array, push the data to that month's data array
              //                             result[item.year][monthIndex].data.push({ status: item.status, status_count: item.status_count });
              //                      }
              //               })
              //        ).then(() => {
              //               console.clear();
              //               console.log('fetchOrdersByTechnicalIssues dzadzadza');
              //               console.log(result[2024].map(item => console.log(item)));
              //        });
              //        return result;
              // } catch (error) {
              //        throw new Error('Error fetching orders by technical issues');
              // }
       
       packageStatusDistribution: async () => {
              return [];
              // try {
              //        const sqlQuery = `
                 
              //               SELECT status, COUNT(*) AS package_count
              //               FROM b2h_edi_parser_db.package
              //               GROUP BY status;
              //        `;
              //        console.log('packageStatusDistribution');
              //        const rows: any[] = await executeQuery(sqlQuery);

              //        return rows;
              // } catch (error) {
              //        throw new Error('Error fetching orders by technical issues');
              // }
       },
       packageSources: async () => {
               return [];
              // try {
              //        const sqlQuery = `
                 
              //        SELECT source, COUNT(*) AS package_count
              //        FROM package WHERE source is not null
              //        GROUP BY source
              //        ORDER BY package_count DESC 
              //        LIMIT 4  ;
              //        `;
              //        console.log('packageSources');
              //        const rows: any[] = await executeQuery(sqlQuery);

              //        return rows;
              // } catch (error) {
              //        throw new Error('Error fetching orders by technical issues');
              // }
       },
       topOrdersExternalCodes: async () => {
              return [];
              // try {
              //        const sqlQuery = `
                 
              //        SELECT o.sales_channel, COUNT(*) AS order_count, MAX(p.created_at) AS last_package_created_at
              //        FROM b2h_edi_parser_db.\`order\` o
              //        LEFT JOIN b2h_edi_parser_db.package p ON o.order_id = p.order_id
              //        GROUP BY o.sales_channel
              //        HAVING last_package_created_at IS NOT NULL  
              //        ORDER BY order_count DESC
              //        LIMIT 5;
              //        `;
              //        console.log('packageSources');
              //        const rows: any[] = await executeQuery(sqlQuery);

              //        return rows;
              // } catch (error) {
              //        throw new Error('Error fetching orders by technical issues');
              // }
       },
       fetchOrdersByStatusByCanal: async () => {
    return {
        finished_successfully: 200,
        in_progress: 60,
        LIVRAISON_IMPOSSIBLE: 20,
        Total_orders: 280
    };
},
       // fetchOrdersByStatusByCanal: async (external_canal?: string) => {
       //        try {
       //               console.log(external_canal);
       //               const sqlQuery = `
       //               SELECT
       //               IFNULL(order_category, 'Total_orders') AS order_category,
       //               SUM(order_count) AS order_count
       //           FROM (
       //               SELECT
       //                   CASE
       //                       WHEN status IN ('TERMINEE', 'ENLEVEE') THEN 'finished_successfully'
       //                       WHEN status IN ('LIVRAISON_IMPOSSIBLE') THEN 'LIVRAISON_IMPOSSIBLE'
       //                       WHEN status IN ('SCHEDULE_WAIT', 'PROGRAMMEE', 'EN_ATTENTE') THEN 'in_progress'
       //                   END AS order_category,
       //                   COUNT(*) AS order_count
       //               FROM
       //                   \`order\`
       //               WHERE 
       //                   YEAR(created_at) = 2024
       //                   AND status IN ('TERMINEE', 'ENLEVEE', 'LIVRAISON_IMPOSSIBLE', 'SCHEDULE_WAIT', 'PROGRAMMEE', 'EN_ATTENTE')
       //                   AND (external_canal = "${external_canal}" OR "${external_canal}" IS NULL)
                         
       //               GROUP BY
       //                   order_category
       //               WITH ROLLUP
       //           ) AS result
       //           GROUP BY
       //               order_category
       //           ORDER BY
       //               CASE
       //                   WHEN order_category = 'Total_orders' THEN 1
       //                   ELSE 0
       //               END, order_category;
                 
       //      `;
       //               const rows: any[] = await executeQuery(sqlQuery);
       //               const result: Object = {};

       //               rows?.forEach(item => {
       //                      result[item.order_category] = item.order_count;
       //               });
       //               return result;
       //        } catch (error) {
       //               throw new Error('Error fetching orders by status');
       //        }
       // },
       // averageWeightOrVolumePerOrderByCanal: async (external_canal?: string) => {
       //        try {
       //               console.log(external_canal);
       //               const sqlQuery = `
                      
       //               SELECT 
       //               YEAR(c.created_at) AS year,
       //               AVG(c.weight) AS avg_weight_per_order
       //               FROM legacy.course c
       //               LEFT JOIN b2h_edi_parser_db.\`order\` o ON c.code = o.legacy_id AND (o.external_canal = "${external_canal}" OR o.external_canal IS NULL)
       //               WHERE YEAR(c.created_at) IS NOT NULL
       //               AND o.external_canal IS NOT NULL
       //               GROUP BY o.external_canal, YEAR(c.created_at)
       //               HAVING AVG(c.weight) IS NOT NULL;

       //      `;

       //               const rows: any[] = await executeQuery(sqlQuery);
       //               const result: Object = {};

       //               rows?.forEach(item => {
       //                      result[item.year] = item.avg_weight_per_order / 1000;
       //               });
       //               return result;
       //        } catch (error) {
       //               throw new Error('Error fetching orders by status');
       //        }
       // }
       averageWeightOrVolumePerOrderByCanal: async () => {
    return {
        2022: 1.1,
        2023: 1.4,
        2024: 1.7
    };
},
};

// Export user services
export default statesServices;
/* 


EN_ATTENTE	2
CHARGEMENT	4
ENLEVEE	5
VERS_DECHARGEMENT	6
PROGRAMMEE	7
TERMINEE	7
DECHARGEMENT_EN_COURS	7
SUPPLY_COMPLETE	7
ANNULLEE	8
CREATED	8
ASSIGNED	13
ANNULEE_JOURJ	13
RETRAIT_IMPOSSIBLE	15
LIVRAISON_IMPOSSIBLE	16
CANCELED_MP	20
SUPPLY_WAIT	22
VERS_ENLEVEMENT	22
SAVED_IN_LEGACY	22
SUPPLY_IN_PROGRESS	23
SCHEDULE_WAIT	24
NOT_RESPONDING	24
ANNULEE_JOURJ1	27


*/
