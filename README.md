# 🍹 ¿Qué comemos hoy, Mojita?

An interactive meal suggestion web application that learns your food preferences through intelligent questioning.

## Features

✨ **Smart Question System**
- 10 carefully designed yes/no questions to understand your preferences
- Progressive learning based on your answers

🍽️ **Personalized Recommendations**
- Three daily dish suggestions based on your answers
- Each dish comes with an appetizing image
- Detailed information about each dish

📚 **Recipe Discovery**
- Direct links to high-quality recipes via Google search
- Easy access to cooking instructions

❤️ **Preference Learning**
- App learns from your ratings (Love, Skip, Dislike)
- Builds user preference history
- Improves recommendations over time

💾 **User History**
- Saves all preferences and ratings
- Persistent storage for each user
- Personalized experience across sessions

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (for storing user preferences)
- Google Custom Search API credentials

### Setup

1. Clone the repository:
```bash
git clone https://github.com/gilmonmar-maker/que-comemos-hoy-mojita.git
cd que-comemos-hoy-mojita
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Configure your .env with:
- MongoDB connection string
- Google API credentials
- Port number

5. Start the server:
```bash
npm start
```

The app will be available at `http://localhost:5000`

## Project Structure

```
que-comemos-hoy-mojita/
├── public/
│   ├── index.html        # Main HTML page
│   ├── app.js            # Client-side app logic
│   └── styles.css        # Styling
├── routes/
│   ├── users.js          # User management
│   ├── preferences.js    # Preference storage
│   ├── dishes.js         # Dish recommendations
│   └── recipes.js        # Recipe search
├── models/
│   ├── User.js           # User schema
│   ├── Preference.js     # Preference schema
│   └── Dish.js           # Dish schema
├── data/
│   └── dishes.js         # Dishes database
├── server.js             # Express server
├── package.json          # Dependencies
└── README.md            # This file
```

## How It Works

### The 10 Questions

1. ¿Te apetece algo ligero?
2. ¿Prefieres comida vegetariana?
3. ¿Te apetece algo picante?
4. ¿Quieres algo rápido de preparar?
5. ¿Te apetece algo con carne?
6. ¿Prefieres comida internacional?
7. ¿Te apetece algo caliente?
8. ¿Tienes antojo de comida tradicional?
9. ¿Te apetece algo con seafood/mariscos?
10. ¿Prefieres algo bajo en calorías?

### Recommendation Algorithm

The app uses a scoring system that:
1. Analyzes your answers to the 10 questions
2. Checks your historical preferences and ratings
3. Scores each dish based on attribute matching
4. Returns the top 3 recommendations
5. Learns from your feedback (Love, Skip, Dislike)

### User Preferences Storage

Each user's preferences are stored locally and on the server:
- Client-side: localStorage for quick access
- Server-side: MongoDB for persistent storage
- Automatic sync between client and server

## API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `GET /api/users/:userId` - Get user profile

### Preferences
- `POST /api/preferences/save` - Save preference rating
- `GET /api/preferences/user/:userId` - Get user preferences

### Dishes
- `POST /api/dishes/recommend` - Get recommendations
- `GET /api/dishes` - List all dishes

### Recipes
- `GET /api/recipes/search?dish=name` - Search for recipes
- `GET /api/recipes/recipe-link/:dishName` - Get recipe link

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: Google Custom Search API
- **HTTP Client**: Axios

## User Experience Flow

```
Welcome Screen
     ↓
10 Questions
     ↓
Generate Recommendations
     ↓
Show 3 Dishes
     ↓
User rates each dish (Love/Skip/Dislike)
     ↓
Store Preference
     ↓
Improve Future Recommendations
```

## Future Enhancements

- [ ] Mobile app version
- [ ] Nutritional information display
- [ ] Cooking time estimates
- [ ] Dietary restriction filters
- [ ] Social sharing of favorite dishes
- [ ] Recipe video integration
- [ ] Meal planning calendar
- [ ] Ingredient shopping list
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - see LICENSE file for details

## Author

Created with ❤️ by Mojita

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Enjoy discovering new dishes every day with Mojita!** 🍽️✨