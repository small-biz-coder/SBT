<?php 


if (isset($_POST['submit'])) {
$name = $_POST['name'];
$phone = $_POST['phone'];
$mailFrom = $_POST['email'];
$message = $_POST['message'];
$service = $_POST['service'];

$mailTo = "andrew@harvestclicks.com";
$subject = "New Message from Website";
$headers = "From: ".$mailFrom;
$txt = "You have recieved an e-mail from " .$name. ".\n\n" .$mailFrom. ".\n".$phone. ".\n" .$service. ".\n\n".$message;


if (mail($mailTo, $subject, $txt, $headers)) {
	header("Location: thank-you.html");
} else{
	echo "Sorry, something went wrong. Please try again later";
}

}
 ?>