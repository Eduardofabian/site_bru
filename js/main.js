/* ══════════════════════════════════════════════
   BRUEMI — main.js
   Cobre: navbar dual-state, canvas hero,
   contadores, scroll-reveal, slider depoimentos,
   marquee, formulário, chatbot, back-to-top, WA
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. ANO NO FOOTER
  ───────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ─────────────────────────────────────────
     2. CANVAS HERO — partículas + grid
  ───────────────────────────────────────── */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    function Particle() { this.reset(); }
    Particle.prototype.reset = function () {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - .5) * .42;
      this.vy = (Math.random() - .5) * .42;
      this.r  = Math.random() * 1.6 + .5;
      this.a  = Math.random() * .5 + .2;
    };
    Particle.prototype.update = function () {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
    };

    function initParticles() {
      const n = Math.min(Math.floor(W * H / 8500), 110);
      particles = Array.from({ length: n }, () => new Particle());
    }
    initParticles();

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // grid de fundo
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      const gs = 65;
      for (let x = 0; x <= W; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // conexões
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(111,163,232,${(1 - d / 135) * .2})`;
            ctx.lineWidth = .6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // pontos
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(111,163,232,${p.a * .7})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }
    draw();
  }


  /* ─────────────────────────────────────────
     3. NAVBAR DUAL-STATE (banner → some ao scroll)
  ───────────────────────────────────────── */
  const navbar     = document.getElementById('navbar');
  const BANNER_H   = 36; // altura do .nav-banner em px
  let   lastScroll = 0;
  let   ticking    = false;

  function onScroll() {
    const sy = window.scrollY;
    navbar.classList.toggle('scrolled', sy > BANNER_H + 20);

    // back-to-top
    bttBtn.classList.toggle('show', sy > 500);

    // active nav link por seção
    updateActiveLink(sy);

    lastScroll = sy;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });


  /* ─────────────────────────────────────────
     4. MENU MOBILE
  ───────────────────────────────────────── */
  const burger   = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  // cria overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function closeMenu() {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('showing');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    // aguarda transição antes de esconder
    setTimeout(() => { if (!navLinks.classList.contains('showing')) navLinks.classList.remove('open'); }, 350);
  }

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) { closeMenu(); return; }
    navLinks.classList.add('open');
    requestAnimationFrame(() => {
      navLinks.classList.add('showing');
      overlay.classList.add('show');
    });
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });

  overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });


  /* ─────────────────────────────────────────
     5. ACTIVE NAV LINK
  ───────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id], div[id="home"]');
  const linkEls   = document.querySelectorAll('.nav-link');

  function updateActiveLink(sy) {
    const offset = navbar.offsetHeight + BANNER_H + 20;
    sections.forEach(sec => {
      if (sy + offset >= sec.offsetTop && sy + offset < sec.offsetTop + sec.offsetHeight) {
        linkEls.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }


  /* ─────────────────────────────────────────
     6. SMOOTH SCROLL (compensa navbar)
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + BANNER_H + 8;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────
     7. BACK TO TOP
  ───────────────────────────────────────── */
  const bttBtn = document.getElementById('btt');
  if (bttBtn) bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  /* ─────────────────────────────────────────
     8. CONTADORES (IntersectionObserver)
  ───────────────────────────────────────── */
  const counters = document.querySelectorAll('.counter');
  let countersDone = false;

  const statEl = document.querySelector('.hero-stats');
  if (statEl) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersDone) {
        countersDone = true;
        counters.forEach(c => {
          const target = +c.dataset.target;
          const dur    = 2000;
          const t0     = performance.now();
          const tick   = now => {
            const p = Math.min((now - t0) / dur, 1);
            c.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
            if (p < 1) requestAnimationFrame(tick);
            else c.textContent = target;
          };
          requestAnimationFrame(tick);
        });
      }
    }, { threshold: .5 }).observe(statEl);
  }


  /* ─────────────────────────────────────────
     9. SCROLL REVEAL
  ───────────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));


  /* ─────────────────────────────────────────
     10. SLIDER DEPOIMENTOS
  ───────────────────────────────────────── */
  const cards   = document.querySelectorAll('.depoi-card');
  const dots    = document.querySelectorAll('.ddot');
  let cur       = 0;
  let autoTimer = null;

  function goTo(i) {
    if (i < 0) i = cards.length - 1;
    if (i >= cards.length) i = 0;
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d  => d.classList.remove('active'));
    cards[i].classList.add('active');
    if (dots[i]) dots[i].classList.add('active');
    cur = i;
  }

  function startAuto() { autoTimer = setInterval(() => goTo(cur + 1), 5500); }
  function stopAuto()  { clearInterval(autoTimer); }

  document.querySelector('.depoi-next')?.addEventListener('click', () => { stopAuto(); goTo(cur + 1); startAuto(); });
  document.querySelector('.depoi-prev')?.addEventListener('click', () => { stopAuto(); goTo(cur - 1); startAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { stopAuto(); goTo(+d.dataset.i); startAuto(); }));

  goTo(0); startAuto();
  document.addEventListener('visibilitychange', () => document.hidden ? stopAuto() : startAuto());

  // swipe touch
  let touchStartX = 0;
  const sliderEl  = document.querySelector('.depoi-slider');
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    sliderEl.addEventListener('touchend',   e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) { stopAuto(); goTo(cur + (diff > 0 ? 1 : -1)); startAuto(); }
    }, { passive: true });
  }


  /* ─────────────────────────────────────────
     11. MARQUEE CLIENTES — pausa no hover
  ───────────────────────────────────────── */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => marqueeTrack.style.animationPlayState = 'paused');
    marqueeTrack.addEventListener('mouseleave', () => marqueeTrack.style.animationPlayState = 'running');
  }


  /* ─────────────────────────────────────────
     12. FORMULÁRIO DE CONTATO
  ───────────────────────────────────────── */
  const form       = document.getElementById('contatoForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  // Máscara de telefone
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if      (v.length <= 2)  v = `(${v}`;
      else if (v.length <= 7)  v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length <= 11) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      e.target.value = v;
    });
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // honeypot
      if (form.querySelector('[name="_hp"]')?.value) return;

      const nome  = document.getElementById('nome')?.value.trim();
      const tel   = document.getElementById('telefone')?.value.trim();
      const email = document.getElementById('email')?.value.trim();

      if (!nome || !tel || !email) {
        alert('Por favor, preencha os campos obrigatórios (*).');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Informe um e-mail válido.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';

      // Simulação de envio (trocar pela integração real)
      setTimeout(() => {
        // Esconde campos do form
        form.querySelectorAll('.f-group, .f-row, #submitBtn, .f-note').forEach(el => el.style.display = 'none');
        formSuccess.classList.add('show');

        // Reset após 6s
        setTimeout(() => {
          form.querySelectorAll('.f-group, .f-row, #submitBtn, .f-note').forEach(el => el.style.display = '');
          formSuccess.classList.remove('show');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        }, 6000);
      }, 1600);
    });
  }


  /* ─────────────────────────────────────────
     13. CHATBOT
  ───────────────────────────────────────── */
  const chatWidget = document.getElementById('chatWidget');
  const chatBtn    = document.getElementById('chatBtn');
  const chatX      = document.getElementById('chatX');
  const chatBody   = document.getElementById('chatBody');
  const chatInput  = document.getElementById('chatInput');
  const chatSend   = document.getElementById('chatSend');
  const chatOpts   = document.getElementById('chatOpts');

  if (!chatWidget) return; // guard

  // Respostas do bot
  const BOT = {
    valuation: {
      text: 'Nosso <strong>Valuation</strong> inclui avaliação por FCD (Fluxo de Caixa Descontado), múltiplos de mercado e análise de contingências — seguindo padrões IFRS. Quer falar com um especialista?',
      opts: ['📞 Agendar conversa gratuita', '📋 Outros serviços', '🔙 Menu principal']
    },
    ma: {
      text: 'Em <strong>M&A</strong> assessoramos todo o processo: preparação estratégica, valuation, mapeamento de compradores/investidores, due diligence e fechamento.',
      opts: ['📞 Agendar conversa gratuita', '📋 Outros serviços', '🔙 Menu principal']
    },
    contato: {
      text: 'Pode entrar em contato diretamente:<br><br>📱 <strong>WhatsApp:</strong> (11) 96342-7660<br>📍 <strong>Endereço:</strong> Rua Arandú 481 / cj 22, Brooklin — SP',
      opts: ['💬 Abrir WhatsApp', '📝 Usar o formulário', '🔙 Menu principal']
    },
    preco: {
      text: 'Nossos projetos são customizados por porte e escopo de empresa. O melhor caminho é uma conversa rápida (15 min) sem compromisso — <strong>gratuita</strong>!',
      opts: ['📞 Agendar agora', '💬 Abrir WhatsApp', '🔙 Menu principal']
    },
    agendar: {
      text: '🎯 Ótimo! Para agendar uma consultoria gratuita, acesse nosso WhatsApp ou use o botão abaixo:',
      opts: ['💬 Abrir WhatsApp', '📝 Ir ao formulário', '🔙 Menu principal']
    },
    menu: {
      text: 'Como posso ajudar? Escolha uma opção:',
      opts: ['📊 Quero saber sobre Valuation', '🤝 Fusões & Aquisições', '📞 Falar com um consultor', '💰 Quanto custa?']
    },
    default: {
      text: 'Obrigado pela mensagem! Nossa equipe retorna em breve. Para atendimento imediato: <strong>(11) 96342-7660</strong>.',
      opts: ['💬 Abrir WhatsApp', '📝 Ir ao formulário', '🔙 Menu principal']
    }
  };

  function getKey(text) {
    const t = text.toLowerCase();
    if (t.includes('valuation') || t.includes('📊') || t.includes('valor'))       return 'valuation';
    if (t.includes('m&a') || t.includes('fusão') || t.includes('aquisição') || t.includes('🤝')) return 'ma';
    if (t.includes('contato') || t.includes('endereço') || t.includes('📍'))       return 'contato';
    if (t.includes('cust') || t.includes('preço') || t.includes('valor') || t.includes('💰')) return 'preco';
    if (t.includes('agendar') || t.includes('consultor') || t.includes('📞'))      return 'agendar';
    if (t.includes('menu') || t.includes('🔙') || t.includes('opções'))            return 'menu';
    if (t.includes('whatsapp') || t.includes('💬')) {
      window.open('https://wa.me/5511963427660?text=Vim+pelo+site+da+Bruemi', '_blank');
      return 'agendar';
    }
    if (t.includes('formulário') || t.includes('📝')) {
      chatWidget.classList.remove('open');
      document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
      return null;
    }
    return 'default';
  }

  function now() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  function addMsg(html, who) {
    const wrap = document.createElement('div');
    wrap.className = `chat-msg ${who}`;
    wrap.innerHTML = `<div class="chat-bubble">${html}</div><span class="chat-time">${now()}</span>`;
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addOptions(optsArr) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-opts';
    optsArr.forEach(o => {
      const b = document.createElement('button');
      b.className = 'chat-opt'; b.textContent = o;
      b.addEventListener('click', () => handleMsg(o));
      wrap.appendChild(b);
    });
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTyping() {
    const d = document.createElement('div');
    d.className = 'chat-msg bot'; d.id = 'chatTyping';
    d.innerHTML = '<div class="typing-ind"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div>';
    chatBody.appendChild(d); chatBody.scrollTop = chatBody.scrollHeight;
  }
  function hideTyping() { document.getElementById('chatTyping')?.remove(); }

  function handleMsg(text) {
    addMsg(text, 'user');
    // desabilita opções anteriores
    chatBody.querySelectorAll('.chat-opts').forEach(o => { o.style.opacity = '.45'; o.style.pointerEvents = 'none'; });

    const key = getKey(text);
    if (key === null) return; // redirect aconteceu dentro de getKey

    showTyping();
    setTimeout(() => {
      hideTyping();
      const r = BOT[key] || BOT.default;
      addMsg(r.text, 'bot');
      setTimeout(() => addOptions(r.opts), 450);
    }, 850 + Math.random() * 500);
  }

  // Toggle chat open/close
  chatBtn.addEventListener('click', () => chatWidget.classList.toggle('open'));
  chatX.addEventListener('click',   () => chatWidget.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') chatWidget.classList.remove('open'); });

  // Envio via input
  function sendChat() {
    const v = chatInput.value.trim();
    if (!v) return;
    handleMsg(v); chatInput.value = '';
  }
  chatSend.addEventListener('click', sendChat);
  chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') { e.preventDefault(); sendChat(); } });

  // Opções iniciais
  chatOpts?.querySelectorAll('.chat-opt').forEach(o => o.addEventListener('click', () => handleMsg(o.textContent)));

}); // fim DOMContentLoaded
