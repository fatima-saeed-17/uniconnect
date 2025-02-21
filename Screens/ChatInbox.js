import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { Chat, ChannelList } from "stream-chat-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from "axios";
import { StreamChat } from "stream-chat";
import { auth, onAuthStateChanged } from "../firebaseConfig"; // ✅ Ensure correct import

const client = StreamChat.getInstance("YOUR_STREAM_API_KEY");

const ChatInbox = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Get Firebase Auth Token
        const firebaseToken = await firebaseUser.getIdToken();

        // Request Stream token from backend
        try {
          const response = await axios.post("http://YOUR_BACKEND_URL/generateToken", { firebaseToken });
          const { token, userId } = response.data;

          // Connect user to Stream Chat
          await client.connectUser(
            { id: userId, name: firebaseUser.displayName || "Anonymous" },
            token
          );

          setIsReady(true);
        } catch (error) {
          console.error("Error fetching Stream token:", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
      client.disconnectUser();
    };
  }, []);

  if (!isReady) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Chat client={client}>
        <SafeAreaView style={{ flex: 1 }}>
          <ChannelList onSelect={(channel) => console.log("Selected channel:", channel)} />
        </SafeAreaView>
      </Chat>
    </GestureHandlerRootView>
  );
};

export default ChatInbox;
