import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="bg-white p-4 rounded-lg min-w-md">{children}</main>
    </div>
  );
};

export default AuthLayout;
