import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonCheckbox,
  IonCard,
  IonCardContent,
  IonImg,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Import auth and db from firebaseConfig
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import { useHistory } from "react-router-dom"; // To redirect after account creation

const CreateAccount: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isOKU, setIsOKU] = useState<boolean | null>(null);
  const [okuId, setOkuId] = useState("");
  const history = useHistory();

  // Validate the inputs
  const validate = (): boolean => {
    if (!fullName) {
      setMessage("⚠️ Please enter your full name.");
      return false;
    }
    if (!studentId.startsWith("RU")) {
      setMessage("⚠️ Use your RU ID (e.g., RU123456).");
      return false;
    }
    if (!password || password.length < 6) {
      setMessage("⚠️ Use 6+ characters for your password.");
      return false;
    }
    if (isOKU === null) {
      setMessage("⚠️ Please select if you are an OKU cardholder.");
      return false;
    }
    if (isOKU && !okuId) {
      setMessage("⚠️ Please enter your OKU ID number.");
      return false;
    }
    if (isOKU && okuId && !validateOKUId(okuId)) {
      setMessage("⚠️ Please enter a valid OKU ID format (e.g., A123456 or B1234567).");
      return false;
    }
    if (!agree) {
      setMessage("⚠️ You must agree to the parking guidelines.");
      return false;
    }
    return true;
  };

  // Validate OKU ID format (Malaysian format)
  const validateOKUId = (id: string): boolean => {
    const okuRegex = /^[A-Z][0-9]{6,7}$/;
    return okuRegex.test(id.toUpperCase());
  };

  // Sign-up user and store data in Firestore
  const handleSignUp = async () => {
    setMessage("");
    if (!validate()) return;

    try {
      // Sign up the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // After signing up, add the user data to Firestore in the 'users' collection
      await addDoc(collection(db, "users"), {
        fullName,
        studentId,
        email,
        vehicle,
        isOKU,
        okuId,
        timestamp: new Date(), // Optionally, add a timestamp to track when the account was created
      });

      setMessage("✅ Account created successfully! Redirecting to login...");
      setTimeout(() => history.push("/login"), 2000); // Redirect to login after account creation
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  // Handle OKU selection
  const handleOKUSelection = (value: string) => {
    if (value === "yes") {
      setIsOKU(true);
    } else if (value === "no") {
      setIsOKU(false);
      setOkuId(""); // Clear OKU ID when user selects "No"
    } else {
      setIsOKU(null);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle className="ion-text-center" style={{ color: "#F97316" }}>
            Raffles University
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ "--background": "#FFFFFF" }}>
        <div className="ion-text-center ion-margin-bottom">
          {/* Add your actual RU logo in /public */}
          <IonImg
            src="raffleslogo.png"
            alt="RU Logo"
            style={{ width: "120px", margin: "0 auto 12px" }}
          />
          <IonText color="dark">
            <h2 style={{ fontWeight: "600", fontSize: "20px" }}>Create your account</h2>
          </IonText>
        </div>

        <IonCard style={{ borderRadius: "16px", background: "#F9FAFB" }}>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Full Name</IonLabel>
              <IonInput
                value={fullName}
                placeholder="Enter your full name"
                onIonInput={(e) => setFullName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Student ID</IonLabel>
              <IonInput
                value={studentId}
                placeholder="RU123456"
                onIonInput={(e) => setStudentId(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">RU Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="yourname@raffles-university.edu.my"
                onIonInput={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter password"
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
              <IonIcon
                icon={showPassword ? eyeOff : eye}
                slot="end"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Are you an OKU cardholder?</IonLabel>
              <IonSelect
                placeholder="Select option"
                value={isOKU === null ? "" : isOKU ? "yes" : "no"}
                onIonChange={(e) => handleOKUSelection(e.detail.value)}
              >
                <IonSelectOption value="yes">Yes</IonSelectOption>
                <IonSelectOption value="no">No</IonSelectOption>
              </IonSelect>
            </IonItem>

            {isOKU && (
              <IonItem>
                <IonLabel position="stacked">OKU ID Number</IonLabel>
                <IonInput
                  value={okuId}
                  placeholder="e.g., A123456 or B1234567"
                  onIonInput={(e) => setOkuId(e.detail.value!)}
                />
              </IonItem>
            )}

            <IonItem>
              <IonLabel position="stacked">Vehicle Plate (Optional)</IonLabel>
              <IonInput
                value={vehicle}
                placeholder="e.g., JQR1234"
                onIonInput={(e) => setVehicle(e.detail.value!)}
              />
            </IonItem>

            <IonItem lines="none">
              <IonCheckbox
                checked={agree}
                onIonChange={(e) => setAgree(e.detail.checked)}
                slot="start"
              />
              <IonLabel>I agree to the campus parking guidelines</IonLabel>
            </IonItem>

            <IonButton
              expand="block"
              shape="round"
              style={{
                marginTop: "16px",
                "--background": "#F97316",
                "--background-activated": "#EA580C",
              }}
              onClick={handleSignUp}
            >
              Create Account
            </IonButton>

            <IonText color="medium">
              <p className="ion-text-center ion-margin-top">
                Already have an account?{" "}
                <span
                  onClick={() => history.push("/login")}
                  style={{ color: "#F97316", cursor: "pointer" }}
                >
                  Log in
                </span>
              </p>
            </IonText>

            <IonText color="medium">
              <p
                style={{
                  fontSize: "13px",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                Only RU students/staff may register.
              </p>
            </IonText>

            {message && (
              <IonText
                color={
                  message.startsWith("✅")
                    ? "success"
                    : message.startsWith("❌") || message.startsWith("⚠️")
                    ? "danger"
                    : "medium"
                }
              >
                <p
                  className="ion-text-center"
                  style={{ marginTop: "10px", fontWeight: "500" }}
                >
                  {message}
                </p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
