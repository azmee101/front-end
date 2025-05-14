/**
 * Get the current logged in user from localStorage
 * @returns {Object|null} The user object if found, null otherwise
 */
export const getCurrentUser = () => {
    try {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            return JSON.parse(storedUser);
        }
        return null;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
};

/**
 * Check if current user has a specific role
 * @param {string} role - The role to check for
 * @returns {boolean} True if user has the role, false otherwise
 */
export const hasRole = (role) => {
    const user = getCurrentUser();
    return user?.role === role;
};

/**
 * Check if current user has admin role
 * @returns {boolean} True if user is admin, false otherwise
 */
export const isAdmin = () => {
    return hasRole("admin");
};

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in, false otherwise
 */
export const isLoggedIn = () => {
    return getCurrentUser() !== null;
};
