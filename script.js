// =============================================
// КОНФИГУРАЦИЯ ПАНОРАМ
// =============================================
// Добавьте сюда все ваши панорамы
const PANORAMAS_CONFIG = [
  {
    id: 22,
    name: "Восточный поближе",
    description: "Восточный поближе",
    file: "panoramas/Восточный поближе.jpg"
  },
  {
    id: 1,
    name: "Восточный буровая установка",
    description: "Восточный буровая установка",
    file: "panoramas/Восточный буровая установка.jpg",
    hotspots: [
      {
        id: 1,
        title: "Восточный буровая установка",
        description: "самый глубокий карьер, отрабатываемый открытым способом в России. Глубина 880 метров. На такой глубине уместились бы три здания МГУ, его высота со шпилем — 235 метров. Туда целиком вошло бы даже самое большое здание в России: высота питерского «Лахта Центра» — 462 метра.",
        position: { x: 0.5658356983675781, y: -0.38840080036095487, z: -0.7273065246042035 },
        type: "info", // или "link" для перехода
        icon: "map-marker-alt",
        linkedPanoramaId: null // для типа "link" указываем ID панорамы
      },
    ]
  },
  {
    id: 2,
    name: "Забой",
    description: "Забой",
    file: "panoramas/Забой.jpg"
  },
  {
    id: 3,
    name: "Самосвал",
    description: "Самосвал",
    file: "panoramas/Самосвал.jpg"
  },
  {
    id: 4,
    name: "Дорога с самосвалами",
    description: "Дорога с самосвалами",
    file: "panoramas/Дорога с самосвалами.jpg"
  },
  {
    id: 5,
    name: "Благодатный",
    description: "Благодатный",
    file: "panoramas/Благодатный.jpg"
  },
  {
    id: 6,
    name: "Центр управления 1",
    description: "Центр управления 1",
    file: "panoramas/Центр управления 1.JPG"
  },
  {
    id: 7,
    name: "Центр управления 2",
    description: "Центр управления 2",
    file: "panoramas/Центр управления 2.JPG"
  },
  {
    id: 8,
    name: "Центр управления 3",
    description: "Центр управления 3",
    file: "panoramas/Центр управления 3.JPG"
  },
  {
    id: 9,
    name: "Карьер помещение",
    description: "Карьер помещение",
    file: "panoramas/Карьер помещение.JPG"
  },
  {
    id: 10,
    name: "Поселок день",
    description: "Поселок день",
    file: "panoramas/Поселок день.jpg"
  },
  {
    id: 11,
    name: "Поселок вечер",
    description: "Поселок вечер",
    file: "panoramas/Поселок вечер.jpg"
  },
  {
    id: 12,
    name: "КСК день",
    description: "КСК день",
    file: "panoramas/КСК день.jpg"
  },
  {
    id: 13,
    name: "КСК вечер",
    description: "КСК вечер",
    file: "panoramas/КСК вечер.jpg"
  },
  {
    id: 14,
    name: "Спортзал",
    description: "Спортзал",
    file: "panoramas/Спортзал.JPG"
  },
  {
    id: 15,
    name: "ЗИФ",
    description: "ЗИФ",
    file: "panoramas/ЗИФ.JPG"
  },
  {
    id: 16,
    name: "Био",
    description: "Био",
    file: "panoramas/Био.JPG"
  },
  {
    id: 17,
    name: "Плавильное отделение",
    description: "Плавильное отделение",
    file: "panoramas/Плавильное отделение.JPG"
  },
  {
    id: 18,
    name: "Ангар 3",
    description: "Ангар 3",
    file: "panoramas/Ангар 3.JPG"
  },
  {
    id: 19,
    name: "Кабина",
    description: "Кабина",
    file: "panoramas/Кабина.JPG"
  },
  {
    id: 20,
    name: "Питстоп 2",
    description: "Питстоп 2",
    file: "panoramas/Питстоп 2.JPG"
  },
  {
    id: 21,
    name: "Мойка",
    description: "Мойка",
    file: "panoramas/Мойка.JPG"
  },
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

let hotspots = [];
let currentHotspots = [];
let activeHotspot = null;

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
  ctx.fillText(name, canvas.width / 2, canvas.height / 2 - 40);

  ctx.fillStyle = '#88a';
  ctx.font = '24px Arial';
  ctx.fillText('Загрузка не удалась', canvas.width / 2, canvas.height / 2 + 40);

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
  createHotspots(index);
}

// =============================================
// СОЗДАНИЕ МЕТОК
// =============================================
function createHotspots(panoramaIndex) {
  removeHotspots();

  const panorama = PANORAMAS_CONFIG[panoramaIndex];
  if (!panorama.hotspots || panorama.hotspots.length === 0) return;

  currentHotspots = [];
  const container = document.getElementById('hotspots-container');

  panorama.hotspots.forEach((hotspotConfig) => {
    const screenPos = convert3DToScreen(hotspotConfig.position);

    const hotspot = document.createElement('div');
    hotspot.className = 'hotspot';
    hotspot.id = `hotspot-${hotspotConfig.id}`;
    hotspot.dataset.hotspotId = hotspotConfig.id;

    hotspot.style.left = `${screenPos.x}px`;
    hotspot.style.top = `${screenPos.y}px`;

    // Иконка метки
    const icon = document.createElement('i');
    icon.className = `fas fa-${hotspotConfig.icon || 'map-marker-alt'}`;
    hotspot.appendChild(icon);

    // Всплывающее окно
    const popup = document.createElement('div');
    popup.className = 'hotspot-popup';

    let popupContent = `
            <div class="popup-header">
                <h3>${hotspotConfig.title}</h3>
            </div>
            <div class="popup-body">
        `;

    // Добавляем изображение, если есть
    if (hotspotConfig.image) {
      popupContent += `<img src="${hotspotConfig.image}" alt="${hotspotConfig.title}" class="popup-image">`;
    }

    popupContent += `<p>${hotspotConfig.description}</p></div>`;

    // Добавляем кнопки действий
    if (hotspotConfig.action) {
      popupContent += `<div class="popup-footer">`;

      if (hotspotConfig.action.type === 'link' && hotspotConfig.action.panoramaId) {
        popupContent += `
                    <button class="popup-btn primary goto-btn" data-panorama-id="${hotspotConfig.action.panoramaId}">
                        <i class="fas fa-external-link-alt"></i> ${hotspotConfig.action.label || 'Перейти'}
                    </button>
                `;
      } else if (hotspotConfig.action.type === 'modal') {
        popupContent += `
                    <button class="popup-btn more-info-btn">
                        <i class="fas fa-info-circle"></i> ${hotspotConfig.action.label || 'Подробнее'}
                    </button>
                `;
      }

      popupContent += `</div>`;
    }

    popup.innerHTML = popupContent;
    hotspot.appendChild(popup);

    // Обработчик клика по метке (не по попапу!)
    hotspot.addEventListener('click', (e) => {
      if (!e.target.closest('.hotspot-popup')) {
        e.stopPropagation();
        handleHotspotClick(hotspotConfig);
      }
    });

    // Обработчики для кнопок внутри попапа
    setTimeout(() => {
      const gotoBtn = popup.querySelector('.goto-btn');
      if (gotoBtn) {
        gotoBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const panoramaId = parseInt(gotoBtn.dataset.panoramaId);
          const targetIndex = PANORAMAS_CONFIG.findIndex(p => p.id === panoramaId);
          if (targetIndex !== -1) {
            switchPanorama(targetIndex);
          }
        });
      }

      const moreInfoBtn = popup.querySelector('.more-info-btn');
      if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Можно открыть расширенное модальное окно
          showExtendedInfo(hotspotConfig);
        });
      }
    }, 0);

    container.appendChild(hotspot);

    currentHotspots.push({
      element: hotspot,
      config: hotspotConfig,
      screenPos: screenPos,
      popup: popup
    });
  });

  updateHotspotsPosition();
}

// =============================================
// УДАЛЕНИЕ МЕТОК
// =============================================
function removeHotspots() {
  const container = document.getElementById('hotspots-container');
  container.innerHTML = '';
  currentHotspots = [];
}

// =============================================
// ПРЕОБРАЗОВАНИЕ 3D КООРДИНАТ В ЭКРАННЫЕ
// =============================================
function convert3DToScreen(position3D) {
  // Создаем вектор из сферических координат
  const vector = new THREE.Vector3(
    position3D.x,
    position3D.y,
    position3D.z
  ).normalize();

  // Проецируем на камеру
  vector.project(camera);

  // Преобразуем в экранные координаты
  const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

  return { x, y };
}

// =============================================
// ОБНОВЛЕНИЕ ПОЗИЦИЙ МЕТОК
// =============================================
function updateHotspotsPosition() {
  if (!currentHotspots.length) return;

  currentHotspots.forEach(hotspot => {
    const screenPos = convert3DToScreen(hotspot.config.position);
    hotspot.element.style.left = `${screenPos.x}px`;
    hotspot.element.style.top = `${screenPos.y}px`;

    // Проверяем видимость метки
    const vector = new THREE.Vector3(
      hotspot.config.position.x,
      hotspot.config.position.y,
      hotspot.config.position.z
    ).normalize();

    const cameraDirection = new THREE.Vector3(0, 0, -1);
    cameraDirection.applyQuaternion(camera.quaternion);

    const angle = vector.angleTo(cameraDirection);

    // Если метка за камерой, делаем её полупрозрачной
    if (angle > Math.PI / 2) {
      hotspot.element.style.opacity = '0';
      hotspot.element.style.pointerEvents = 'none';
    } else {
      hotspot.element.style.opacity = '1';
      hotspot.element.style.pointerEvents = 'auto';
    }

    // Обновляем позицию попапа, если он виден
    const popup = hotspot.element.querySelector('.hotspot-popup');
    if (popup && hotspot.element.matches(':hover')) {
      // Проверяем, не выходит ли попап за границы экрана
      const popupRect = popup.getBoundingClientRect();
      const hotspotRect = hotspot.element.getBoundingClientRect();

      // Если попап выходит за верхнюю границу, показываем его снизу
      if (hotspotRect.top - popupRect.height < 10) {
        popup.style.bottom = 'auto';
        popup.style.top = '40px';
        popup.style.transform = 'translateX(-50%)';

        // Меняем стрелочку
        popup.style.setProperty('--arrow-position', 'top');
      } else {
        popup.style.bottom = '40px';
        popup.style.top = 'auto';
        popup.style.transform = 'translateX(-50%)';

        // Возвращаем стрелочку вниз
        popup.style.setProperty('--arrow-position', 'bottom');
      }
    }
  });
}

// =============================================
// ОБРАБОТКА КЛИКА ПО МЕТКЕ
// =============================================
function handleHotspotClick(hotspotConfig) {
  activeHotspot = hotspotConfig;

  if (hotspotConfig.type === 'link' && hotspotConfig.linkedPanoramaId) {
    // Находим индекс панорамы по ID
    const targetIndex = PANORAMAS_CONFIG.findIndex(p => p.id === hotspotConfig.linkedPanoramaId);
    if (targetIndex !== -1) {
      switchPanorama(targetIndex);
    }
  } else if (hotspotConfig.type === 'info') {
    // Показываем модальное окно с информацией
    showInfoModal(hotspotConfig);
  }
}

// =============================================
// ПОКАЗ МОДАЛЬНОГО ОКНА
// =============================================
function showInfoModal(hotspotConfig) {
  const modal = document.getElementById('info-modal');
  const title = document.getElementById('modal-title');
  const description = document.getElementById('modal-description');
  const image = document.getElementById('modal-image');
  const gotoBtn = document.getElementById('goto-panorama-btn');

  title.textContent = hotspotConfig.title;
  description.textContent = hotspotConfig.description;

  // Если есть изображение
  if (hotspotConfig.image) {
    image.src = hotspotConfig.image;
    image.style.display = 'block';
  } else {
    image.style.display = 'none';
  }

  // Если есть ссылка на другую панораму
  if (hotspotConfig.linkedPanoramaId) {
    const targetPanorama = PANORAMAS_CONFIG.find(p => p.id === hotspotConfig.linkedPanoramaId);
    gotoBtn.style.display = 'flex';
    gotoBtn.onclick = () => {
      const targetIndex = PANORAMAS_CONFIG.findIndex(p => p.id === hotspotConfig.linkedPanoramaId);
      if (targetIndex !== -1) {
        hideInfoModal();
        switchPanorama(targetIndex);
      }
    };
    gotoBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> Перейти к "${targetPanorama.name}"`;
  } else {
    gotoBtn.style.display = 'none';
  }

  modal.classList.add('active');
}

// =============================================
// СКРЫТИЕ МОДАЛЬНОГО ОКНА
// =============================================
function hideInfoModal() {
  document.getElementById('info-modal').classList.remove('active');
  activeHotspot = null;
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

    switch (e.key) {
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

  // Модальное окно
  document.getElementById('close-modal').addEventListener('click', hideInfoModal);
  document.getElementById('close-modal-btn').addEventListener('click', hideInfoModal);

  // Закрытие по клику на фон
  document.getElementById('info-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('info-modal')) {
      hideInfoModal();
    }
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('info-modal').classList.contains('active')) {
      hideInfoModal();
    }
  });

  document.getElementById('edit-hotspots-btn').addEventListener('click', toggleEditMode);

  // Горячая клавиша для режима редактирования
  document.addEventListener('keydown', (e) => {
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      toggleEditMode();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
      // Показать/скрыть все метки
      const hotspots = document.querySelectorAll('.hotspot');
      hotspots.forEach(hotspot => {
        hotspot.style.display = hotspot.style.display === 'none' ? '' : 'none';
      });
    }
  });
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

  if (currentHotspots.length > 0) {
    updateHotspotsPosition();
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

let editMode = false;

function toggleEditMode() {
  editMode = !editMode;
  const btn = document.getElementById('edit-hotspots-btn');

  if (editMode) {
    btn.classList.add('active');
    btn.title = 'Выйти из режима редактирования (E)';
    enableHotspotPlacement();
  } else {
    btn.classList.remove('active');
    btn.title = 'Режим редактирования (E)';
    disableHotspotPlacement();
  }
}

function enableHotspotPlacement() {
  const canvas = document.getElementById('panorama-canvas');
  canvas.addEventListener('click', handleCanvasClickForPlacement);
}

function disableHotspotPlacement() {
  const canvas = document.getElementById('panorama-canvas');
  canvas.removeEventListener('click', handleCanvasClickForPlacement);
}

function handleCanvasClickForPlacement(event) {
  if (!editMode) return;

  // Получаем координаты клика относительно холста
  const rect = event.target.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // Преобразуем в 3D координаты
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

  // Ищем пересечение со сферой
  const intersects = raycaster.intersectObject(currentSphere);

  if (intersects.length > 0) {
    const point = intersects[0].point;
    const normalizedPoint = point.normalize();

    // Создаем новую метку
    const hotspotId = Date.now(); // временный ID
    const newHotspot = {
      id: hotspotId,
      title: prompt('Название метки:', 'Новая метка'),
      description: prompt('Описание:', 'Описание метки'),
      position: {
        x: normalizedPoint.x,
        y: normalizedPoint.y,
        z: normalizedPoint.z
      },
      type: 'info',
      icon: 'map-marker-alt'
    };

    if (newHotspot.title) {
      // Добавляем в конфигурацию
      if (!PANORAMAS_CONFIG[currentPanoramaIndex].hotspots) {
        PANORAMAS_CONFIG[currentPanoramaIndex].hotspots = [];
      }
      PANORAMAS_CONFIG[currentPanoramaIndex].hotspots.push(newHotspot);

      // Обновляем отображение
      createHotspots(currentPanoramaIndex);

      // Показываем сохранённые данные
      console.log('Создана метка:', newHotspot);
      console.log('Конфигурация для этой панорамы:', PANORAMAS_CONFIG[currentPanoramaIndex].hotspots);
    }
  }
}

// =============================================
// ЗАПУСК ПРИЛОЖЕНИЯ
// =============================================
window.addEventListener('DOMContentLoaded', init);