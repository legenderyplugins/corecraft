// База данных плагинов Minecraft
// Для добавления нового плагина просто скопируйте объект и заполните данные

const plugins = [
    {
        id: 1,
        name: "Advanced Economy",
        shortDescription: "Полноценная экономическая система для вашего сервера",
        fullDescription: "Плагин для создания экономической системы на вашем Minecraft сервере. Включает банковские счета, магазины, аукционы, заработную плату. Интеграция с другими плагинами.",
        price: 499,
        currency: "₽",
        videoUrl: "https://youtu.be/LGi5XUfcJ7k?si=zd-AbIO2yQgW1POJ",
        thumbnail: "Images/plugin_1.jpg",
        category: "Экономика",
        features: [
            "Банковские счета",
            "Интеграция с магазинами",
            "Аукционная система",
            "Заработная плата",
            "Множественные валюты"
        ],
        youtubeChannel: "Legendery",
        author: "Legendery"
    },
    {
        id: 2,
        name: "Ultimate PvP",
        shortDescription: "Улучшенная PvP система с аренами и рейтингами",
        fullDescription: "Плагин для PvP серверов. Включает арены, систему рейтингов, топ игроков, кастомизацию оружия и доспехов, спецэффекты при убийствах.",
        price: 599,
        currency: "₽",
        videoUrl: "https://youtu.be/LGi5XUfcJ7k?si=zd-AbIO2yQgW1POJ",
        thumbnail: "Images/plugin_2.jpg",
        category: "PvP",
        features: [
            "Система арен",
            "Рейтинговая система",
            "Топ игроков",
            "Кастомизация оружия",
            "Спецэффекты убийств"
        ],
        youtubeChannel: "Legendery",
        author: "Epilepsy"
    },
    {
        id: 3,
        name: "Magic Spells",
        shortDescription: "Система магии с 50+ заклинаниями",
        fullDescription: "Система магии с большим количеством заклинаний. Каждое заклинание можно настроить, добавить эффекты, стоимость маны и время отката. Интеграция с экономикой.",
        price: 699,
        currency: "₽",
        videoUrl: "https://youtu.be/LGi5XUfcJ7k?si=zd-AbIO2yQgW1POJ",
        thumbnail: "Images/plugin_3.jpg",
        category: "Магия",
        features: [
            "50+ уникальных заклинаний",
            "Кастомизация заклинаний",
            "Система маны",
            "Древки заклинаний",
            "Эффекты и анимации"
        ],
        youtubeChannel: "Legendery",
        author: "Legendery & Epilepsy"
    },
    {
        id: 4,
        name: "Land Protection",
        shortDescription: "Защита территории с расширенными настройками",
        fullDescription: "Система защиты территорий. Разрешения для игроков, флаги защиты, автоматическое создание регионов, интеграция с экономикой для покупки земли.",
        price: 399,
        currency: "₽",
        videoUrl: "https://youtu.be/LGi5XUfcJ7k?si=zd-AbIO2yQgW1POJ",
        thumbnail: "Images/plugin_4.jpg",
        category: "Защита",
        features: [
            "Детальные разрешения",
            "Флаги защиты",
            "Автосоздание регионов",
            "Интеграция с экономикой",
            "Визуализация границ"
        ],
        youtubeChannel: "Legendery",
        author: "Legendery"
    },
    {
        id: 5,
        name: "Auto Farm",
        shortDescription: "Автоматическая ферма с системой выращивания",
        fullDescription: "Автоматизация фермерства на сервере. Система выращивания, сбор урожая, автоматическая посадка, бонусы за правильное размещение и интеграция с экономикой.",
        price: 349,
        currency: "₽",
        videoUrl: "https://youtu.be/LGi5XUfcJ7k?si=zd-AbIO2yQgW1POJ",
        thumbnail: "Images/plugin_5.jpg",
        category: "Фермерство",
        features: [
            "Автоматический сбор",
            "Автоматическая посадка",
            "Система бонусов",
            "Статистика урожая",
            "Интеграция с экономикой"
        ],
        youtubeChannel: "Legendery",
        author: "Epilepsy"
    }
];

// Канал YouTube
const youtubeChannel = {
    name: "Legendery",
    url: "https://youtube.com/@legavelemirovich",
    icon: "youtube"
};

// Социальные сети
const socialLinks = {
    telegram: {
        name: "Telegram канал",
        url: "https://t.me/+BzFZQ-ozd9xhMjEy",
        icon: "telegram",
        description: "Присоединяйтесь к нашему каналу для обновлений и покупок"
    },
    discord: {
        name: "Discord сервер",
        url: "https://discord.gg/pSmy3yfJ53",
        icon: "discord",
        description: "Общайтесь с сообществом и получайте поддержку"
    }
};