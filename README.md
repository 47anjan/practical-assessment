# Recipe App

# Description:

- You are provided with an incomplete Recipe App project that uses the free MealDB API to retrieve recipe data. The app needs to showcase some recipes and allows users to add them to a cart. Functionalities after carting is not required for the current MVP. The home page includes a banner section, a top recipes section, and a search option to find recipes by name or ingredients.

# Required New Features:

- Basic Authentication: Implement an authentication flow using name, email, phone, and a password.
- All Recipes Page: Create a page where users can view all recipes.
- Add Recipe to Cart: Allow users to add recipes to a cart. The cart should store data locally if the user is not logged in, and save it to the user’s account if they are logged in.
- Bug Fixes: There are at least three, or more features that are currently not working properly. Identify and fix these bugs.

# Additional Requirements:

- Consistent Design Style: Ensure that any new features match the design style of the existing application. Follow basic accessibility standards.
- Mobile Responsiveness: Make all pages responsive for mobile devices.

# Documentation Requirements:

- After completion, document under the README section.
- Features Implemented: Describe the new features you added, in both technical and non-technical terms.
- Bug Fixes: Briefly list the bugs you identified and fixed.
- Time Estimate: Indicate the total time spent on the assessment.

# N.B. Documentation should be brief and short, no need to go overboard with it.

# Submission Guidelines:

- Clone or ZIP Download the existing GitHub Code repository: https://github.com/khalek-repliq/frontend-assessment
- Get rid of the .git folder from the project.
- Make your necessary changes and upload your new project into your personal GitHub account as a public repository
- Host your final version on Vercel, Netlify, Firebase or similar platform and prepare your live link.
- You must submit your "GitHub Link" & "Live Link"

Sure! Here's your original documentation with only grammar corrections, keeping everything else the same:

---

# Documentation

## Features Implemented

### Search Functionality

**Technical Implementation**: Implemented comprehensive search functionality.
**User Experience**: Users can now search for recipes by name and ingredients.

### All Recipes Page

**Technical Implementation**: Created a centralized recipe listing component with filtering by category.
**User Experience**: Users can browse through all available recipes in an organized, easy-to-navigate interface with multiple viewing options.

### Wishlist Feature

**Technical Implementation**: Developed a wishlist management system with local storage persistence and user-specific data handling.
**User Experience**: Users can save favorite recipes to their personal wishlist for quick access later.

### Add to Cart

**Technical Implementation**: Built a shopping cart system with item management, quantity tracking, and cart state persistence.
**User Experience**: Users can add recipe ingredients to their shopping cart and maintain their cart across sessions.

### JWT Authentication

**Technical Implementation**: Integrated JSON Web Token (JWT) authentication system with secure token storage.
**User Experience**: Secure user login/logout functionality with session management, allowing personalized features like wishlists and cart persistence.

### Explore Recipes

**Technical Implementation**: Created an explore recipe page with pagination.
**User Experience**: Users can discover new recipes that other users have shared.

### Add Recipe

**Technical Implementation**: Developed a recipe creation form with image upload, ingredient management, step-by-step instructions, and validation.
**User Experience**: Users can contribute their own recipes.

### Infinite Pagination in Explore Recipes

**Technical Implementation**: Implemented infinite scroll pagination with lazy loading, performance optimization, and a smooth user experience.
**User Experience**: Seamless browsing experience where recipes load automatically as users scroll, eliminating the need for traditional page navigation.

## Bug Fixes

### Recipe Details Bug

**Issue**: The recipe details dialog was displaying empty content when users attempted to view recipe information, preventing access to recipe details.
**Resolution**: Fixed the dialog component by ensuring proper rendering of child components, resolving the empty dialog display issue.

### Search Recipe Form Bug

**Issue**: The search form was not properly handling user input.
**Resolution**: Fixed form validation, improved query processing, and enhanced error handling for better search reliability.

## Time Estimate

**Total Development Time**: 2 days (approximately 16 hours)
