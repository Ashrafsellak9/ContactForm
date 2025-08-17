<?php 
require_once(__DIR__ . '/config.php');

if(isset($_POST['submit'])) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    $errors = [];

    // Validation
    if(empty($name)) {
        $errors[] = "Name is required";
    }
    if(empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    if(empty($message)) {
        $errors[] = "Message is required";
    }

    // Insert into database
    if(empty($errors)) {
        try {
            $sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $email, $message]);

            $success = "Thank you! Your message has been sent successfully.";
        } catch (PDOException $e) {
            $errors[] = "Error saving message: " . $e->getMessage();
        }
    }
} else {
    // Redirect back if someone accesses this page directly
    header("Location: index.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form - Result</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 50px 20px;
        }
        .container {
            max-width: 600px;
            background: white;
            padding: 30px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .error li {
            list-style: inside;
        }
        .btn {
            margin-top: 10px;
            width: 48%;
        }
    </style>
</head>
<body>
    <div class="container text-center">
        <h1>Contact Form Result</h1>

        <?php if(isset($success)) : ?>
            <div class="success">
                <?php echo $success; ?>
            </div>
        <?php endif; ?>

        <?php if(!empty($errors)) : ?>
            <div class="error text-start">
                <ul>
                <?php foreach($errors as $error) : ?>
                    <li><?php echo $error; ?></li>
                <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <div class="d-flex justify-content-between">
            <a href="index.html" class="btn btn-primary">Send Another Message</a>
            <a href="view_messages.php" class="btn btn-secondary">View All Messages</a>
        </div>
    </div>
</body>
</html>
