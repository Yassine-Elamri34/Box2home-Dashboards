/* SELECT
    IFNULL(order_category, 'Total orders') AS order_category,
    SUM(order_count) AS order_count
FROM (
    SELECT
        CASE
            WHEN status IN ('TERMINEE', 'ENLEVEE') THEN 'finished_successfully'
            WHEN status IN ('LIVRAISON_IMPOSSIBLE') THEN 'LIVRAISON_IMPOSSIBLE'
            WHEN status IN ('SCHEDULE_WAIT', 'PROGRAMMEE', 'EN_ATTENTE') THEN 'in_progress'
        END AS order_category,
        COUNT(*) AS order_count
    FROM
        `order`
    WHERE 
        YEAR(created_at) = 2024
        AND status IN ('TERMINEE', 'ENLEVEE', 'LIVRAISON_IMPOSSIBLE', 'SCHEDULE_WAIT', 'PROGRAMMEE', 'EN_ATTENTE')
    GROUP BY
        order_category
    WITH ROLLUP
) AS result
GROUP BY
    order_category
ORDER BY
    CASE
        WHEN order_category = 'Total orders' THEN 1
        ELSE 0
    END, order_category;

   
SELECT pickup_start
FROM legacy.course
WHERE code = (SELECT TOP   legacy_id FROM b2h_edi_parser_db.`order` WHERE legacy_id IS NOT NULL ORDER BY some_column DESC LIMIT 1); 


SELECT SUM(CASE WHEN status = 'TERMINEE' THEN 1 ELSE 0 END) / COUNT(*) * 100 AS percentage_on_time
FROM b2h_edi_parser_db.`order`;


SELECT AVG(weight) AS avg_weight_per_order
FROM legacy.course;


SELECT YEAR(created_at) AS year,
    
       AVG(weight) AS avg_weight_per_order
FROM legacy.course where  weight IS NOT NULL  and created_at IS NOT NULL
GROUP BY YEAR(created_at);



SELECT eo.legacy_id,eo.status
FROM b2h_edi_parser_db.`order` eo
JOIN (
    SELECT status, MIN(order_id) AS random_order_id
    FROM b2h_edi_parser_db.`order`
    WHERE legacy_id IS NOT NULL
    GROUP BY status
) AS random_orders ON eo.order_id = random_orders.random_order_id;

SELECT eo.legacy_id, eo.status, lc.status_id
FROM b2h_edi_parser_db.`order` eo
JOIN (
    SELECT status, MIN(order_id) AS random_order_id
    FROM b2h_edi_parser_db.`order`
    WHERE legacy_id IS NOT NULL
    GROUP BY status
) AS random_orders ON eo.order_id = random_orders.random_order_id
JOIN legacy.course lc ON eo.legacy_id = lc.code ORDER BY status_id;*





SELECT 
    status,
    COUNT(*) AS status_count
FROM 
    b2h_edi_parser_db.`order`
WHERE 
    status IN ('ANNULLEE', 'NOT_RESPONDING', 'LIVRAISON_IMPOSSIBLE', 'RETRAIT_IMPOSSIBLE', 'CANCELED_CENTIRO', 'ANNULEE_JOURJ', 'CANCELED_MP ABANDONNEE')
GROUP BY 
    status;



   
   
   
   
   
   
   
   
   
   
   
SELECT 
    YEAR(created_at) AS year,
    MONTHNAME(created_at) AS month,
    status,
    COUNT(*) AS status_count
FROM 
    (
        SELECT 
            status,
            created_at
        FROM 
            b2h_edi_parser_db.`order`
        WHERE 
            status IN (
                'ANNULLEE', 'NOT_RESPONDING',
                'LIVRAISON_IMPOSSIBLE',
                'RETRAIT_IMPOSSIBLE', 
                'CANCELED_CENTIRO',
                'ANNULEE_JOURJ', 
                'CANCELED_MP',
                'ABANDONNEE'
            )

        UNION ALL  

        SELECT   
            'TECHNICAL_ISSUES' AS status,
            o.created_at
        FROM 
            b2h_edi_parser_db.`order` o
        JOIN 
            b2h_edi_parser_db.failed_request f ON o.edi_order_id = f.basic_id
    ) AS combined_orders
GROUP BY   
    year, month, status;


    */
