# Codium - Coding Practice Platform

## Project Overview
Codium is a full-stack web application designed to help developers practice coding through DSA problems, SQL queries, and interactive quizzes. The platform provides curated learning paths, topic-wise practice, and quiz challenges.

## Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **CSS3** - Custom styling with dark mode support
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend (Integration Ready)
- **Django** - Python web framework
- **Django REST Framework** - API development
- **Token Authentication** - Secure user authentication

### Storage
- **LocalStorage** - Client-side data persistence for auth tokens and user data

---

## Technical Architecture

### 1. Component Structure

```
src/
├── components/
│   ├── Navbar/          # Top navigation bar
│   └── Sidebar/         # Hamburger menu sidebar
├── pages/
│   ├── Home/            # Landing page with features
│   ├── Login/           # User authentication
│   ├── Signup/          # User registration
│   ├── Profile/         # User profile and statistics
│   ├── DSASheets/       # DSA topic selection
│   ├── SQLSheets/       # SQL topic selection
│   ├── LearnTopic/      # Topic learning content
│   ├── PracticeDSA/     # DSA problem practice
│   ├── PracticeSQL/     # SQL query practice
│   ├── TakeQuiz/        # Quiz topic selection
│   └── Quiz/            # Interactive quiz interface
├── styles/              # Component-specific CSS files
├── images/              # Local image assets
└── icons/               # UI icons
```

### 2. State Management

**App-Level State (App.js)**
```javascript
- isSidebarOpen: Boolean - Controls sidebar visibility
- isLoggedIn: Boolean - User authentication status
- currentPage: String - Current active page/route
- userData: Object - Logged-in user information
- scrollToSection: String - Section navigation control
- selectedQuizTopic: String - Active quiz topic
- learnTopicData: Object - Learning content data
```

**Component-Level State**
- Form inputs (Login, Signup)
- Quiz answers and progress
- Loading states
- User statistics

### 3. Key Features Implementation

#### A. Authentication System

**Login Component (`Login.js`)**
```javascript
// Form validation
- Email format validation using regex
- Password length check (min 6 characters)

// API Integration
- POST request to Django backend: /api/auth/login/
- Stores auth token in localStorage
- Stores user data in localStorage
- Fallback to demo mode if backend unavailable

// Security
- Password show/hide toggle
- Token-based authentication
```

**Signup Component (`Signup.js`)**
```javascript
// Validation
- All fields required
- Email format validation
- Password confirmation match
- Minimum password length

// Registration Flow
- POST request to /api/auth/signup/
- Automatic login after successful signup
- Token storage for session persistence
```

#### B. Navigation System

**Client-Side Routing**
```javascript
// Implemented without React Router
- State-based page switching
- Conditional rendering based on currentPage state
- Navigation functions passed as props

// Navigation Flow
handleNavigation(page, section) => {
  - Updates currentPage state
  - Handles section-specific data (quiz topics, learning content)
  - Manages scroll behavior for home sections
}
```

**Protected Routes**
```javascript
// Access Control
- Login/Signup: Only accessible when not logged in
- Home: Accessible to all users
- Practice/Quiz/Profile: Requires authentication
- Redirects to login if unauthorized
```

#### C. Quiz System

**Quiz Component (`Quiz.js`)**
```javascript
// Features
- Dynamic question loading from backend/dummy data
- Progress tracking with visual progress bar
- Answer selection and storage
- Navigation between questions
- Score calculation
- Results display with percentage

// State Management
const [questions, setQuestions] = useState([])
const [currentQuestion, setCurrentQuestion] = useState(0)
const [selectedAnswers, setSelectedAnswers] = useState({})
const [score, setScore] = useState(0)

// Layout
- Compact header with progress bar and counter on same line
- 2-column grid layout for options (responsive)
- Previous/Next navigation
- Submit button on last question
```

**Quiz Flow**
1. User selects topic from TakeQuiz page
2. Questions fetched from backend (or dummy data)
3. User answers questions with visual feedback
4. Progress tracked with bar and counter
5. Submit triggers score calculation
6. Results page shows score and percentage
7. Options to retry or return to topics

#### D. Learning System

**DSA/SQL Sheets**
```javascript
// Topic Cards
- Grid layout of topic cards
- Background images from local assets
- Click navigation to learning content
- Hover effects for interactivity

// Image Management
- All images stored locally in /src/images/
- Imported as modules for optimization
- No external CDN dependencies
```

**LearnTopic Component**
```javascript
// Content Structure
{
  title: String,
  description: String,
  sections: [
    {
      heading: String,
      content: String,
      code: String (optional),
      points: Array (optional)
    }
  ],
  examples: [
    {
      title: String,
      code: String,
      explanation: String
    }
  ]
}

// Features
- Sidebar layout (profile card + main content)
- Syntax-highlighted code blocks
- Bullet points for key concepts
- Example problems with explanations
- Back navigation to topic list
```

#### E. Profile System

**Profile Component (`Profile.js`)**
```javascript
// User Statistics
- Questions submitted count
- Quizzes participated count
- Fetched from Django backend: /api/user/stats/

// Layout
- Left sidebar: Avatar, username, email
- Right section: Statistics cards
- Responsive grid layout

// Avatar Generation
- First letter of username
- Gradient background
- Circular design
```

#### F. Dark Mode Implementation

**Theme Toggle**
```javascript
// Implementation in Navbar.js
const [isDarkMode, setIsDarkMode] = useState(false)

useEffect(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    setIsDarkMode(true)
    document.body.classList.add('dark')
  }
}, [])

const toggleTheme = () => {
  setIsDarkMode(!isDarkMode)
  document.body.classList.toggle('dark')
  localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
}

// CSS Implementation
body.dark .component {
  background-color: #0a0e1a;
  color: #e5e7eb;
}
```

### 4. Styling Approach

**CSS Architecture**
```css
/* Component-specific CSS files */
- Modular CSS per component
- No CSS frameworks (custom styling)
- Consistent color scheme
- Dark mode support for all components

/* Design Principles */
- Clean, minimal design
- Subtle shadows and borders
- Smooth transitions (0.2s)
- Responsive breakpoints at 768px
- Inter font family throughout
```

**Color Palette**
```css
/* Light Mode */
Background: #ffffff, #f5f5f5
Text: #1a1a1a, #666
Primary: #22c55e (green)
Borders: #d1d5db, #e0e0e0

/* Dark Mode */
Background: #0a0e1a, #1a1f35
Text: #e5e7eb, #9ca3af
Primary: #10b981 (green)
Borders: #374151
```

### 5. API Integration

**Backend Endpoints (Django)**
```javascript
// Authentication
POST /api/auth/login/
POST /api/auth/signup/

// User Data
GET /api/user/stats/
Headers: { Authorization: 'Token <token>' }

// Learning Content
GET /api/learn/dsa/?topic=<topic>
GET /api/learn/sql/?topic=<topic>

// Quiz
GET /api/quiz/questions/?topic=<topic>

// Practice Problems
GET /api/practice/dsa/
GET /api/practice/sql/
```

**Error Handling**
```javascript
try {
  const response = await fetch(endpoint)
  const data = await response.json()
  // Handle success
} catch (error) {
  // Fallback to dummy data or demo mode
  console.error('Error:', error)
}
```

### 6. Data Flow

**Authentication Flow**
```
1. User enters credentials
2. Frontend validates input
3. POST request to Django backend
4. Backend validates and returns token + user data
5. Frontend stores token in localStorage
6. Updates isLoggedIn state
7. Redirects to home page
8. Token sent with subsequent API requests
```

**Quiz Flow**
```
1. User selects quiz topic
2. Frontend fetches questions from backend
3. Questions stored in component state
4. User selects answers (stored in state object)
5. Progress tracked and displayed
6. On submit, answers compared with correct answers
7. Score calculated and displayed
8. Option to retry or return
```

### 7. Responsive Design

**Breakpoints**
```css
/* Mobile: < 768px */
- Single column layouts
- Stacked navigation buttons
- Smaller font sizes
- Full-width components

/* Desktop: >= 768px */
- Multi-column grids
- Side-by-side layouts
- Larger typography
- Fixed max-widths (800px, 1200px)
```

**Mobile Optimizations**
- Touch-friendly button sizes
- Hamburger menu for navigation
- Collapsible sections
- Optimized image loading

### 8. Performance Optimizations

**Image Handling**
```javascript
// Local imports for optimization
import image from '../../images/photo.jpeg'

// Benefits:
- Webpack optimization
- Lazy loading
- Caching
- No external dependencies
```

**State Management**
```javascript
// Efficient re-renders
- Component-level state where possible
- Minimal prop drilling
- Conditional rendering
- useEffect dependencies optimized
```

**CSS Performance**
```css
/* Optimizations */
- No heavy animations
- Simple transitions (0.2s)
- Minimal box-shadows
- Hardware-accelerated transforms
```

### 9. Security Considerations

**Authentication**
- Token-based authentication
- Tokens stored in localStorage
- Tokens sent in Authorization headers
- Password validation on frontend and backend

**Input Validation**
- Email format validation
- Password strength requirements
- XSS prevention through React's built-in escaping
- Form validation before API calls

**Data Protection**
- No sensitive data in localStorage except tokens
- HTTPS recommended for production
- CORS configuration on backend

---

## Setup and Installation

### Prerequisites
```bash
Node.js (v14+)
npm or yarn
Python 3.8+ (for Django backend)
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Backend Setup (Django)
```bash
# Install dependencies
pip install django djangorestframework

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

---

## Project Highlights

### Technical Achievements
1. **Custom Routing System** - Implemented without React Router
2. **Dark Mode** - Complete theme switching with localStorage persistence
3. **Responsive Design** - Mobile-first approach with breakpoints
4. **Component Architecture** - Modular, reusable components
5. **State Management** - Efficient state handling without external libraries
6. **API Integration** - RESTful API integration with fallback support
7. **Form Validation** - Client-side validation with user feedback
8. **Local Asset Management** - Optimized image handling

### User Experience Features
1. **Smooth Navigation** - Seamless page transitions
2. **Visual Feedback** - Hover effects, active states, loading indicators
3. **Progress Tracking** - Visual progress bars in quizzes
4. **Responsive Layout** - Works on all device sizes
5. **Accessibility** - Semantic HTML, keyboard navigation
6. **Clean UI** - Minimal, professional design

---

## Future Enhancements

1. **Code Editor Integration** - Monaco Editor for coding problems
2. **Real-time Contests** - WebSocket integration for live contests
3. **Leaderboards** - User rankings and achievements
4. **Social Features** - Discussion forums, code sharing
5. **Analytics Dashboard** - Detailed progress tracking
6. **Email Notifications** - Contest reminders, achievements
7. **Payment Integration** - Premium features
8. **Mobile App** - React Native version

---

## Conclusion

Codium demonstrates a full-stack web application with modern React practices, clean architecture, and user-centric design. The project showcases proficiency in frontend development, API integration, state management, and responsive design principles.
