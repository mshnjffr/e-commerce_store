import React from 'react';
import './Exercises.css';

const Exercises: React.FC = () => {
  return (
    <div className="exercises-page">
      <div className="container">
        <div className="page-header">
          <h1>Cody Exercises</h1>
        </div>

        <div className="exercises-content">
          <div className="exercise-section">
            <h2 className="section-title">🚀 Getting Started</h2>
            
            <div className="exercise-item">
              <div className="exercise-number">1</div>
              <div className="exercise-content">
                <h3>Understanding the Codebase with Cody</h3>
                <p className="exercise-description">
                  Use Cody to explore and understand this laptop store application.
                </p>
                <div className="exercise-tasks">
                  <h4>Tasks to complete with Cody:</h4>
                  <ul>
                    <li><strong>Understand the frontend React architecture</strong>
                      <br />📁 <em>Context to provide:</em> <code>frontend/src/App.tsx</code>, <code>frontend/src/components/Layout/Header.tsx</code>, <code>frontend/package.json</code>
                      <br />💡 <strong>Ask Cody:</strong> "Explain the overall structure of this React application. How are components organized and what routing is used?"
                    </li>
                    
                    <li><strong>Explore the FastAPI backend structure</strong>
                      <br />📁 <em>Context to provide:</em> <code>backend/main.py</code>, <code>backend/models.py</code>, <code>backend/services.py</code>
                      <br />💡 <strong>Ask Cody:</strong> "Walk me through this FastAPI backend structure. What are the main components and how do they work together?"
                    </li>
                    
                    <li><strong>Learn about the authentication system</strong>
                      <br />📁 <em>Context to provide:</em> <code>backend/auth.py</code>, <code>frontend/src/contexts/AuthContext.tsx</code>, <code>frontend/src/pages/Login.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Explain how authentication works in this app. How does the frontend handle JWT tokens and protected routes?"
                    </li>
                    
                    <li><strong>Understand the shopping cart implementation</strong>
                      <br />📁 <em>Context to provide:</em> <code>frontend/src/contexts/CartContext.tsx</code>, <code>frontend/src/pages/Cart.tsx</code>, <code>frontend/src/components/Laptop/LaptopCard.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "How does the shopping cart work? Explain the state management and how items are added, removed, and persisted."
                    </li>
                    
                    <li><strong>Explore the database schema and API endpoints</strong>
                      <br />📁 <em>Context to provide:</em> <code>backend/database.py</code>, <code>backend/models.py</code>, <code>frontend/src/services/api.ts</code>
                      <br />💡 <strong>Ask Cody:</strong> "Explain the database structure and API endpoints. How are laptops, users, and orders stored and retrieved?"
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="exercise-item">
              <div className="exercise-number">2</div>
              <div className="exercise-content">
                <h3>Critical Bug Fix: App Crash on Login Error</h3>
                <p className="exercise-description">
                  Learn to debug and fix critical runtime errors that crash the application when users enter incorrect login credentials.
                </p>
                <div className="exercise-tasks">
                  <h4>🚨 Critical Issue to Solve:</h4>
                  <p>💥 The application crashes with a TypeScript error when users enter wrong login credentials. Users see a compilation error overlay instead of a proper error message. This breaks the entire user experience.</p>
                  
                  <h4>Current Error:</h4>
                  <div className="error-message">
                    <code>TS2339: Property 'message' does not exist on type 'string | &#123; message: string; timestamp: number &#125;'</code>
                  </div>
                  
                  <h4>Tasks to complete with Cody:</h4>
                  <ul>
                    <li><strong>Step 1: Identify the TypeScript error</strong>
                    <br />📁 <em>Context to provide:</em> <code>src/pages/Login.tsx</code>
                    <br />💡 <strong>Ask Cody:</strong> "I'm getting a TypeScript error 'Property message does not exist on type string'. The error is on line 118 where I try to access errors.general.message.toUpperCase(). Can you explain why this fails and how to fix it?"
                    </li>
                    
                    <li><strong>Step 2: Understand the error data types</strong>
                    <br />📁 <em>Context to provide:</em> <code>src/pages/Login.tsx</code>
                    <br />💡 <strong>Ask Cody:</strong> "I see errors.general can be either a string or an object with &#123;message: string, timestamp: number&#125;. How should I safely access the message property without causing crashes?"
                    </li>
                    
                    <li><strong>Step 3: Fix the error display logic</strong>
                    <br />📁 <em>Context to provide:</em> <code>src/pages/Login.tsx</code>
                    <br />💡 <strong>Ask Cody:</strong> "Help me create a safe way to display error messages that works for both string and object error types. Use type guards or conditional logic."
                    </li>
                    
                    <li><strong>Step 4: Simplify the error handling</strong>
                    <br />📁 <em>Context to provide:</em> <code>src/pages/Login.tsx</code>
                    <br />💡 <strong>Ask Cody:</strong> "The current error handling is too complex. Help me refactor it to consistently use string error messages throughout the component."
                    </li>
                    
                    <li><strong>Step 5: Test the fix</strong>
                    <br />💡 <strong>Ask Cody:</strong> "After fixing the error display, what should I test to ensure login error handling works correctly? Give me specific test cases."
                    </li>
                    
                    <li><strong>Step 6: Add defensive programming</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/pages/Login.tsx</code>
                    <br />💡 <strong>Ask Cody:</strong> "Help me add defensive programming techniques to prevent similar crashes in the future. What utility functions or patterns should I use?"
                    </li>
                    
                    <li><strong>Step 7: Enhance error UX</strong>
                    <br />💡 <strong>Ask Cody:</strong> "Now that errors display safely, help me improve the user experience with better error messages, auto-clearing on input, and loading states."
                    </li>
                  </ul>
                  
                </div>

              </div>
            </div>

            <div className="exercise-item">
              <div className="exercise-number">3</div>
              <div className="exercise-content">
                <h3>Simple Feature: Add Product Favorites</h3>
                <p className="exercise-description">
                  Learn React basics by adding a heart icon that toggles favorite status for laptops. Perfect for beginners to understand state, events, and localStorage.
                </p>
                <div className="exercise-tasks">
                  <h4>What you'll learn:</h4>
                  <p>✅ React useState hook • Event handlers • Conditional rendering • localStorage • Basic CSS</p>
                  
                  <h4>Tasks to complete with Cody:</h4>
                  <ul>
                    <li><strong>Step 1: Understand the laptop cards</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/components/Laptop/LaptopCard.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Explain how this LaptopCard component works. I want to add a favorite heart icon that users can click to save favorite laptops."
                    </li>
                    
                    <li><strong>Step 2: Create a custom hook for favorites</strong>
                      <br />💡 <strong>Ask Cody:</strong> "Create a simple custom hook called useFavorites() that manages favorite laptop IDs in localStorage. It should return an array of favorite IDs, and functions to addFavorite(id) and removeFavorite(id)."
                    </li>
                    
                    <li><strong>Step 3: Add heart icon to laptop cards</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/components/Laptop/LaptopCard.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add a heart icon (🤍 for not favorite, ❤️ for favorite) to the top-right corner of each laptop card. Use the useFavorites hook to check if this laptop is favorited and toggle it when clicked."
                    </li>
                    
                    <li><strong>Step 4: Add click handler</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/components/Laptop/LaptopCard.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add a handleFavoriteClick function that toggles the favorite status. If the laptop is already favorited, remove it. If not, add it to favorites."
                    </li>
                    
                    <li><strong>Step 5: Style the heart icon</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/components/Laptop/LaptopCard.css</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add CSS for the favorite heart icon. Position it absolutely in the top-right corner with some padding. Make it clickable with hover effects and transition animations."
                    </li>
                    
                    <li><strong>Step 6: Create a favorites page</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/pages/Laptops.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Create a Favorites.tsx page that shows only favorited laptops. Filter the laptops to show only ones whose IDs are in the favorites list from useFavorites hook."
                    </li>
                    
                    <li><strong>Step 7: Add navigation to favorites</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/components/Layout/Header.tsx</code>, <code>src/App.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add a 'Favorites' link to the navigation header and add the route to App.tsx. Show a heart icon (❤️) next to 'Favorites' in the nav."
                    </li>
                    
                    <li><strong>Step 8: Handle empty favorites state</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/pages/Favorites.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add an empty state when no laptops are favorited. Show a message like 'No favorites yet! Browse laptops and click the heart icon to save your favorites.' with a link to the laptops page."
                    </li>
                    
                    <li><strong>Step 9: Test the feature</strong>
                      <br />💡 <strong>Ask Cody:</strong> "What should I test to make sure the favorites feature works correctly? Give me a step-by-step testing checklist."
                    </li>
                  </ul>
                  

                  
                </div>

              </div>
            </div>


            <div className="exercise-item">
              <div className="exercise-number">4</div>
              <div className="exercise-content">
                <h3>Frontend Implementation: Adding Computer Mice</h3>
                <p className="exercise-description">
                  Learn to use Cody for implementing new features by adding computer mice to the frontend, following the existing laptop patterns.
                </p>
                <div className="exercise-tasks">
                  <h4>Before you start - Backend is ready!</h4>
                  <p>✅ The backend already has mice endpoints: <code>GET /api/v1/mice</code> and <code>GET /api/v1/mice/&#123;id&#125;</code></p>
                  
                  <h4>Tasks to complete with Cody:</h4>
                  <ul>
                    <li><strong>Step 1: Understand the laptop implementation</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/types/api.ts</code>, <code>src/services/api.ts</code>, <code>src/components/LaptopCard.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Explain how laptops are implemented in this React app - from API types to components. I want to add mice following the same pattern."
                    </li>
                    
                    <li><strong>Step 2: Create mouse TypeScript types</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/types/api.ts</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add mouse types to this file. Mice have: id, brand, model, mouse_type, connectivity, dpi, buttons, rgb_lighting, weight_grams, price, stock_quantity, created_at"
                    </li>
                    
                    <li><strong>Step 3: Add mouse API service methods</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/services/api.ts</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add getMice() and getMouseById() methods following the same pattern as laptops. The endpoints are /api/v1/mice and /api/v1/mice/&#123;id&#125;"
                    </li>
                    
                    <li><strong>Step 4: Create MouseCard component</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/components/Laptop/LaptopCard.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Create a MouseCard component based on this LaptopCard. Show brand, model, mouse_type, connectivity, DPI, buttons, RGB status, weight, price, and stock. Copy the 'Add to Cart' functionality but change the addToCart call to use mice type."
                      <br />🔧 <strong>Key Change:</strong> Use <code>addToCart(mouse, 'mice', 1)</code> instead of <code>addToCart(laptop, 'laptop', 1)</code>
                    </li>
                    
                    <li><strong>Step 5: Create Mice listing page</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/pages/Laptops.tsx</code>, <code>src/components/MouseCard.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Create a Mice.tsx page based on this Laptops page structure, using MouseCard components and the mouse API service."
                    </li>
                    
                    <li><strong>Step 6: Add navigation and routing</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/components/Layout/Header.tsx</code>, <code>src/App.tsx</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add 'Mice' navigation link and route. Add it after 'Laptops' in both the header and routing."
                    </li>
                    
                    <li><strong>Step 7: Test full cart functionality</strong>
                      <br />💡 <strong>Excellent news:</strong> The complete system now supports both laptops and mice! Test the full workflow from adding to cart through checkout.
                      <br />✅ <strong>What works:</strong> Adding mice to cart, viewing mixed cart items, quantity updates, removing items, and full checkout with mixed orders!
                      <br />🎉 <strong>Backend Updated:</strong> The order system has been enhanced to support both product types seamlessly.
                    </li>
                    
                    <li><strong>Step 8: Test and troubleshoot</strong>
                      <br />💡 <strong>Ask Cody:</strong> "Help me debug any TypeScript errors or runtime issues. What common mistakes should I watch for when adding new features like this?"
                    </li>
                  </ul>
                  

                  
                </div>

              </div>
            </div>

            <div className="exercise-item">
              <div className="exercise-number">5</div>
              <div className="exercise-content">
                <h3>API Integration: Adding Order Cancellation</h3>
                <p className="exercise-description">
                  Learn to integrate with existing backend APIs by adding order cancellation functionality using the DELETE order endpoint.
                </p>
                <div className="exercise-tasks">
                  <h4>Backend API Available:</h4>
                  <p>✅ <code>DELETE /api/v1/orders/&#123;order_id&#125;</code> - Cancels pending orders only</p>
                  
                  <h4>Tasks to complete with Cody:</h4>
                  <ul>
                    <li><strong>Step 1: Understand the existing order system</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/pages/Orders.tsx</code>, <code>src/services/api.ts</code>
                      <br />💡 <strong>Ask Cody:</strong> "Explain how orders are displayed and managed in this app. I want to add a cancel order button for pending orders."
                    </li>
                    
                    <li><strong>Step 2: Add deleteOrder to API service</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/services/api.ts</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add a deleteOrder method to this API service. It should send DELETE request to /api/v1/orders/&#123;id&#125; and handle authentication headers like other methods."
                    </li>
                    
                    <li><strong>Step 3: Add cancel functionality to Orders page</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/pages/Orders.tsx</code>, <code>src/services/api.ts</code>
                      <br />💡 <strong>Ask Cody:</strong> "Add a 'Cancel Order' button to pending orders. Include a confirmation dialog asking 'Are you sure you want to cancel this order?' before calling the deleteOrder API."
                    </li>
                    
                    <li><strong>Step 4: Implement confirmation dialog</strong>
                      <br />📁 <em>Context to provide:</em> <code>src/pages/Cart.tsx</code> (for modal example)
                      <br />💡 <strong>Ask Cody:</strong> "Create a confirmation modal similar to the cart clear confirmation. Show order details and ask for confirmation before cancelling."
                    </li>
                    
                    <li><strong>Step 5: Handle API responses and errors</strong>
                      <br />💡 <strong>Ask Cody:</strong> "Add proper error handling for the cancel order functionality. Show success/error messages and refresh the orders list after successful cancellation."
                    </li>
                    
                    <li><strong>Step 6: Add loading states</strong>
                      <br />💡 <strong>Ask Cody:</strong> "Add loading states to prevent multiple clicks on cancel button and show 'Cancelling...' text during API call."
                    </li>
                    
                    <li><strong>Step 7: Conditional rendering</strong>
                      <br />💡 <strong>Ask Cody:</strong> "Only show cancel button for orders with 'pending' status. Hide it for completed, cancelled, or shipped orders."
                    </li>
                  </ul>      
                  
                  <div className="api-reference">
                    <h4>📚 API Reference:</h4>
                    <div className="api-endpoint">
                      <strong>DELETE /api/v1/orders/&#123;order_id&#125;</strong>
                      <ul>
                        <li><strong>Auth:</strong> Required (JWT token)</li>
                        <li><strong>Permissions:</strong> User can only cancel their own orders</li>
                        <li><strong>Constraints:</strong> Only pending orders can be cancelled</li>
                        <li><strong>Success:</strong> 200 + &#123;"message": "Order deleted successfully"&#125;</li>
                        <li><strong>Errors:</strong> 404 (not found), 400 (cannot cancel), 401 (unauthorized)</li>
                      </ul>
                    </div>
                  </div>
                
                </div>

              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Exercises;
