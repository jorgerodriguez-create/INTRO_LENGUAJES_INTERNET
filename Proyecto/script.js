// Contador de visitas
if (localStorage.pageVisits) {
    localStorage.pageVisits = Number(localStorage.pageVisits) + 1;
  } else {
    localStorage.pageVisits = 1;
  }
  console.log("Visitas a esta página: " + localStorage.pageVisits);
  