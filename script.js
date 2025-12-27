let queue = JSON.parse(localStorage.getItem("queue")) || [];
let current = JSON.parse(localStorage.getItem("current")) || null;

function getQueue() {
  const service = document.getElementById("service").value;

  const count = queue.filter(q => q.service === service).length + 1;
  const number = service + "-" + String(count).padStart(3, "0");

  queue.push({
    number,
    service,
    status: "waiting"
  });

  localStorage.setItem("queue", JSON.stringify(queue));

  document.getElementById("result").innerHTML =
    `<h2>Sizning navbatingiz: ${number}</h2>`;
}

function callNext() {
  const service = document.getElementById("operatorService").value;

  const next = queue.find(q => q.service === service && q.status === "waiting");

  if (!next) {
    alert("Navbat yo‘q");
    return;
  }

  next.status = "called";
  current = next;

  localStorage.setItem("queue", JSON.stringify(queue));
  localStorage.setItem("current", JSON.stringify(current));

  document.getElementById("current").innerText =
    `Chaqarildi: ${current.number}`;
}

function updateScreen() {
  const screen = document.getElementById("screen");
  const data = JSON.parse(localStorage.getItem("current"));

  screen.innerText = data ? data.number : "—";
}
