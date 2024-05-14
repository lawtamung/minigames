document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

    var storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    var user = storedUsers.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful!");
        window.location.href = 'game.html'; // Redirect to members page
    } else {
        alert("Invalid username or password.");
    }
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var firstname = document.getElementById('register-firstname').value;
    var lastname = document.getElementById('register-lastname').value;
    var username = document.getElementById('register-username').value;
    var nickname = document.getElementById('register-nickname').value;
    var password = document.getElementById('register-password').value;
    var phone = document.getElementById('register-phone').value;

    var storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedUsers.find(user => user.username === username)) {
        alert("Username already taken.");
    } else {
        storedUsers.push({ firstname: firstname, lastname: lastname, username: username, nickname: nickname, password: password, phone: phone });
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert("Registration successful!");
        showLogin();
    }
});

function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'none';
}

function showRegister() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}
