
import PageHeader from "@/components/shared/PageHeader";
import Notification from "@/components/notificationPage/Notification";

import React from "react";

const Notifications = () => {
  const notifications = [
    {
      type: "Theft attempt",
      description: "A theft attempt was reported at distributor #115.",
    },
    {
      type: "Theft attempt",
      description: "A theft attempt was reported at distributor #115.",
    },
    {
      type: "Theft attempt",
      description: "A theft attempt was reported at distributor #115.",
    },
  ];
  return (
    <div>
        <PageHeader title="Notifications" description="Stay up to date with important alerts"/>
        {
          notifications.map((notification,index)=>(
            <Notification key={index} type={notification.type} description={notification.description}/>
          ))
        }

        <div className="flex justify-end">
              <button type="button" className="btn-green px-11 py-2.5 mt-4 light-grey">
                Mark as read
              </button>
        </div>
    </div>
  );
};

export default Notifications;
