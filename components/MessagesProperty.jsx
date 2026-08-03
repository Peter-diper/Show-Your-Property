import { useEffect, useState } from "react";

const MessagesProperty = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const messageData = await res.json();
          setMessages(messageData);
        }
      } catch (error) {}
    };
    fetchMessage();
  }, []);

  return <div>MessagesProperty</div>;
};

export default MessagesProperty;
