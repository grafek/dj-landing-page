import { useEffect, useState } from "react";
import { Notification } from "../../types";
import { NOTIFICATION_MS_TIME } from "@/utils/globals";

type NotificationProps = { notification: Notification };

const HIDDEN = "-translate-y-40 opacity-0";

const SHOW = "translate-y-0 opacity-100";

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { message, isSuccessful, isShown } = notification;

  const stateClasses = isSuccessful ? "bg-green-600" : "bg-red-700";

  const [animationClasses, setAnimationClasses] = useState(HIDDEN);

  useEffect(() => {
    // add animation classes on mount
    if (isShown === true) {
      setAnimationClasses(SHOW);
    }
    const timer = setTimeout(() => {
      // add animation classes 1 second before unmount
      setAnimationClasses(HIDDEN);
    }, NOTIFICATION_MS_TIME - 1000);

    return () => clearTimeout(timer);
  }, [isShown]);

  return (
    <div
      title="notification"
      className={`${animationClasses} fixed inset-x-0 top-4 z-50 text-white transition-all duration-700`}
    >
      {isShown ? (
        <div
          className={`${stateClasses} mx-auto flex w-1/2 min-w-fit flex-col items-center justify-center rounded-md px-8 py-2 md:w-72`}
        >
          <p className={`font-semibold`}>{message}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
