    const services = [
      { title: "Kreditlar", desc: "Kredit olish bo'yicha maslahat va ariza" },
      { title: "Omonatlar", desc: "Omonat hisoblarini ochish va boshqarish" },
      { title: "Onlayn Kreditlar", desc: "Tez va qulay onlayn kredit" },
      { title: "Jismoniy shaxslar uchun", desc: "Shaxsiy bank xizmatlari" },
      { title: "Haridlar uchun", desc: "Tovarlar uchun kredit va lizing" }
    ];

    let queues = [];
    let lastNumber = 0;
    let currentServing = null;
    let userTicket = null;

    const servicesContainer = document.getElementById('services');
    const getTicketBtn = document.getElementById('getTicketBtn');
    const userTicketEl = document.getElementById('userTicket');
    const queueListEl = document.getElementById('queueList');
    const currentServingEl = document.getElementById('currentServingInfo');
    const avgWaitEl = document.getElementById('avgWait');
    const totalTodayEl = document.getElementById('totalToday');
    const servingNowEl = document.getElementById('servingNow');
    const servedTodayEl = document.getElementById('servedToday');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function loadFromStorage() {
      const stored = localStorage.getItem('bankQueue');
      if (stored) {
        const data = JSON.parse(stored);
        queues = data.queues || [];
        lastNumber = data.lastNumber || 0;
        currentServing = data.currentServing || null;
        userTicket = data.userTicket || null;
      }
    }

    function saveToStorage() {
      localStorage.setItem('bankQueue', JSON.stringify({
        queues,
        lastNumber,
        currentServing,
        userTicket
      }));
    }

    function renderServices() {
      servicesContainer.innerHTML = '';
      services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
          <h5>${service.title}</h5>
          <p>${service.desc}</p>
        `;
        card.onclick = () => getTicket(service.title);
        servicesContainer.appendChild(card);
      });
    }

    function getTicket(service) {
      lastNumber++;
      const ticketNumber = `A-${String(lastNumber).padStart(3, '0')}`;
      const newTicket = {
        number: ticketNumber,
        service,
        timestamp: Date.now(),
        status: 'waiting'
      };

      queues.push(newTicket);
      userTicket = newTicket;

      updateUI();
      saveToStorage();

      const newQueueEl = queueListEl.lastChild;
      if (newQueueEl) {
        newQueueEl.style.animation = 'fadeInUp 0.5s ease';
      }

      alert(`Sizning navbat raqamingiz: ${ticketNumber}\nXizmat: ${service}`);
    }

    function advanceQueue() {
      const waiting = queues.filter(q => q.status === 'waiting');
      if (waiting.length === 0) return;

      queues = queues.map(q => {
        if (q.status === 'serving') {
          q.status = 'served';
          q.endTime = Date.now();
        }
        return q;
      });

      const next = waiting[0];
      next.status = 'serving';
      next.serveTime = Date.now();
      currentServing = next;

      updateUI();
      saveToStorage();
    }

    function calculateStats() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayMs = today.getTime();

      const todays = queues.filter(q => q.timestamp >= todayMs);

      const totalToday = todays.length;
      const servingNow = todays.filter(q => q.status === 'serving').length;
      const servedToday = todays.filter(q => q.status === 'served').length;

      const completed = todays.filter(q => q.status === 'served' && q.endTime);
      let avgWait = 0;
      if (completed.length > 0) {
        const waits = completed.map(q => (q.endTime - q.timestamp) / 60000);
        avgWait = Math.round(waits.reduce((a, b) => a + b, 0) / completed.length);
      }

      return { totalToday, servingNow, servedToday, avgWait };
    }

    function updateUI() {
      userTicketEl.textContent = userTicket ? userTicket.number : "Navbat oling";

      queueListEl.innerHTML = '';
      queues
        .filter(q => q.status !== 'served')
        .forEach((q, index) => {
          const div = document.createElement('div');
          div.className = 'queue';
          div.style.animationDelay = `${index * 0.1}s`;
          div.innerHTML = `
            <h6>${q.number}</h6>
            <p>${q.service}</p>
          `;
          queueListEl.appendChild(div);
        });

      if (currentServing) {
        currentServingEl.innerHTML = `
          <h2>${currentServing.number}</h2>
          <p class="stat">${currentServing.service}</p>
          <span class="status-badge">in process</span>
        `;
      } else {
        currentServingEl.innerHTML = '<p>Navbat bo\'sh</p>';
      }

      const stats = calculateStats();
      avgWaitEl.textContent = stats.avgWait + " min";
      totalTodayEl.textContent = stats.totalToday;
      servingNowEl.textContent = stats.servingNow;
      servedTodayEl.textContent = stats.servedToday;
    }

    queueListEl.addEventListener('scroll', () => {
      if (queueListEl.scrollTop > 100) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.onclick = () => {
      queueListEl.scrollTo({ top: 0, behavior: 'smooth' });
    };

    setInterval(advanceQueue, 30000);

    loadFromStorage();
    renderServices();
    updateUI();

    getTicketBtn.onclick = () => getTicket("Umumiy xizmat");