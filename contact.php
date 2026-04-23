
<?php 


function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue; // skip comments
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if (!array_key_exists($name, $_ENV)) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

loadEnv(__DIR__ . '/../.env');

// Now use getenv() or $_ENV
$apiKey = getenv('API_KEY');


if (isset($_POST['submit'])) {
    // Get the reCAPTCHA token from the form
    $recaptchaToken = $_POST['g-recaptcha-response'];
    $secretKey = getenv('RECAPTCHA_SECRET_KEY');
    
    // Verify the reCAPTCHA token
    $verifyURL = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($verifyURL . '?secret=' . $secretKey . '&response=' . $recaptchaToken);
    $responseData = json_decode($response);
    
    // Check if verification was successful
    if ($responseData->success) {
        // Sanitize inputs
        $name = htmlspecialchars($_POST['name']);
        $phone = htmlspecialchars($_POST['phone']);
        $mailFrom = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $message = htmlspecialchars($_POST['message']);
        $service = htmlspecialchars($_POST['service']);
        
        // Validate email
        if (!filter_var($mailFrom, FILTER_VALIDATE_EMAIL)) {
            echo "Invalid email address";
            exit;
        }
        
        $mailTo = "andrew@harvestclicks.com";
        $subject = "New Message from Harvestclicks.com";
        $headers = "From: " . $mailFrom;
        $txt = "You have received an E-mail from: " . $name . "\n\nE-MAIL: " . $mailFrom . "\nPHONE: " . $phone . "\nJob type: " . $service . "\n\n" . $message;
        
        if (mail($mailTo, $subject, $txt, $headers)) {
            header("Location: thank-you.html");
            exit;
        } else {
            echo "Sorry, something went wrong. Please try again later";
        }
    } else {
        echo "reCAPTCHA verification failed. Please try again.";
    }
}
?>