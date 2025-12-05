// =============================================
// КОНФИГУРАЦИЯ ПАНОРАМ
// =============================================
// Добавьте сюда все ваши панорамы
const PANORAMAS_CONFIG = [
    {
        id: 1,
        name: "Ангар 3",
        description: "Ангар 3",
        file: "panoramas/Ангар 3.JPG"
    },
    {
        id: 2,
        name: "Био", 
        description: "Био",
        file: "panoramas/Био.JPG"
    },
    {
        id: 3,
        name: "Благодатный",
        description: "Благодатный",
        file: "panoramas/Благодатный.jpg"
    },
    {
        id: 4,
        name: "Восточный буровая установка",
        description: "Восточный буровая установка",
        file: "panoramas/Восточный буровая установка.jpg"
    },
    {
        id: 5,
        name: "Восточный поближе",
        description: "Восточный поближе",
        file: "panoramas/Восточный поближе.jpg"
    },
    {
        id: 6,
        name: "Восточный сверху",
        description: "Восточный сверху",
        file: "panoramas/Восточный сверху.jpg"
    },
    {
        id: 7,
        name: "Восточный смотровая",
        description: "Восточный смотровая",
        file: "panoramas/Восточный смотровая.jpg"
    },
    {
        id: 8,
        name: "Дорога с самосвалами",
        description: "Дорога с самосвалами",
        file: "panoramas/Дорога с самосвалами.jpg"
    },
    {
        id: 9,
        name: "Забой общий план",
        description: "Забой общий план",
        file: "panoramas/Забой общий план.jpg"
    },
    {
        id: 10,
        name: "Забой",
        description: "Забой",
        file: "panoramas/Забой.jpg"
    },
    {
        id: 11,
        name: "ЗИФ",
        description: "ЗИФ",
        file: "panoramas/ЗИФ.JPG"
    },
    {
        id: 12,
        name: "Кабина",
        description: "Кабина",
        file: "panoramas/Кабина.JPG"
    },
    {
        id: 13,
        name: "Карьер помещение",
        description: "Карьер помещение",
        file: "panoramas/Карьер помещение.JPG"
    },
    {
        id: 14,
        name: "КСК вечер",
        description: "КСК вечер",
        file: "panoramas/КСК вечер.jpg"
    },
    {
        id: 15,
        name: "КСК день",
        description: "КСК день",
        file: "panoramas/КСК день.jpg"
    },
    {
        id: 16,
        name: "Мойка 2",
        description: "Мойка 2",
        file: "panoramas/Мойка 2.JPG"
    },
    {
        id: 17,
        name: "Мойка",
        description: "Мойка",
        file: "panoramas/Мойка.JPG"
    },
    {
        id: 18,
        name: "Памятник",
        description: "Памятник",
        file: "panoramas/Памятник.jpg"
    },
    {
        id: 19,
        name: "Питстоп 1",
        description: "Питстоп 1",
        file: "panoramas/Питстоп 1.JPG"
    },
    {
        id: 20,
        name: "Питстоп 2",
        description: "Питстоп 2",
        file: "panoramas/Питстоп 2.JPG"
    },
    {
        id: 21,
        name: "Питстоп 3",
        description: "Питстоп 3",
        file: "panoramas/Питстоп 3.JPG"
    },
    {
        id: 22,
        name: "Плавильное отделение",
        description: "Плавильное отделение",
        file: "panoramas/Плавильное отделение.JPG"
    },
    {
        id: 23,
        name: "Поселок вечер",
        description: "Поселок вечер",
        file: "panoramas/Поселок вечер.jpg"
    },
    {
        id: 24,
        name: "Поселок день",
        description: "Поселок день",
        file: "panoramas/Поселок день.jpg"
    },
    {
        id: 25,
        name: "Самосвал",
        description: "Самосвал",
        file: "panoramas/Самосвал.jpg"
    },
    {
        id: 26,
        name: "Спортзал",
        description: "Спортзал",
        file: "panoramas/Спортзал.JPG"
    },
    {
        id: 27,
        name: "Столовая 1",
        description: "Столовая 1",
        file: "panoramas/Столовая 1.JPG"
    },
    {
        id: 28,
        name: "Столовая 2",
        description: "Столовая 2",
        file: "panoramas/Столовая 2.JPG"
    },
    {
        id: 29,
        name: "Центр управления 1",
        description: "Центр управления 1",
        file: "panoramas/Центр управления 1.JPG"
    },
    {
        id: 30,
        name: "Центр управления 2",
        description: "Центр управления 2",
        file: "panoramas/Центр управления 2.JPG"
    },
    {
        id: 31,
        name: "Центр управления 3",
        description: "Центр управления 3",
        file: "panoramas/Центр управления 3.JPG"
    },
    // Добавьте больше панорам по необходимости
];

// =============================================
// ОСНОВНЫЕ ПЕРЕМЕННЫЕ
// =============================================
let scene, camera, renderer, controls;
let currentSphere = null;
let currentPanoramaIndex = 0;
let isAutoRotating = false;
let isTransitioning = false;
let isFullscreen = false;
let loadedTextures = {};

// =============================================
// ИНИЦИАЛИЗАЦИЯ
// =============================================
function init() {
    // Проверяем наличие панорам
    if (PANORAMAS_CONFIG.length === 0) {
        showNoPanoramasError();
        return;
    }
    
    // Инициализация Three.js
    initThreeJS();
    
    // Инициализация интерфейса
    initUI();
    
    // Предзагрузка панорам
    preloadPanoramas();
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Запуск анимации
    animate();
}

// =============================================
// ИНИЦИАЛИЗАЦИЯ THREE.JS
// =============================================
function initThreeJS() {
    // Создание сцены
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1929);
    
    // Создание камеры
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);
    
    // Создание рендерера
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('panorama-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // OrbitControls для управления
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 0.1;
    controls.maxDistance = 10;
    controls.enablePan = false;
    
    // Освещение (опционально)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
}

// =============================================
// ИНИЦИАЛИЗАЦИЯ ИНТЕРФЕЙСА
// =============================================
function initUI() {
    // Обновляем общее количество панорам
    document.getElementById('total-count').textContent = PANORAMAS_CONFIG.length;
    document.getElementById('current-index').textContent = currentPanoramaIndex + 1;
    
    // Создаем список панорам
    createPanoramaList();
}

// =============================================
// СОЗДАНИЕ СПИСКА ПАНОРАМ
// =============================================
function createPanoramaList() {
    const panoramaList = document.getElementById('panorama-list');
    panoramaList.innerHTML = '';
    
    PANORAMAS_CONFIG.forEach((panorama, index) => {
        const item = document.createElement('div');
        item.className = 'panorama-list-item';
        if (index === currentPanoramaIndex) {
            item.classList.add('active');
        }
        
        // Извлекаем имя файла без пути
        const fileName = panorama.file.split('/').pop();
        
        item.innerHTML = `
            <h3><i class="fas fa-image"></i> ${panorama.name}</h3>
            <div class="file-name">${fileName}</div>
        `;
        
        item.addEventListener('click', () => {
            if (!isTransitioning && index !== currentPanoramaIndex) {
                switchPanorama(index);
                hideNavigationPanel();
            }
        });
        
        panoramaList.appendChild(item);
    });
}

// =============================================
// ПРЕДЗАГРУЗКА ПАНОРАМ
// =============================================
function preloadPanoramas() {
    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    
    PANORAMAS_CONFIG.forEach((panorama, index) => {
        textureLoader.load(
            panorama.file,
            (texture) => {
                // Успешная загрузка
                texture.mapping = THREE.EquirectangularReflectionMapping;
                loadedTextures[index] = texture;
                loadedCount++;
                
                updateLoadingProgress(loadedCount);
                
                // Если это первая панорама, загружаем её
                if (index === 0) {
                    loadPanorama(0);
                }
            },
            (xhr) => {
                // Прогресс загрузки
                const percent = Math.round((xhr.loaded / xhr.total) * 100);
                // Можно добавить индикатор прогресса для каждого файла
            },
            (error) => {
                // Ошибка загрузки
                console.error(`Ошибка загрузки: ${panorama.file}`, error);
                loadedCount++;
                
                // Создаем placeholder
                const placeholder = createPlaceholderTexture(panorama.name);
                loadedTextures[index] = placeholder;
                
                updateLoadingProgress(loadedCount);
                
                // Если это первая панорама, загружаем placeholder
                if (index === 0) {
                    loadPanorama(0);
                }
            }
        );
    });
}

// =============================================
// ОБНОВЛЕНИЕ ПРОГРЕССА ЗАГРУЗКИ
// =============================================
function updateLoadingProgress(loadedCount) {
    const progress = (loadedCount / PANORAMAS_CONFIG.length) * 100;
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    
    if (loadingBar && loadingText) {
        loadingBar.style.width = `${progress}%`;
        loadingText.textContent = `${Math.round(progress)}%`;
    }
    
    // Если все загружено, скрываем экран загрузки
    if (loadedCount === PANORAMAS_CONFIG.length) {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 500);
    }
}

// =============================================
// СОЗДАНИЕ PLACEHOLDER ТЕКСТУРЫ
// =============================================
function createPlaceholderTexture(name) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Градиентный фон
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a3a5f');
    gradient.addColorStop(1, '#0a1929');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Текст
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, canvas.width/2, canvas.height/2 - 40);
    
    ctx.fillStyle = '#88a';
    ctx.font = '24px Arial';
    ctx.fillText('Загрузка не удалась', canvas.width/2, canvas.height/2 + 40);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
}

// =============================================
// ЗАГРУЗКА КОНКРЕТНОЙ ПАНОРАМЫ
// =============================================
function loadPanorama(index) {
    // Удаляем предыдущую панораму
    if (currentSphere) {
        scene.remove(currentSphere);
        currentSphere.geometry.dispose();
        currentSphere.material.dispose();
        currentSphere = null;
    }
    
    const panorama = PANORAMAS_CONFIG[index];
    const texture = loadedTextures[index];
    
    if (!texture) {
        console.error(`Текстура не загружена для индекса ${index}`);
        return;
    }
    
    // Создаем сферу для панорамы
    const geometry = new THREE.SphereGeometry(100, 64, 32);
    geometry.scale(-1, 1, 1); // Инвертируем для отображения внутри
    
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    
    currentSphere = new THREE.Mesh(geometry, material);
    scene.add(currentSphere);
    
    // Сбрасываем камеру в начальное положение
    camera.position.set(0, 0, 0.1);
    controls.target.set(0, 0, 0);
    controls.update();
    
    // Обновляем интерфейс
    currentPanoramaIndex = index;
    updateUI();
}

// =============================================
// ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
// =============================================
function updateUI() {
    const panorama = PANORAMAS_CONFIG[currentPanoramaIndex];
    
    // Обновляем информацию
    document.getElementById('current-index').textContent = currentPanoramaIndex + 1;
    document.getElementById('current-name').textContent = panorama.name;
    
    // Обновляем активный элемент в списке
    const items = document.querySelectorAll('.panorama-list-item');
    items.forEach((item, index) => {
        if (index === currentPanoramaIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// =============================================
// ПЕРЕКЛЮЧЕНИЕ ПАНОРАМ
// =============================================
function switchPanorama(newIndex) {
    if (isTransitioning || newIndex === currentPanoramaIndex) return;
    if (newIndex < 0 || newIndex >= PANORAMAS_CONFIG.length) return;
    
    isTransitioning = true;
    
    // Создаем overlay для плавного перехода
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    overlay.style.opacity = '0';
    document.getElementById('container').appendChild(overlay);
    
    // Фаза 1: Затемнение
    new TWEEN.Tween(overlay.style)
        .to({ opacity: '1' }, 300)
        .easing(TWEEN.Easing.Quadratic.In)
        .onComplete(() => {
            // Меняем панораму
            loadPanorama(newIndex);
            
            // Фаза 2: Осветление
            new TWEEN.Tween(overlay.style)
                .to({ opacity: '0' }, 300)
                .easing(TWEEN.Easing.Quadratic.Out)
                .delay(100)
                .onComplete(() => {
                    overlay.remove();
                    isTransitioning = false;
                })
                .start();
        })
        .start();
}

// =============================================
// УПРАВЛЕНИЕ ПАНОРАМАМИ
// =============================================
function nextPanorama() {
    const nextIndex = (currentPanoramaIndex + 1) % PANORAMAS_CONFIG.length;
    switchPanorama(nextIndex);
}

function prevPanorama() {
    const prevIndex = (currentPanoramaIndex - 1 + PANORAMAS_CONFIG.length) % PANORAMAS_CONFIG.length;
    switchPanorama(prevIndex);
}

// =============================================
// УПРАВЛЕНИЕ НАВИГАЦИЕЙ
// =============================================
function toggleNavigationPanel() {
    document.getElementById('navigation-panel').classList.toggle('visible');
}

function hideNavigationPanel() {
    document.getElementById('navigation-panel').classList.remove('visible');
}

// =============================================
// ФУНКЦИИ УПРАВЛЕНИЯ
// =============================================
function toggleAutoRotate() {
    isAutoRotating = !isAutoRotating;
    const btn = document.getElementById('auto-rotate-btn');
    
    if (isAutoRotating) {
        btn.classList.add('active');
        btn.title = 'Остановить автоповорот (Пробел)';
    } else {
        btn.classList.remove('active');
        btn.title = 'Включить автоповорот (Пробел)';
    }
}

function resetView() {
    camera.position.set(0, 0, 0.1);
    controls.target.set(0, 0, 0);
    controls.update();
}

function toggleFullscreen() {
    const container = document.getElementById('container');
    
    if (!isFullscreen) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }
}

// =============================================
// НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ
// =============================================
function setupEventListeners() {
    // Кнопки навигации
    document.getElementById('prev-btn').addEventListener('click', prevPanorama);
    document.getElementById('next-btn').addEventListener('click', nextPanorama);
    
    // Кнопки управления
    document.getElementById('auto-rotate-btn').addEventListener('click', toggleAutoRotate);
    document.getElementById('reset-btn').addEventListener('click', resetView);
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
    document.getElementById('toggle-nav-btn').addEventListener('click', toggleNavigationPanel);
    document.getElementById('close-nav').addEventListener('click', hideNavigationPanel);
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                prevPanorama();
                break;
            case 'ArrowRight':
                nextPanorama();
                break;
            case ' ':
                e.preventDefault();
                toggleAutoRotate();
                break;
            case 'r':
            case 'R':
                resetView();
                break;
            case 'f':
            case 'F':
                toggleFullscreen();
                break;
            case 'n':
            case 'N':
                toggleNavigationPanel();
                break;
            case 'Escape':
                hideNavigationPanel();
                break;
        }
    });
    
    // Изменение размера окна
    window.addEventListener('resize', onWindowResize);
    
    // Двойной клик для полноэкранного режима
    const canvas = document.getElementById('panorama-canvas');
    canvas.addEventListener('dblclick', toggleFullscreen);
}

// =============================================
// ОБРАБОТКА ИЗМЕНЕНИЯ РАЗМЕРА ОКНА
// =============================================
function onWindowResize() {
    if (!camera || !renderer) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// =============================================
// ОБРАБОТЧИК ПОЛНОЭКРАННОГО РЕЖИМА
// =============================================
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    isFullscreen = !!(document.fullscreenElement || 
                     document.webkitFullscreenElement || 
                     document.msFullscreenElement);
}

// =============================================
// АНИМАЦИОННЫЙ ЦИКЛ
// =============================================
function animate() {
    requestAnimationFrame(animate);
    
    // Автоповорот
    if (isAutoRotating) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
    } else {
        controls.autoRotate = false;
    }
    
    // Обновление анимаций
    TWEEN.update();
    controls.update();
    
    // Рендеринг
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// =============================================
// ОБРАБОТКА ОШИБОК
// =============================================
function showNoPanoramasError() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.innerHTML = `
            <div style="text-align: center; max-width: 500px; padding: 20px;">
                <div style="font-size: 80px; color: #ff6b6b; margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h2 style="margin-bottom: 20px; color: #fff;">Нет панорам</h2>
                <p style="color: #ccc; margin-bottom: 30px; line-height: 1.6;">
                    Добавьте панорамы в массив <code>PANORAMAS_CONFIG</code> в файле script.js
                </p>
                <pre style="background: rgba(255, 107, 107, 0.1); padding: 15px; border-radius: 8px; text-align: left; overflow-x: auto;">
const PANORAMAS_CONFIG = [
    {
        id: 1,
        name: "Название панорамы",
        file: "panoramas/ваш_файл.jpg"
    }
    // добавьте больше панорам...
];</pre>
            </div>
        `;
    }
}

// =============================================
// ЗАПУСК ПРИЛОЖЕНИЯ
// =============================================
window.addEventListener('DOMContentLoaded', init);