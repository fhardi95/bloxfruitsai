
"use client";
import { useEffect } from "react";

export default function OneSignalProvider() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (!appId) return;

    window.OneSignalDeferred = window.OneSignalDeferred || [];

    // Load OneSignal SDK
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);

    window.OneSignalDeferred.push(async function (OneSignal: OneSignalType) {
      await OneSignal.init({
        appId,
        safari_web_id: "",
        notifyButton: {
          enable: true,
          size: "medium",
          position: "bottom-left",
          offset: { bottom: "20px", left: "20px" },
          prenotify: true,
          showCredit: false,
          text: {
            "tip.state.unsubscribed": "Subscribe for Blox Fruits code alerts!",
            "tip.state.subscribed": "You're subscribed to code alerts ✅",
            "tip.state.blocked": "You've blocked notifications",
            "message.prenotify": "Click to subscribe to Blox Fruits updates",
            "message.action.subscribed": "Thanks for subscribing!",
            "message.action.resubscribed": "You're subscribed to Blox Fruits alerts!",
            "message.action.unsubscribed": "You won't receive notifications anymore",
            "dialog.main.title": "Manage Notifications",
            "dialog.main.button.subscribe": "SUBSCRIBE",
            "dialog.main.button.unsubscribe": "UNSUBSCRIBE",
            "dialog.blocked.title": "Unblock Notifications",
            "dialog.blocked.message": "Follow these instructions to allow notifications:",
          },
          colors: {
            "circle.background": "rgb(0,245,255)",
            "circle.foreground": "rgb(6,15,30)",
            "badge.background": "rgb(255,71,87)",
            "badge.foreground": "white",
            "badge.bordercolor": "white",
            "pulse.color": "rgb(0,245,255)",
            "dialog.button.background.hovering": "rgb(0,200,210)",
            "dialog.button.background.active": "rgb(0,245,255)",
            "dialog.button.background": "rgb(0,245,255)",
            "dialog.button.foreground": "rgb(6,15,30)",
          },
        },
        welcomeNotification: {
          title: "Blox Fruits AI",
          message: "Thanks for subscribing! You'll get instant alerts for new codes and updates 🎁",
        },
        promptOptions: {
          slidedown: {
            prompts: [
              {
                type: "push",
                autoPrompt: true,
                text: {
                  actionMessage: "Get instant alerts when new Blox Fruits codes drop! Never miss free XP or Beli again 🎁",
                  acceptButton: "Allow",
                  cancelButton: "No thanks",
                },
                delay: {
                  pageViews: 2,
                  timeDelay: 10,
                },
              },
            ],
          },
        },
      });
    });
  }, []);

  return null;
}

// Type declarations
declare global {
  interface Window {
    OneSignalDeferred: ((OneSignal: OneSignalType) => void)[];
  }
}

interface OneSignalType {
  init: (options: Record<string, unknown>) => Promise<void>;
}
