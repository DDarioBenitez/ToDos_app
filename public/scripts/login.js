document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value
        })
    });
    const result = await response.json();
    if (result.success) window.location.href = result.redirect;
    else alert(result.error);
});