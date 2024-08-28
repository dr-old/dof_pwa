import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

// Define types for user and context
interface User {
  _id: string;
  fullname: string;
  email: string;
  birthday: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loginAction: (data: { email: string; password: string }) => Promise<void>;
  logOut: () => void;
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("site") || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("site");
    const savedUser = localStorage.getItem("user");

    console.log("savedToken", savedToken);

    if (savedToken) {
      setToken(savedToken);
      const parsedUser: User | null = savedUser ? JSON.parse(savedUser) : null;
      setUser(parsedUser);
      navigate("/dashboard", { state: { title: "Dashboard" } });
    }
  }, []);

  const loginAction = async (res: any) => {
    if (res) {
      const userStr = {
        ...res.user,
        _id: res.user._id.toString(),
      };
      setUser(userStr);
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(userStr));
      localStorage.setItem("site", res.token);
      navigate("/dashboard", { state: { title: "Dashboard" } });
      return;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
