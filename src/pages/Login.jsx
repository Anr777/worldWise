import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { PageNav } from "../components";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Login = () => {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("anibal@gmail.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated, user } = useAuth();
  console.log(isAuthenticated)
  
  const navigate = useNavigate();
  const handleSubmit = ( e ) => {
    e.preventDefault();
    if ( email && password ) {
      login(email, password);
    }
  }

  useEffect( () => {
    if ( isAuthenticated === true ) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate])
  

  return (
    
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={ handleSubmit }>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button onClick={ login } type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
