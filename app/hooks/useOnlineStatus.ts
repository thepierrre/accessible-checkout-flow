import { useEffect, useState } from "react";
import { useAppMessage } from "@/app/context/AppMessageContext";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const { setAppMessage, clearAppMessage } = useAppMessage();

  function notifyOffline() {
    setAppMessage("You are offline. Please check your connection.");
  }

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      clearAppMessage();
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [clearAppMessage]);
  return { isOnline, notifyOffline };
}
