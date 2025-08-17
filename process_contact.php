<?php 
  require_once(__DIR__ . '/config.php');

  if(isset(_POST['submit'])) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    $errors = [];

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

    if(empty($errors)) {
        try {
            $sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
            $stmt = $sql->prepare($sql);
            $stmt->execute([$name, $email, $message]);

            $success = "Thank you! Your message has been sent successfully.";
        } catch (PDOException $e) {
            $errors[] = "Error saving message: " . $e->getMessage();
        }
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form - Result</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <div class="container">
        <h1>Contact Form Result</h1>
        <?php if(isset($success)) : ?>
            <div class="success">
                <?php echo $success;?>
            </div>
        <?php endif; ?>
        <?php if(!empty($errors)) : ?>
            <div class="error">
                <?php foreach($errors as $error) :?>
                    <li><?php echo $error; ?></li>
                <?php endforeach; ?>
            </div>
        <?php endif;?>
        <a href="index.html" class="btn btn-primary">Send Another Message</a>
        <a href="view_message.php" class="btn btn-secondary">View All Messages</a>
    </div>
</body>
</html>