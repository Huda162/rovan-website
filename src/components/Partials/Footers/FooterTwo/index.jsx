import { Link } from "react-router-dom";
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import { useTranslation } from "react-i18next";
import useFetchData from "../../../../hooks/fetchData";

export default function Footer() {
  const { t } = useTranslation();
  const {data, loading} = useFetchData('socials')
  return (
    <footer className="footer-section-wrapper bg-[#13171a] py-4">
      <div className="container-x mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Accounts */}
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/rovancafe/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Instagram className="fill-current h-5 w-5" />
            </a>
          </div>

          {/* Copyright and Powered By */}
          <div className="flex flex-col items-center md:flex-row gap-2 text-sm text-gray-400">
            <span>© {new Date().getFullYear()} {t("All rights reserved")}</span>
            <span className="hidden md:block">|</span>
            <a
              href="https://api.whatsapp.com/send?phone=+970595324689&text=I%20want%20a%20website%20like%20this%20https%3A%2F%2Favocado.ps%2F"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Powered By Perfect Co
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}