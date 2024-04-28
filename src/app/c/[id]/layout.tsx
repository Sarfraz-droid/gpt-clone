import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-full h-screen bg-gray-800 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default Layout;
