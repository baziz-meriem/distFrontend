import React, { useState } from "react";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/dashboard/Map'), { ssr: false });

const MapWithOverlay = () => {

  return (
    <div className="fixed inset-0 z-50 bg-gray-300 bg-opacity-50 flex items-center justify-center ">
      <div className="w-full h-full max-w-4xl max-h-full mx-auto p-8 ">
        <Map/>
      </div>
    </div>
  );
};

export default MapWithOverlay;
