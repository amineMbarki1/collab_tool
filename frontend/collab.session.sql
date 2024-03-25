-- SELECT * FROM chat_message 
-- WHERE (sender_id = 1 OR receiver_id = 1) AND id = (SELECT max(id) from chat_message);
SELECT *
from user_info
    JOIN (
        SELECT CASE
                WHEN sender_id = 2 THEN receiver_id
                WHEN receiver_id = 2 THEN sender_id
            END as partner_id
        from chat_message
        WHERE (
                sender_id = 2
                or receiver_id = 2
            )
        GROUP BY partner_id
    ) ON partner_id = user_info.id;
SELECT body,
    partner_id
FROM (
        SELECT CASE
                WHEN sender_id = 2 THEN receiver_id
                WHEN receiver_id = 2 THEN sender_id
            END as partner_id
        from chat_message
        WHERE (
                sender_id = 2
                or receiver_id = 2
            )
        GROUP BY partner_id
    )
    JOIN chat_message c ON (
        (
            partner_id = c.sender_id
            OR partner_id = c.receiver_id
        )
    );
SELECT *
from chat_message;
SELECT *
FROM user_info
    JOIN (
        SELECT body,
            partner_id
        FROM (
                SELECT max(id) as last_id,
                    CASE
                        WHEN sender_id = 2 THEN receiver_id
                        WHEN receiver_id = 2 THEN sender_id
                    END as partner_id
                from chat_message
                WHERE (
                        sender_id = 2
                        or receiver_id = 2
                    )
                GROUP BY partner_id
            )
            JOIN chat_message c ON last_id = c.id
    ) ON partner_id = user_info.id;


SELECT CONCAT(first_name, ' ' ,last_name) as full_name, partner_id, body
FROM user_info
    JOIN (
        SELECT body,
            partner_id
        FROM (
                SELECT max(id) as last_id,
                    CASE
                        WHEN sender_id = 2 THEN receiver_id
                        WHEN receiver_id = 2 THEN sender_id
                    END as partner_id
                from chat_message
                WHERE (
                        sender_id = 2
                        or receiver_id = 2
                    )
                GROUP BY partner_id
            )
            JOIN chat_message c ON last_id = c.id
    ) ON partner_id = user_info.id;



SELECT max(id) as last_id,
    CASE
        WHEN sender_id = 2 THEN receiver_id
        WHEN receiver_id = 2 THEN sender_id
    END as partner_id
from chat_message
WHERE (
        sender_id = 2
        or receiver_id = 2
    )
GROUP BY partner_id