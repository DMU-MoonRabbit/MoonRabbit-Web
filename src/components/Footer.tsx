import React from "react";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-darkWalnut text-darkBeige mt-40">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6 gap-6">
        
        {/* 왼쪽: 이용약관 */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 text-sm sm:text-base">
          <Link to="/terms" className="hover:underline">서비스 이용약관</Link>
          <span className="hidden lg:inline-block w-px h-4 bg-darkBeige opacity-50" />
          <Link to="/privacy" className="hover:underline">개인정보 처리방침</Link>
          <span className="hidden lg:inline-block w-px h-4 bg-darkBeige opacity-50" />
          <Link to="/faq" className="hover:underline">자주 묻는 질문</Link>
        </div>

        {/* 오른쪽: 소셜 + 로고 + 카피라이트 */}
        <div className="flex flex-col items-center lg:items-end gap-4">
          {/* 달토끼 로고 */}
          <img
            src="images/MoonRabbitSleep2.png"
            alt="달토끼 로고"
            className="w-full h-auto object-contain mt-4"
            style={{
              maxWidth: "89px",
              maxHeight: "100px",
            }}
          />

          {/* 소셜 아이콘 */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-white transition" />
            </a>
          </div>

          {/* 카피라이트 */}
          <p className="text-xs text-gray-400 text-center lg:text-right mb-2">
            © 2025 MoonRabbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;