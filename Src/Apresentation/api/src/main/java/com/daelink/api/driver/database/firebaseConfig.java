package com.daelink.api.driver.database;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class firebaseConfig {

    private static Firestore firestoreInstance;

    @Bean
    public Firestore firestore() throws IOException {
        if (firestoreInstance == null) {
            synchronized (firebaseConfig.class) {
                if (firestoreInstance == null) {
                    if (FirebaseApp.getApps().isEmpty()) {
                        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("daelinkKey.json");
                        if (serviceAccount == null) {
                            throw new IOException("Firebase service account file not found!");
                        }

                        FirebaseOptions options = FirebaseOptions.builder()
                                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                                .build();

                        FirebaseApp.initializeApp(options);
                        System.out.println("🔥 Firebase initialized successfully!");
                    }

                    firestoreInstance = FirestoreClient.getFirestore();
                }
            }
        }

        return firestoreInstance;
    }
}
