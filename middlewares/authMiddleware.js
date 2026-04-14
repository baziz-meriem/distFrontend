// authMiddleware.js

const authMiddleware = (req, res, next) => {
  // Check if user is authenticated, e.g., by checking for a valid token or session
  const isLoggedIn = req.cookies.user;
  // If the user is not authenticated, redirect to login page
  if (!isLoggedIn) {
    return res.redirect("/login");
  }

  // Call the next middleware or route handler
  return next();
};

export default authMiddleware;
