const Logout = () => {
  const { api, setIsAuthenticated, setUserData } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout"); // clears the cookie
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};
