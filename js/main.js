/* ================================
   BRUEMI - MAIN JAVASCRIPT
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // VARIÁVEIS GLOBAIS
    // ================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const currentYear = document.getElementById('currentYear');
    const contatoForm = document.getElementById('contatoForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    // ================================
    // ANO DINÂMICO NO FOOTER
    // ================================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    let lastScroll = 0;
    let ticking = false;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleNavbarScroll);
            ticking = true;
        }
    });

    // ================================
    // HAMBURGER MENU (MOBILE)
    // ================================
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    function openMenu() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('open');
        navOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    navOverlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // ================================
    // ACTIVE NAV LINK ON SCROLL
    // ================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // BOTÃO VOLTAR AO TOPO
    // ================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ================================
    // CONTADOR ANIMADO (HERO STATS)
    // ================================
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersStarted = true;
    }

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ================================
    // SCROLL REVEAL ANIMATIONS
    // ================================
    function setupAdvancedScrollAnimations() {
        const revealElements = document.querySelectorAll(
            '.servico-card, .sobre-text, .sobre-image, ' +
            '.contato-info, .contato-form-wrapper, ' +
            '.section-header, .depoimentos-slider, ' +
            '.phase-item, .hero-stat'
        );

        revealElements.forEach((el, index) => {
            if (el.classList.contains('sobre-text') || el.classList.contains('contato-info')) {
                el.classList.add('fade-in-left');
            } else if (el.classList.contains('sobre-image') || el.classList.contains('contato-form-wrapper')) {
                el.classList.add('fade-in-right');
            } else if (el.classList.contains('servico-card')) {
                el.classList.add('fade-in');
                const cardIndex = Array.from(document.querySelectorAll('.servico-card')).indexOf(el);
                el.classList.add(`stagger-${cardIndex + 1}`);
            } else {
                el.classList.add('fade-in');
            }
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    setupAdvancedScrollAnimations();
    // ================================
    // SLIDER DE DEPOIMENTOS
    // ================================
    const depCards = document.querySelectorAll('.depoimento-card');
    const depDots = document.querySelectorAll('.dep-dot');
    const depPrev = document.querySelector('.dep-prev');
    const depNext = document.querySelector('.dep-next');
    let currentSlide = 0;
    let slideInterval = null;
    const totalSlides = depCards.length;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        depCards.forEach(card => {
            card.classList.remove('active');
            card.style.transform = 'translateX(60px)';
            card.style.opacity = '0';
        });

        depDots.forEach(dot => dot.classList.remove('active'));

        depCards[index].classList.add('active');
        depCards[index].style.transform = 'translateX(0)';
        depCards[index].style.opacity = '1';

        if (depDots[index]) {
            depDots[index].classList.add('active');
        }

        currentSlide = index;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    if (depNext) {
        depNext.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (depPrev) {
        depPrev.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    depDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            stopAutoPlay();
            goToSlide(slideIndex);
            startAutoPlay();
        });
    });

    // Swipe support mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderEl = document.querySelector('.depoimentos-slider');

    if (sliderEl) {
        sliderEl.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderEl.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            stopAutoPlay();
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoPlay();
        }
    }

    if (totalSlides > 0) {
        goToSlide(0);
        startAutoPlay();
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    // ================================
    // FORMULÁRIO DE CONTATO
    // ================================
    if (contatoForm) {
        // Máscara de telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');

                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }

                e.target.value = value;
            });
        }

        // Submit
        contatoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const honeypot = contatoForm.querySelector('.honeypot');
            if (honeypot && honeypot.value !== '') {
                return;
            }

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!nome || !telefone || !email) {
                showFormError('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            if (!isValidEmail(email)) {
                showFormError('Por favor, insira um email válido.');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            setTimeout(() => {
                const formFields = contatoForm.querySelectorAll('.form-group, .form-row, .btn-full, .form-note');
                formFields.forEach(field => {
                    field.style.display = 'none';
                });

                formSuccess.classList.add('show');

                setTimeout(() => {
                    formFields.forEach(field => {
                        field.style.display = '';
                    });
                    formSuccess.classList.remove('show');
                    contatoForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                }, 5000);

            }, 1500);
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFormError(message) {
        const existingError = contatoForm.querySelector('.form-error');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            background: rgba(231, 76, 60, 0.1);
            border: 1px solid rgba(231, 76, 60, 0.3);
            color: #e74c3c;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            animation: fadeInUp 0.3s ease;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

        submitBtn.parentNode.insertBefore(errorDiv, submitBtn);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.opacity = '0';
                errorDiv.style.transform = 'translateY(-10px)';
                errorDiv.style.transition = 'all 0.3s ease';
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 4000);
    }

    // ================================
    // CLIENTES CAROUSEL PAUSE
    // ================================
    const clientesTrack = document.querySelector('.clientes-track');
    if (clientesTrack) {
        clientesTrack.addEventListener('mouseenter', () => {
            clientesTrack.style.animationPlayState = 'paused';
        });
        clientesTrack.addEventListener('mouseleave', () => {
            clientesTrack.style.animationPlayState = 'running';
        });
    }

    // ================================
    // RESIZE HANDLER
    // ================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 250);
    });
       // ================================
    // CHAT WIDGET
    // ================================
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatOptions = document.getElementById('chatOptions');

    // Respostas automáticas do bot
    const botResponses = {
        valuation: {
            text: 'Ótimo interesse! 📊 Nosso serviço de Valuation inclui avaliação completa do valor de mercado da sua empresa usando metodologias como DCF, múltiplos e mais. Quer agendar uma conversa com nosso especialista?',
            followUp: ['📞 Sim, quero agendar!', '💡 Quero saber mais detalhes', '🔙 Ver outras opções']
        },
        servicos: {
            text: 'Oferecemos 6 serviços principais:\n\n📊 Gestão Estratégica de Valuation\n💰 Valuation\n📋 Plano de Negócio\n👥 Plano de Vesting\n🧑‍💼 Capital Humano\n🤝 Fusões & Aquisições\n\nQual deles te interessa mais?',
            followUp: ['📊 Valuation', '📋 Plano de Negócio', '🤝 M&A', '📞 Falar com consultor']
        },
        contato: {
            text: 'Perfeito! Você pode falar diretamente com nossa equipe:\n\n📱 WhatsApp: (11) 96342-7660\n📧 Ou preencha o formulário na seção de contato.\n\nPosso te direcionar agora?',
            followUp: ['📱 Ir para WhatsApp', '📧 Ir para formulário']
        },
        preco: {
            text: 'Nossos valores são personalizados de acordo com o tamanho e necessidade de cada empresa. 💼\n\nPara receber uma proposta, o melhor caminho é uma conversa rápida de 15 minutos com nosso time. Sem compromisso!',
            followUp: ['📞 Agendar conversa', '📱 Chamar no WhatsApp', '🔙 Ver outras opções']
        },
        agendar: {
            text: 'Excelente decisão! 🎯\n\nVou te direcionar para nosso WhatsApp para agendar o melhor horário. Nosso time responde rapidamente!\n\n👉 Clique no botão do WhatsApp no canto da tela ou acesse: wa.me/5511963427660',
            followUp: ['📱 Abrir WhatsApp', '🔙 Voltar ao início']
        },
        planonegocios: {
            text: 'Nosso Plano de Negócio é ideal para empresas que buscam captação de investimento ou reestruturação. 📋\n\nDesenvolvemos um documento completo com análise de mercado, projeções financeiras e estratégia de crescimento.',
            followUp: ['📞 Agendar conversa', '📊 Ver outros serviços', '🔙 Voltar ao início']
        },
        ma: {
            text: 'Nossa assessoria em Fusões & Aquisições (M&A) cobre todo o processo: 🤝\n\n• Preparação e valuation\n• Identificação de compradores/investidores\n• Negociação e due diligence\n• Fechamento do deal\n\nQuer conversar sobre o seu caso?',
            followUp: ['📞 Sim, quero conversar!', '📊 Ver outros serviços', '🔙 Voltar ao início']
        },
        default: {
            text: 'Obrigado pela mensagem! 😊 Nossa equipe vai analisar e retornar em breve. Para atendimento imediato, entre em contato pelo WhatsApp: (11) 96342-7660',
            followUp: ['📱 Ir para WhatsApp', '🔙 Ver opções']
        }
    };

    // Toggle chat
    function toggleChat() {
        if (chatWidget) {
            chatWidget.classList.toggle('open');
        }
    }

    function closeChatWindow() {
        if (chatWidget) {
            chatWidget.classList.remove('open');
        }
    }

    if (chatToggle) chatToggle.addEventListener('click', toggleChat);
    if (chatClose) chatClose.addEventListener('click', closeChatWindow);

    // Fechar chat com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatWidget && chatWidget.classList.contains('open')) {
            closeChatWindow();
        }
    });

    // Adicionar mensagem no chat
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;

        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' +
                     now.getMinutes().toString().padStart(2, '0');

        msgDiv.innerHTML = `
            <div class="chat-bubble">${text.replace(/\n/g, '<br>')}</div>
            <span class="chat-time">${time}</span>
        `;

        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        return msgDiv;
    }

    // Typing indicator (bolinhas pulsando)
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    // Adicionar opções de follow-up
    function addFollowUpOptions(options) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';

        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'chat-option';
            btn.textContent = option;
            btn.addEventListener('click', () => handleOptionClick(option));
            optionsDiv.appendChild(btn);
        });

        chatBody.appendChild(optionsDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Handler para clique nas opções
    function handleOptionClick(optionText) {
        // Adiciona mensagem do usuário
        addMessage(optionText, 'user');

        // Remove opções antigas para limpar
        const oldOptions = chatBody.querySelectorAll('.chat-options');
        oldOptions.forEach(opt => {
            opt.style.opacity = '0.5';
            opt.style.pointerEvents = 'none';
        });

        // Determina resposta baseado no texto
        let responseKey = 'default';
        const text = optionText.toLowerCase();

        if (text.includes('valuation') || text.includes('📊')) {
            responseKey = 'valuation';
        } else if (text.includes('serviço') || text.includes('🛠️') || text.includes('conhecer') || text.includes('outros serviços')) {
            responseKey = 'servicos';
        } else if (text.includes('consultor') || text.includes('📞') || text.includes('agendar') || text.includes('conversa')) {
            responseKey = 'agendar';
        } else if (text.includes('contato') || text.includes('falar')) {
            responseKey = 'contato';
        } else if (text.includes('custa') || text.includes('💰') || text.includes('preço') || text.includes('preco')) {
            responseKey = 'preco';
        } else if (text.includes('plano de negócio') || text.includes('plano de negocio') || text.includes('📋')) {
            responseKey = 'planonegocios';
        } else if (text.includes('m&a') || text.includes('🤝') || text.includes('fusão') || text.includes('fusões') || text.includes('aquisição')) {
            responseKey = 'ma';
        } else if (text.includes('whatsapp') || text.includes('📱')) {
            // Abre WhatsApp
            window.open('https://wa.me/5511963427660?text=Olá! Vim pelo chat do site e gostaria de saber mais sobre os serviços da Bruemi.', '_blank');
            responseKey = 'agendar';
        } else if (text.includes('formulário') || text.includes('📧')) {
            // Fecha chat e vai pro formulário
            closeChatWindow();
            setTimeout(() => {
                const contatoSection = document.querySelector('#contato');
                if (contatoSection) {
                    const navHeight = navbar.offsetHeight;
                    window.scrollTo({
                        top: contatoSection.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                }
            }, 300);
            return;
        } else if (text.includes('voltar') || text.includes('🔙') || text.includes('outras opções') || text.includes('ver opções') || text.includes('início')) {
            responseKey = 'servicos';
        } else if (text.includes('detalhes') || text.includes('💡') || text.includes('saber mais')) {
            responseKey = 'servicos';
        }

        const response = botResponses[responseKey];

        // Mostra typing e depois responde
        showTyping();

        const typingDelay = 1000 + Math.random() * 800;

        setTimeout(() => {
            hideTyping();
            addMessage(response.text, 'bot');

            if (response.followUp) {
                setTimeout(() => {
                    addFollowUpOptions(response.followUp);
                }, 600);
            }
        }, typingDelay);
    }

    // Handler para input de texto livre
    function handleChatSend() {
        if (!chatInput) return;

        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        // Desabilita opções antigas
        const oldOptions = chatBody.querySelectorAll('.chat-options');
        oldOptions.forEach(opt => {
            opt.style.opacity = '0.5';
            opt.style.pointerEvents = 'none';
        });

        // Tenta identificar intenção
        let responseKey = 'default';
        const lowerText = text.toLowerCase();

        if (lowerText.includes('valuation') || lowerText.includes('valor da empresa') || lowerText.includes('avaliação')) {
            responseKey = 'valuation';
        } else if (lowerText.includes('serviço') || lowerText.includes('o que vocês fazem') || lowerText.includes('como funciona')) {
            responseKey = 'servicos';
        } else if (lowerText.includes('preço') || lowerText.includes('custo') || lowerText.includes('quanto') || lowerText.includes('valor')) {
            responseKey = 'preco';
        } else if (lowerText.includes('contato') || lowerText.includes('falar') || lowerText.includes('ligar') || lowerText.includes('telefone')) {
            responseKey = 'contato';
        } else if (lowerText.includes('agendar') || lowerText.includes('reunião') || lowerText.includes('consulta') || lowerText.includes('marcar')) {
            responseKey = 'agendar';
        } else if (lowerText.includes('plano') || lowerText.includes('negócio') || lowerText.includes('negocio')) {
            responseKey = 'planonegocios';
        } else if (lowerText.includes('fusão') || lowerText.includes('aquisição') || lowerText.includes('m&a') || lowerText.includes('vender empresa')) {
            responseKey = 'ma';
        } else if (lowerText.includes('olá') || lowerText.includes('oi') || lowerText.includes('bom dia') || lowerText.includes('boa tarde') || lowerText.includes('boa noite')) {
            // Saudação
            showTyping();
            setTimeout(() => {
                hideTyping();
                addMessage('Olá! 😊 Que bom ter você aqui! Como posso ajudar?', 'bot');
                setTimeout(() => {
                    addFollowUpOptions(['📊 Quero saber sobre Valuation', '🛠️ Conhecer os serviços', '📞 Falar com um consultor', '💰 Quanto custa?']);
                }, 500);
            }, 800);
            return;
        } else if (lowerText.includes('obrigado') || lowerText.includes('obrigada') || lowerText.includes('valeu') || lowerText.includes('thanks')) {
            showTyping();
            setTimeout(() => {
                hideTyping();
                addMessage('Por nada! 😄 Estamos sempre à disposição. Se precisar de algo mais, é só chamar!', 'bot');
                setTimeout(() => {
                    addFollowUpOptions(['📱 Ir para WhatsApp', '🔙 Ver opções']);
                }, 500);
            }, 800);
            return;
        }

        const response = botResponses[responseKey];

        showTyping();
        setTimeout(() => {
            hideTyping();
            addMessage(response.text, 'bot');
            if (response.followUp) {
                setTimeout(() => {
                    addFollowUpOptions(response.followUp);
                }, 600);
            }
        }, 1200 + Math.random() * 600);
    }

    // Event listeners do chat input
    if (chatSend) {
        chatSend.addEventListener('click', handleChatSend);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChatSend();
            }
        });
    }

    // Clique nas opções iniciais do chat
    if (chatOptions) {
        chatOptions.querySelectorAll('.chat-option').forEach(option => {
            option.addEventListener('click', () => {
                const text = option.textContent;
                handleOptionClick(text);
            });
        });
    }

    // Auto-destaque do badge após 30 segundos
    setTimeout(() => {
        if (chatWidget && !chatWidget.classList.contains('open')) {
            const badge = chatWidget.querySelector('.chat-badge');
            if (badge) {
                badge.style.animation = 'badgePulse 0.5s ease 5';
            }
        }
    }, 30000);

    // Auto-abrir chat após 60 segundos na página (opcional)
    setTimeout(() => {
        if (chatWidget && !chatWidget.classList.contains('open')) {
            // Só mostra uma notificação visual, não abre automaticamente
            const toggle = chatWidget.querySelector('.chat-toggle');
            if (toggle) {
                toggle.style.animation = 'none';
                toggle.style.transform = 'scale(1.15)';
                setTimeout(() => {
                    toggle.style.transform = '';
                    toggle.style.transition = 'all 0.3s ease';
                }, 300);
            }
        }
    }, 60000);

    // ================================
    // CONSOLE BRANDING
    // ================================
    console.log(
        '%c🏢 Bruemi Gestão Empresarial',
        'color: #C8962E; font-size: 18px; font-weight: bold;'
    );
    console.log(
        '%cInteligência Estratégica Orientada por Dados',
        'color: #1B2A4A; font-size: 12px;'
    );
    console.log(
        '%c🌐 www.bruemi.com.br',
        'color: #636e72; font-size: 11px;'
    );

}); // <-- FECHA O DOMContentLoaded
