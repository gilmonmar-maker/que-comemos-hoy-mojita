const AppState = {
  currentScreen: 'welcome',
  userId: null,
  answers: [],
  currentQuestionIndex: 0,
  recommendations: [],
  currentDishIndex: 0,
  preferences: {},
};

const QUESTIONS = [
  "¿Te apetece algo ligero?",
  "¿Prefieres comida vegetariana?",
  "¿Te apetece algo picante?",
  "¿Quieres algo rápido de preparar?",
  "¿Te apetece algo con carne?",
  "¿Prefieres comida internacional?",
  "¿Te apetece algo caliente?",
  "¿Tienes antojo de comida tradicional?",
  "¿Te apetece algo con seafood/mariscos?",
  "¿Prefieres algo bajo en calorías?"
];

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  generateUserId();
});

function setupEventListeners() {
  document.getElementById('start-btn').addEventListener('click', startQuestions);
  document.getElementById('load-profile-btn').addEventListener('click', loadProfile);

  document.querySelectorAll('.btn-option').forEach(btn => {
    btn.addEventListener('click', (e) => answerQuestion(e.target.dataset.answer));
  });

  document.getElementById('back-btn').addEventListener('click', backToRecommendations);
  document.getElementById('love-btn').addEventListener('click', () => rateDish('love'));
  document.getElementById('skip-btn').addEventListener('click', () => rateDish('skip'));
  document.getElementById('dislike-btn').addEventListener('click', () => rateDish('dislike'));

  const getMoreBtn = document.getElementById('get-more-btn');
  if (getMoreBtn) {
    getMoreBtn.addEventListener('click', getMoreDishes);
  }
}

function generateUserId() {
  if (!localStorage.getItem('userId')) {
    AppState.userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', AppState.userId);
  } else {
    AppState.userId = localStorage.getItem('userId');
  }
}

function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenName + '-screen').classList.add('active');
  AppState.currentScreen = screenName;
}

function startQuestions() {
  AppState.answers = [];
  AppState.currentQuestionIndex = 0;
  showQuestion();
  showScreen('questions');
}

function showQuestion() {
  const questionIndex = AppState.currentQuestionIndex;
  const progress = ((questionIndex) / QUESTIONS.length) * 100;
  
  document.getElementById('progress-fill').style.width = progress + '%';
  document.getElementById('question-counter').textContent = `Pregunta ${questionIndex + 1} de ${QUESTIONS.length}`;
  document.getElementById('question-text').textContent = QUESTIONS[questionIndex];
}

function answerQuestion(answer) {
  AppState.answers.push(answer === 'yes');
  AppState.currentQuestionIndex++;

  if (AppState.currentQuestionIndex < QUESTIONS.length) {
    showQuestion();
  } else {
    getRecommendations();
  }
}

async function getRecommendations() {
  try {
    const response = await axios.post('/api/dishes/recommend', {
      userId: AppState.userId,
      answers: AppState.answers,
      preferences: AppState.preferences
    });
    
    AppState.recommendations = response.data.dishes;
    AppState.currentDishIndex = 0;
    showRecommendations();
  } catch (error) {
    console.error('Error getting recommendations:', error);
    alert('Error al obtener recomendaciones. Intenta de nuevo.');
  }
}

function showRecommendations() {
  const dishesGrid = document.getElementById('dishes-grid');
  dishesGrid.innerHTML = '';

  AppState.recommendations.forEach((dish, index) => {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" class="dish-image">
      <div class="dish-info-card">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <div class="dish-tags">
          <span class="tag">${dish.type}</span>
          <span class="tag">${dish.origin}</span>
        </div>
      </div>
    `;
    dishCard.addEventListener('click', () => showDishDetail(index));
    dishesGrid.appendChild(dishCard);
  });

  showScreen('recommendations');
}

function showDishDetail(index) {
  AppState.currentDishIndex = index;
  const dish = AppState.recommendations[index];

  document.getElementById('dish-image').src = dish.image;
  document.getElementById('dish-name').textContent = dish.name;
  document.getElementById('dish-description').textContent = dish.description;
  document.getElementById('dish-type').textContent = dish.type;
  document.getElementById('dish-origin').textContent = dish.origin;
  document.getElementById('dish-prep-time').textContent = dish.prepTime || 'Variable';
  document.getElementById('dish-difficulty').textContent = dish.difficulty || 'Media';
  document.getElementById('recipe-link').href = dish.recipeLink || '#';

  showScreen('dish-detail');
}

function rateDish(rating) {
  const dish = AppState.recommendations[AppState.currentDishIndex];
  
  const preference = {
    dishId: dish.id,
    dishName: dish.name,
    rating: rating,
    timestamp: new Date().toISOString()
  };

  let userPrefs = JSON.parse(localStorage.getItem(AppState.userId + '_preferences') || '[]');
  userPrefs.push(preference);
  localStorage.setItem(AppState.userId + '_preferences', JSON.stringify(userPrefs));

  axios.post('/api/preferences/save', {
    userId: AppState.userId,
    preference: preference
  }).catch(error => console.error('Error saving preference:', error));

  if (AppState.currentDishIndex < AppState.recommendations.length - 1) {
    AppState.currentDishIndex++;
    showDishDetail(AppState.currentDishIndex);
  } else {
    backToRecommendations();
  }
}

function backToRecommendations() {
  showRecommendations();
  document.getElementById('get-more-btn').style.display = 'block';
}

function getMoreDishes() {
  getRecommendations();
  document.getElementById('get-more-btn').style.display = 'none';
}

function loadProfile() {
  const userPrefs = JSON.parse(localStorage.getItem(AppState.userId + '_preferences') || '[]');
  if (userPrefs.length > 0) {
    AppState.preferences = userPrefs;
    startQuestions();
  } else {
    alert('No hay perfil guardado. ¡Comencemos!');
    startQuestions();
  }
}