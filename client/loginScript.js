const URLServeur = "http://localhost:4000/";
document.querySelector('.sub').addEventListener('click', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  const response = await fetch(URLServeur + 'loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  if (response.status === 200) {
    const data = await response.json();
    // Stockez le token dans le localstorage du navigateur pour une utilisation ultérieure.
    localStorage.setItem('auth-token', data.token);
    localStorage.setItem('user-type', data.userType);
    window.location.href = localStorage.getItem('lastVisitedPage') || 'home.html';
} else if (response.status === 401) {
  const data = await response.json();
  localStorage.setItem('lastVisitedPage', window.location.href);
  window.location.href = data.redirect;
  } else {
    const data = await response.json();
    // Affichez un message d'erreur en cas de problème.
    alert(data.message);
  }
});