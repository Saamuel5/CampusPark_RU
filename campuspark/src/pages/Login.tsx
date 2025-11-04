import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonText,
  IonIcon
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <h1 style={{ color: "#ff4d00", fontWeight: "bold", fontSize: "2.5rem" }}>RU</h1>
          <h2>Create account</h2>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <IonItem lines="none">
            <IonInput label="Full Name" labelPlacement="floating" placeholder="Enter full name" />
          </IonItem>

          <IonItem lines="none">
            <IonInput label="Student ID" labelPlacement="floating" placeholder="Stu123456" />
          </IonItem>

          <IonItem lines="none">
            <IonInput
              label="Password"
              labelPlacement="floating"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <IonIcon
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            />
          </IonItem>

          <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
            <IonCheckbox
              checked={agree}
              onIonChange={(e) => setAgree(e.detail.checked)}
              style={{ marginRight: "8px" }}
            />
            <IonText>I agree to the campus parking guidelines</IonText>
          </div>

          <IonButton
            expand="block"
            style={{ marginTop: "2rem", backgroundColor: "#ff4d00" }}
            disabled={!agree}
          >
            Create Account
          </IonButton>

          <IonText color="medium" style={{ display: "block", textAlign: "center", marginTop: "1rem" }}>
            Only RU students and staff may register.
          </IonText>

          <IonText color="dark" style={{ display: "block", textAlign: "center", marginTop: "1.5rem" }}>
            Already have an account?
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
