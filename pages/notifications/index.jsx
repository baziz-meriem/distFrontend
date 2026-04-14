
import PageHeader from "@/components/shared/PageHeader";
import Notification from "@/components/notificationPage/Notification";

import React from "react";

const Notifications = () => {
  const notifications = [
    {
      type: "Tentative de vol",
      description: "Une tentative de vol a été enregistré au niveau du distributeur :115",
    },
    {
      type: "Tentative de vol",
      description: "Une tentative de vol a été enregistré au niveau du distributeur :115",
    },
    {
      type: "Tentative de vol",
      description: "Une tentative de vol a été enregistré au niveau du distributeur :115",
    },
  ];
  return (
    <div>
        <PageHeader title="Mes Notifications" description="Rester au courant de toute nouvelle"/>
        {
          notifications.map((notification,index)=>(
            <Notification key={index} type={notification.type} description={notification.description}/>
          ))
        }

        <div className="flex justify-end">
              <button classNames="btn-green px-11 py-2.5 mt-4 light-grey">
                Marquer comme lu
              </button>
        </div>
    </div>
  );
};

export default Notifications;
