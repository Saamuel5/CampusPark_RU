import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";  // To navigate if needed (e.g., logout)
import { home } from "ionicons/icons";

const home: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Firebase logout method
    auth.signOut().then(() => {
      history.push("/login");  // Redirect to login after logging out
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle className="ion-text-center" style={{ color: "#F97316" }}>Welcome to CampusPark RU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ "--background": "#FFFFFF" }}>
        <div className="ion-text-center">
          <h2>Welcome to the Homepage</h2>
          <IonButton onClick={handleLogout} style={{ marginTop: "16px", "--background": "#F97316" }}>
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default home;
