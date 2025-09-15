import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import AllProductPage from "./components/AllProductPage";
import Login from "./components/Auth/Login/index";
import Profile from "./components/Auth/Profile";
import Signup from "./components/Auth/Signup";
import BecomeSaller from "./components/BecomeSaller";
import Blogs from "./components/Blogs";
import Blog from "./components/Blogs/Blog.jsx";
import CardPage from "./components/CartPage";
import CheakoutPage from "./components/CheakoutPage";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import FlashSale from "./components/FlashSale";
import FourZeroFour from "./components/FourZeroFour";
import Home from "./components/Home";
import HomeTwo from "./components/HomeTwo";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ProductsCompaire from "./components/ProductsCompaire/index";
import SallerPage from "./components/SallerPage";
import Sallers from "./components/Sellers";
import SingleProductPage from "./components/SingleProductPage";
import TermsCondition from "./components/TermsCondition/index";
import TrackingOrder from "./components/TrackingOrder";
import Wishlist from "./components/Wishlist";
import HomeThree from "./components/HomeThree";
import HomeFour from "./components/HomeFour";
import HomeFive from "./components/HomeFive";
import HomePage from "./views/HomePage.jsx";
import AllCategoryPage from "./components/AllCategoryPage/index.jsx";
import BestSellerProduct from "./components/BestSellerProduct/index.jsx";
import LatestProducts from "./components/LatestProducts/index.jsx";
import SearchProductPage from "./components/SearchProduct/index.jsx";
import AllBrandsPage from "./components/AllBrandsPage/index.jsx";
import SubCategoriesPage from "./components/SubCategoriesPage/index.jsx";
import ProductsPage from "./components/products/ProductsPage.jsx";
import Offers from "./components/OfferPage/index.jsx";
import ProfilePage from "./components/profile/profile.jsx";
import LoginPage from "./components/Login/login.jsx";
export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/home-screen" element={<HomePage />} />
      
    </Routes>
  );
}
