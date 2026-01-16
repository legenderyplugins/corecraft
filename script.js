// Загрузка плагинов на страницу
function loadPlugins() {
    const pluginGrid = document.getElementById('pluginGrid');
    if (!pluginGrid) return;

    pluginGrid.innerHTML = '';

    plugins.forEach(plugin => {
        const pluginCard = document.createElement('div');
        pluginCard.className = 'plugin-card';
        pluginCard.onclick = () => openPluginModal(plugin);

        pluginCard.innerHTML = `
            <img src="${plugin.thumbnail}" alt="${plugin.name}" class="plugin-thumbnail" onerror="this.src='https://via.placeholder.com/400x225/FF6B6B/ffffff?text=${encodeURIComponent(plugin.name)}'">
            <div class="plugin-card-body">
                <div class="plugin-category">${plugin.category}</div>
                <h3 class="plugin-name">${plugin.name}</h3>
                <p class="plugin-description">${plugin.shortDescription}</p>
                <ul class="plugin-features">
                    ${plugin.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="plugin-author">
                    <span class="author-label">Автор:</span>
                    <span class="author-name">${plugin.author || 'CoreCraft'}</span>
                </div>
                <div class="plugin-footer">
                    <div class="plugin-price">${plugin.price} ${plugin.currency}</div>
                    <div class="plugin-buttons">
                        <a href="${plugin.videoUrl}" target="_blank" class="btn-small btn-video" onclick="event.stopPropagation()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Видео
                        </a>
                        <button class="btn-small btn-buy" onclick="event.stopPropagation(); buyPlugin('${plugin.name}')">Связаться</button>
                    </div>
                </div>
            </div>
        `;

        pluginGrid.appendChild(pluginCard);
    });

    // Обновляем счетчики
    const pluginsCount = document.getElementById('pluginsCount');
    if (pluginsCount) {
        pluginsCount.dataset.target = plugins.length;
        pluginsCount.textContent = '0';
    }
    
    // Подсчет категорий
    const categoriesCount = document.getElementById('categoriesCount');
    if (categoriesCount) {
        const uniqueCategories = new Set(plugins.map(p => p.category));
        categoriesCount.dataset.target = uniqueCategories.size;
        categoriesCount.textContent = '0';
    }
    
}

// Открытие модального окна с деталями плагина
function openPluginModal(plugin) {
    const modal = document.getElementById('pluginModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;

    // Получаем ID видео из YouTube URL
    const videoId = extractYouTubeId(plugin.videoUrl);
    const origin = window.location.origin;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1&origin=${origin}` : plugin.videoUrl;

    modalBody.innerHTML = `
        <div class="modal-video-container">
            <img src="${plugin.thumbnail}" alt="${plugin.name}" class="modal-video-thumbnail">
            <a href="${plugin.videoUrl}" target="_blank" class="modal-video-overlay">
                <div class="modal-video-play-button">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </div>
            </a>
        </div>
        <div class="plugin-category">${plugin.category}</div>
        <h2 class="modal-title">${plugin.name}</h2>
        <p class="modal-description">${plugin.fullDescription}</p>
        <div class="modal-features-grid">
            ${plugin.features.map(feature => `
                <div class="modal-feature-item">
                    <strong>✓</strong> ${feature}
                </div>
            `).join('')}
        </div>
        <div class="modal-info-notice" style="background: rgba(85, 170, 85, 0.1); border: 1px solid rgba(85, 170, 85, 0.3); border-radius: 8px; padding: 12px; margin-bottom: 20px; color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
            <strong style="color: var(--minecraft-green);">ℹ️ Важно:</strong> На сайте нельзя купить плагины. Это каталог с обзорами и информацией. Для покупки и вопросов обращайтесь в <strong>Telegram</strong> или <strong>Discord</strong>.
        </div>
        <div class="modal-actions">
            <div style="flex: 1;">
                <div class="plugin-price" style="font-size: 2.5rem; margin-bottom: 10px;">${plugin.price} ${plugin.currency}</div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 5px;">Автор: <strong>${plugin.author || 'CoreCraft'}</strong></p>
                <p class="plugin-channel-info" style="color: var(--text-secondary); font-size: 0.9rem;">Канал: ${plugin.youtubeChannel}</p>
            </div>
            <div class="modal-buttons-wrapper">
                <a href="${plugin.videoUrl}" target="_blank" class="btn btn-secondary btn-youtube-style">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Полное видео
                </a>
                <button class="btn-small btn-buy" onclick="buyPlugin('${plugin.name}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Связаться для покупки
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Извлечение ID видео из YouTube URL
function extractYouTubeId(url) {
    if (!url) return null;
    
    // Обработка различных форматов YouTube URL
    let match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
        return match[1];
    }
    
    // Если ничего не найдено, пытаемся найти 11-символьный ID
    match = url.match(/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('pluginModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Покупка плагина (открывает Telegram/Discord)
function buyPlugin(pluginName) {
    const message = `Привет! Хочу купить плагин "${pluginName}". Подскажи, пожалуйста, как это сделать?`;
    const telegramUrl = socialLinks.telegram.url;
    
    // Пытаемся открыть Telegram, если это t.me ссылка
    if (telegramUrl.includes('t.me/')) {
        const telegramUsername = telegramUrl.split('t.me/')[1].split('/')[0];
        window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        // Если это Discord или другой канал, просто открываем ссылку
        window.open(telegramUrl, '_blank');
    }
}

// Загрузка YouTube канала
function loadChannels() {
    const channelContainer = document.getElementById('channelContainer');
    if (!channelContainer) return;

    channelContainer.innerHTML = '';

    const channelBanner = document.createElement('div');
    channelBanner.className = 'youtube-channel-banner';

    const channelInfo = document.createElement('div');
    channelInfo.className = 'youtube-channel-info';

    const channelAvatarWrapper = document.createElement('a');
    channelAvatarWrapper.className = 'youtube-channel-avatar-wrapper';
    channelAvatarWrapper.href = youtubeChannel.url;
    channelAvatarWrapper.target = '_blank';
    channelAvatarWrapper.title = `Перейти на канал ${youtubeChannel.name}`;

    const channelAvatar = document.createElement('div');
    channelAvatar.className = 'youtube-channel-avatar';
    channelAvatar.innerHTML = `<img src="Images/me.jpg" alt="${youtubeChannel.name}" class="avatar-image">`;

    const channelDetails = document.createElement('div');
    channelDetails.className = 'youtube-channel-details';
    
    const channelTitle = document.createElement('a');
    channelTitle.href = youtubeChannel.url;
    channelTitle.target = '_blank';
    channelTitle.className = 'channel-title-link';
    channelTitle.textContent = youtubeChannel.name;
    
    const channelDescription = document.createElement('p');
    channelDescription.className = 'channel-description';
    channelDescription.textContent = 'Подписывайтесь на наш канал, чтобы быть в курсе новых плагинов, обновлений и обзоров!';
    channelDescription.style.cssText = 'color: var(--text-secondary); margin-top: 12px; font-size: 1rem; line-height: 1.6;';
    
    const subscribeBtn = document.createElement('a');
    subscribeBtn.href = youtubeChannel.url;
    subscribeBtn.target = '_blank';
    subscribeBtn.className = 'btn btn-secondary youtube-subscribe-btn';
    subscribeBtn.style.cssText = 'margin-top: 20px; display: inline-flex; align-items: center; gap: 8px;';
    subscribeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        Подписаться на канал
    `;

    channelDetails.appendChild(channelTitle);
    channelDetails.appendChild(channelDescription);
    channelDetails.appendChild(subscribeBtn);

    channelAvatarWrapper.appendChild(channelAvatar);
    channelInfo.appendChild(channelAvatarWrapper);
    channelInfo.appendChild(channelDetails);
    channelBanner.appendChild(channelInfo);
    channelContainer.appendChild(channelBanner);
}

// PNG иконки для соцсетей
const socialIcons = {
    telegram: 'Images/icons8-телеграм-96.png',
    discord: 'Images/icons8-discord-96.png'
};

// Загрузка контактов
function loadContacts() {
    const contactsGrid = document.getElementById('contactsGrid');
    if (!contactsGrid) return;

    contactsGrid.innerHTML = '';

    Object.entries(socialLinks).forEach(([key, contact]) => {
        const contactCard = document.createElement('a');
        contactCard.className = 'contact-card';
        contactCard.href = contact.url;
        contactCard.target = '_blank';

        const iconClass = `contact-icon-${contact.icon}`;
        const iconSrc = socialIcons[contact.icon] || '';

        contactCard.innerHTML = `
            <div class="contact-icon ${iconClass}">
                <img src="${iconSrc}" alt="${contact.name}" class="contact-icon-img">
            </div>
            <div class="contact-name">${contact.name}</div>
            <div class="contact-description">${contact.description}</div>
        `;

        contactsGrid.appendChild(contactCard);
    });

    // Обновляем ссылки в мобильном меню (клонированные из header)
    // Ссылки в header и footer уже установлены в HTML, просто копируем их в мобильное меню
    const mobileSocialIcons = document.querySelector('.mobile-social-icons');
    if (mobileSocialIcons) {
        const headerTelegram = document.getElementById('headerTelegram');
        const headerDiscord = document.getElementById('headerDiscord');
        const headerYouTube = document.getElementById('headerYouTube');
        
        const mobileTelegram = mobileSocialIcons.querySelector('#headerTelegram') || mobileSocialIcons.querySelector('a[title="Telegram"]');
        const mobileDiscord = mobileSocialIcons.querySelector('#headerDiscord') || mobileSocialIcons.querySelector('a[title="Discord"]');
        const mobileYouTube = mobileSocialIcons.querySelector('#headerYouTube') || mobileSocialIcons.querySelector('a[title="YouTube"]');
        
        // Копируем ссылки из header в мобильное меню
        if (mobileTelegram && headerTelegram && headerTelegram.href && !headerTelegram.href.includes('#')) {
            mobileTelegram.href = headerTelegram.href;
            mobileTelegram.target = headerTelegram.target || '_blank';
        }
        if (mobileDiscord && headerDiscord && headerDiscord.href && !headerDiscord.href.includes('#')) {
            mobileDiscord.href = headerDiscord.href;
            mobileDiscord.target = headerDiscord.target || '_blank';
        }
        if (mobileYouTube && headerYouTube && headerYouTube.href && !headerYouTube.href.includes('#')) {
            mobileYouTube.href = headerYouTube.href;
            mobileYouTube.target = headerYouTube.target || '_blank';
        }
    }
}

// Анимация счетчиков
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Обработка скролла для шапки
function handleScroll() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        // Добавляем социальные кнопки в мобильное меню только один раз
        if (!navMenu.querySelector('.mobile-social-icons')) {
            const socialIconsHeader = document.querySelector('.social-icons-header');
            if (socialIconsHeader) {
                const mobileSocial = document.createElement('div');
                mobileSocial.className = 'mobile-social-icons';
                // Клонируем иконки, но с новыми ID чтобы избежать конфликтов
                const icons = socialIconsHeader.querySelectorAll('.social-icon');
                icons.forEach(icon => {
                    const clonedIcon = icon.cloneNode(true);
                    // Удаляем ID из клонированных иконок
                    clonedIcon.removeAttribute('id');
                    mobileSocial.appendChild(clonedIcon);
                });
                navMenu.appendChild(mobileSocial);
            }
        }

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Блокируем скролл при открытом меню
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Плавная прокрутка для якорных ссылок (делегирование событий)
let smoothScrollInitialized = false;
function initSmoothScroll() {
    if (smoothScrollInitialized) return;
    smoothScrollInitialized = true;
    
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        
        // Исключаем hero-кнопки из перехвата
        if (anchor.classList.contains('btn-hero-primary') || anchor.classList.contains('btn-hero-secondary')) {
            return;
        }
        
        // Исключаем внешние ссылки (с target="_blank" или начинающиеся с http)
        if (anchor.target === '_blank' || anchor.href.startsWith('http')) {
            return;
        }
        
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}


// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadPlugins();
    loadChannels();
    loadContacts();
    initMobileMenu();
    initSmoothScroll();

    // Анимация счетчиков при появлении в viewport
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.dataset.animated) {
                    const target = parseInt(statNumber.dataset.target) || parseInt(statNumber.textContent);
                    if (target && !isNaN(target)) {
                        animateCounter(statNumber, target);
                        statNumber.dataset.animated = 'true';
                    }
                }
            }
        });
    }, observerOptions);

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => observer.observe(item));

    // Обработчик скролла
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Инициализация при загрузке

    // Закрытие модального окна
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('pluginModal');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
