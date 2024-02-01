import Container from "./ui/Container";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="px-6 py-14 text-right">
          &copy;{new Date().getFullYear()} • MYCOMMERCE • All right reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
