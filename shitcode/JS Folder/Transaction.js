// Toggle notification dropdown
function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  dropdown.classList.toggle('show');
}

// Doughnut Chart Setup
const ctx = document.getElementById('doughnutChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [76, 24],
      backgroundColor: ['#3b976c', '#e6e6e6'],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false },
    }
  }
});

// Download Table as CSV
function downloadCSV() {
  const rows = document.querySelectorAll("table tr");
  let csv = [];
  for (let row of rows) {
    let cols = row.querySelectorAll("td, th");
    let rowData = [...cols].map(e => `"${e.innerText}"`).join(",");
    csv.push(rowData);
  }
  let blob = new Blob([csv.join("\n")], { type: 'text/csv' });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "transactions.csv";
  a.click();
}

// Filter Table
function filterTable() {
  const input = document.querySelector(".search-input").value.toLowerCase();
  const rows = document.querySelectorAll("#transactionTable tbody tr");
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

 document.querySelectorAll('.status').forEach(function(statusEl) {
    const text = statusEl.textContent.trim().toLowerCase();
    if (text === 'pending') {
      statusEl.classList.add('pending');
    } else if (text === 'completed') {
      statusEl.classList.add('completed');
    }
  });

    function filterTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll("table tbody tr");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
    });
  }

  function downloadCSV() {
    alert("Download function placeholder");
    
  }
