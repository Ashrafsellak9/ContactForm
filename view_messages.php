<?php 
require_once(__DIR__ . '/config.php');

try {
    $sql = "SELECT * FROM contacts ORDER BY created_at DESC";
    $stmt = $pdo->query($sql);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error fetching messages: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Contact Messages</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .message-card {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 10px;
        }
        .sender-info {
            font-weight: bold;
            color: #495057;
        }
        .date-time {
            font-size: 0.9em;
            color: #6c757d;
        }
        .message-content {
            margin-top: 15px;
            line-height: 1.6;
        }
        .btn {
            background-color: #007bff;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        .no-messages {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            padding: 40px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>All Contact Messages</h1>
        <p>Total messages: <?php echo count($messages); ?></p>
        <a href="index.html" class="btn" style="margin-bottom: 30px;">Send New Message</a>

        <?php if (empty($messages)) : ?>
            <div class="no-messages">
                <p>No messages yet. Be the first to send one!</p>
            </div>
        <?php else : ?>
            <?php foreach($messages as $message) : ?>
                <div class="message-card">
                    <div class="message-header">
                        <div class="sender-info">
                            <?php echo htmlspecialchars($message['name']); ?>
                            <span style="color: #007bff;">
                                (<?php echo htmlspecialchars($message['email']); ?>)
                            </span>
                        </div>
                        <div class="date-time">
                            <?php echo date('M j, Y \a\t g:i A', strtotime($message['created_at'])); ?>
                        </div>
                    </div>
                    <div class="message-content">
                        <?php echo nl2br(htmlspecialchars($message['message'])); ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</body>
</html>
