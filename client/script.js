document.getElementById('fetchButton').addEventListener('click', function() {
    // Fetch random user data
    alert("Fetching random user data from backend!");
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userName').textContent = `${data.name.title} ${data.name.first} ${data.name.last}`;
            document.getElementById('userEmail').textContent = data.email;
            document.getElementById('userAge').textContent = data.dob.age;
        })
        .catch(error => console.error('Error fetching data: ', error));

    // Fetch health check status
    const statusMessage = document.getElementById('healthCheckMessage').value;
    if (statusMessage.trim() !== '') {
      fetch(`http://localhost:3000/health/${encodeURIComponent(statusMessage)}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          document.getElementById('healthMessage').textContent = data.message;
        })
        .catch(error => console.error('Error fetching health check:', error));
    }
});

