import React from "react";
import { SafeAreaView } from "react-native";
import { Chat, Channel, MessageList, MessageInput } from "stream-chat-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import chatClient from "./chatClient";

const ChatScreen = ({ route }) => {
  const { channelId } = route.params; // Get channel ID from navigation
  const channel = chatClient.channel("messaging", channelId);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={chatClient}>
          <SafeAreaView style={{ flex: 1 }}>
            <Channel channel={channel}>
              <MessageList />
              <MessageInput />
            </Channel>
          </SafeAreaView>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
};

export default ChatScreen;
