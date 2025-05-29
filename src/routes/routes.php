session_start();
if (!isset($_SESSION['user_id']) && strpos($uri, '/dashboard') === 0) {
    header('Location: /login');
    exit;
}