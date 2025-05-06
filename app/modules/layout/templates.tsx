import type React from "react";

import Footer from "@/modules/layout/footer";
import Nav from "@/modules/layout/nav";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
