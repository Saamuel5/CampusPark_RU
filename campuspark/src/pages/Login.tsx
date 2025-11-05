import React, { useState } from "react";
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonInput, 
  IonButton, 
  IonItem, 
  IonLabel, 
  IonText,
  IonIcon 
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    setMessage("");  // Clear any previous messages
    
    // Basic validation
    if (!email && !password) {
      setMessage("❌ Please enter both email and password.");
      return;
    }
    if (!email) {
      setMessage("❌ Please enter your email.");
      return;
    }
    if (!password) {
      setMessage("❌ Please enter your password.");
      return;
    }

    try {
      // Attempt to sign in using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Login successful! Redirecting to homepage...");
      
      // Clear form
      setEmail("");
      setPassword("");
      
      setTimeout(() => {
        history.push("/home");  // Redirect to homepage after successful login
      }, 1500);
      
    } catch (error: any) {
      // Handle specific Firebase auth errors
      let errorMessage = "❌ Login failed. Please try again.";
      
      if (error.code === 'auth/invalid-email') {
        errorMessage = "❌ Invalid email format. Please check your email.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "❌ User not found. Please check your email or create an account.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "❌ Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "❌ Incorrect email and password combination.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "❌ Too many failed attempts. Please try again later.";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "❌ This account has been disabled. Please contact support.";
      }
      
      setMessage(errorMessage);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle className="ion-text-center" style={{ color: "#F97316" }}>CampusPark RU Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding" style={{ "--background": "#FFFFFF" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          {/* Email Input */}
          <IonItem style={{ marginBottom: "16px", borderRadius: "8px" }}>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
              placeholder="Enter your email"
              onKeyPress={handleKeyPress}
            />
          </IonItem>

          {/* Password Input with Eye Icon */}
          <IonItem style={{ marginBottom: "16px", borderRadius: "8px" }}>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type={showPassword ? "text" : "password"}
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
              placeholder="Enter your password"
              onKeyPress={handleKeyPress}
            />
            <IonIcon 
              icon={showPassword ? eyeOff : eye} 
              slot="end" 
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => setShowPassword(!showPassword)}
            />
          </IonItem>

          {/* Login Button */}
          <IonButton 
            expand="block" 
            onClick={handleLogin} 
            style={{ 
              marginTop: "16px", 
              "--background": "#F97316",
              "--background-activated": "#EA580C",
              borderRadius: "8px"
            }}
          >
            Login
          </IonButton>

          {/* Create Account Link */}
          <IonText color="medium">
            <p className="ion-text-center ion-margin-top">
              Don't have an account?{" "}
              <span 
                onClick={() => history.push("/createaccount")} 
                style={{ color: "#F97316", cursor: "pointer", fontWeight: "500" }}
              >
                Create Account
              </span>
            </p>
          </IonText>

          {/* Forgot Password Link */}
          <IonText color="medium">
            <p className="ion-text-center">
              <span 
                onClick={() => history.push("/forgot-password")} 
                style={{ color: "#F97316", cursor: "pointer", fontSize: "14px" }}
              >
                Forgot Password?
              </span>
            </p>
          </IonText>

          {/* Message Display */}
          {message && (
            <IonText 
              color={
                message.startsWith("✅") ? "success" : 
                "danger"
              } 
            >
              <p 
                className="ion-text-center" 
                style={{ 
                  marginTop: "20px", 
                  fontWeight: "500",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: message.startsWith("✅") ? "#f0fff4" : "#fff0f0"
                }}
              >
                {message}
              </p>
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
