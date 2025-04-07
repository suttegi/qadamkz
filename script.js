document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');
  const cards       = document.querySelectorAll('#internshipList .card');

  function filterCards() {
    const term = searchInput.value.trim().toLowerCase();
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(term) ? 'block' : 'none';
    });
  }

  searchBtn.addEventListener('click', filterCards);
  searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') filterCards();
  });

  const modal    = document.getElementById('applyModal');
  const closeBtn = modal.querySelector('.close-btn');
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  });
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
document.getElementById('applyForm').addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const resumeFile = formData.get('resume');
  if (resumeFile && resumeFile.name) {
    console.log('Таңдалған резюме файлы:', resumeFile.name);
  } else {
    console.log('Резюме файл таңдалмады.');
  }

  alert('Өтінішіңіз қабылданды! Біз жақын арада хабарласамыз.');
  e.target.reset(); 
  document.getElementById('applyModal').style.display = 'none';
});


  document.getElementById('postForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const title       = data.get('title');
    const description = data.get('description');
    const category    = data.get('category');
    const location    = data.get('location');
    const type        = data.get('type');

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        <h3>${title}</h3>
        <span class="card-tag ${type.toLowerCase()}">${type}</span>
      </div>
      <p>${description}</p>
      <div class="card-footer">
        <span class="card-location">${location}</span>
        <button class="apply-btn">Өтініш беру</button>
      </div>
    `;
    card.querySelector('.apply-btn').addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    document.getElementById('internshipList').append(card);
    alert('Бағдарлама жарияланды!');

    e.target.reset();
  });
});


const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

chatToggle.addEventListener('click', () => {
  chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
});

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  const span = document.createElement('span');
  span.textContent = text;
  msg.appendChild(span);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(userText) {
  let reply = 'Кешіріңіз, мен әзірге жауап бере алмаймын.';
  if (userText.toLowerCase().includes('стажировка')) {
    reply = 'Сізге қызықты бағдарламалар бөлімін қарауды ұсынамын.';
  } else if (userText.toLowerCase().includes('қалай')) {
    reply = '"Көмек" бөлімінен жиі қойылатын сұрақтарға жауап таба аласыз.';
  }
  setTimeout(() => appendMessage(reply, 'bot'), 500);
}

sendBtn.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  chatInput.value = '';
  botReply(text);
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const total = slides.children.length;
  let index = 0;

  function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  document.querySelector('.slider-btn.next').addEventListener('click', () => {
    index = (index + 1) % total;
    updateSlider();
  });

  document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    index = (index - 1 + total) % total;
    updateSlider();
  });

  setInterval(() => {
    index = (index + 1) % total;
    updateSlider();
  }, 5000);

  document.querySelectorAll('.review-photo').forEach(img => {
    const gender = img.dataset.gender;
    fetch(`https://randomuser.me/api/?gender=${gender}`)
      .then(res => res.json())
      .then(data => {
        img.src = data.results[0].picture.medium;
      })
      .catch(err => console.error('Ошибка загрузки фото:', err));
  });
});
