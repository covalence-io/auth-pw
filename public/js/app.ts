(function () {
    const username = <HTMLInputElement>document.getElementById('username');
    const password = <HTMLInputElement>document.getElementById('password');
    const form = <HTMLFormElement>document.getElementById('login-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/v1/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            if (data.success) {
                alert('Success!');
            } else {
                throw data;
            }
        } catch (e) {
            alert((<Error>e).message);
        }
    });
})();