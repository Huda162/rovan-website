import CategoriesSection from "../components/HomeTwo/CategoriesSection";
import LayoutHomeTwo from "../components/Partials/LayoutHomeTwo";
import datas from "../data/products.json";
import useFetchData from "../hooks/fetchData";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import waffle from "../../public/assets/images/waffle.jpg";
import crepe from "../../public/assets/images/crepe.jpg";
import pancake from "../../public/assets/images/pancake.jpg";
import oreo from "../../public/assets/images/oreo.jpg";
import snickers from "../../public/assets/images/snickers.jpg";
import grape from "../../public/assets/images/grapes.jpg";
import strawberry from "../../public/assets/images/strawberry.jpg";
import lemon from "../../public/assets/images/lemon.jpg";
import kitkat from "../../public/assets/images/kitkat.png";
import SectionHeader from "../components/SectionHeader";
import CategoryHeader from "../components/HomeTwo/CategoryHeader";
import SingleCategorySection from "../components/HomeTwo/SingleCategorySection";
import { useRef } from "react";
const categories = [
  { id: 1, name_ar: "وافل", name_en: "waffle", name_he: "", image: waffle },
  { id: 2, name_ar: "كريب", name_en: "crepe", name_he: "", image: crepe },
  { id: 3, name_ar: "بانكيك", name_en: "pancake", name_he: "", image: pancake },
  { id: 4, name_ar: "وافل", name_en: "waffle", name_he: "", image: waffle },
  { id: 5, name_ar: "كريب", name_en: "crepe", name_he: "", image: crepe },
  { id: 6, name_ar: "بانكيك", name_en: "pancake", name_he: "", image: pancake },
];

const categoriesProducts = [
  {
    category: {
      id: 1,
      name_ar: "وافل",
      name_en: "waffle",
      name_he: "",
      image: waffle,
    },
    flavors: [
      {
        name_ar: "ليمون",
        name_en: "lemon",
        name_he: "",
        images: [{ url: lemon }],
        price_jod: 0.5,
      },
      {
        name_ar: "فراولة",
        name_en: "strawberry",
        name_he: "",
        images: [{ url: strawberry }],
        price_jod: 0.5,
      },
      {
        name_ar: "عنب",
        name_en: "grape",
        name_he: "",
        images: [{ url: grape }],
        price_jod: 0.5,
      },
    ],
    add_ons: [
      {
        name_ar: "سنكرز",
        name_en: "snickers",
        name_he: "",
        images: [{ url: snickers }],
        price_jod: 1,
      },
      {
        name_ar: "كتكات",
        name_en: "kitkat",
        name_he: "",
        images: [{ url: kitkat }],
        price_jod: 0.5,
      },
      {
        name_ar: "اوريو",
        name_en: "snickers",
        name_he: "",
        images: [{ url: oreo }],
        price_jod: 1.5,
      },
      {
        name_ar: "سنكرز",
        name_en: "snickers",
        name_he: "",
        images: [{ url: snickers }],
        price_jod: 3,
      },
      {
        name_ar: "كتكات",
        name_en: "kitkat",
        name_he: "",
        images: [{ url: kitkat }],
        price_jod: 3,
      },
      {
        name_ar: "اوريو",
        name_en: "snickers",
        name_he: "",
        images: [{ url: oreo }],
        price_jod: 3,
      },
    ],
    products: [
      {
        name_ar: "وافل",
        name_en: "waffle",
        name_he: "",
        images: [{ url: waffle }],
        price_jod: 3,
        description_ar: "وافل مغطى بالشوكولاتة",
        description_en: "Waffle covered with chocolate",
        product_sizes: [],
      },
      {
        name_ar: "وافل",
        name_en: "waffle",
        name_he: "",
        images: [{ url: waffle }],
        price_jod: 3,
        description_ar: "وافل مغطى بالشوكولاتة",
        description_en: "Waffle covered with chocolate",
        product_sizes: [
          { size: "عادي", size_price_jod: "3" },
          { size: "كبير", size_price_jod: "3.5" },
        ],
      },
      {
        name_ar: "وافل",
        name_en: "waffle",
        name_he: "",
        images: [{ url: waffle }],
        price_jod: 3,
        description_ar: "وافل مغطى بالشوكولاتة",
        description_en: "Waffle covered with chocolate",
        product_sizes: [],
      },
      {
        name_ar: "وافل",
        name_en: "waffle",
        name_he: "",
        images: [{ url: waffle }],
        price_jod: 3,
        description_ar: "وافل مغطى بالشوكولاتة",
        description_en: "Waffle covered with chocolate",
        product_sizes: [],
      },
      {
        name_ar: "وافل",
        name_en: "waffle",
        name_he: "",
        images: [{ url: waffle }],
        price_jod: 3,
        description_ar: "وافل مغطى بالشوكولاتة",
        description_en: "Waffle covered with chocolate",
        product_sizes: [],
      },
      {
        name_ar: "وافل",
        name_en: "waffle",
        name_he: "",
        images: [{ url: waffle }],
        price_jod: 3,
        description_ar: "وافل مغطى بالشوكولاتة",
        description_en: "Waffle covered with chocolate",
        product_sizes: [],
      },
    ],
  },
  {
    category: {
      id: 3,
      name_ar: "بانكيك",
      name_en: "pancake",
      name_he: "",
      image: pancake,
    },
    add_ons: [
      {
        name_ar: "سنكرز",
        name_en: "snickers",
        name_he: "",
        images: [{ url: snickers }],
        price_jod: 1,
      },
      {
        name_ar: "كتكات",
        name_en: "kitkat",
        name_he: "",
        images: [{ url: kitkat }],
        price_jod: 0.5,
      },
      {
        name_ar: "اوريو",
        name_en: "snickers",
        name_he: "",
        images: [{ url: oreo }],
        price_jod: 1.5,
      },
      {
        name_ar: "سنكرز",
        name_en: "snickers",
        name_he: "",
        images: [{ url: snickers }],
        price_jod: null,
      },
      {
        name_ar: "كتكات",
        name_en: "kitkat",
        name_he: "",
        images: [{ url: kitkat }],
        price_jod: 3,
      },
      {
        name_ar: "اوريو",
        name_en: "snickers",
        name_he: "",
        images: [{ url: oreo }],
        price_jod: 3,
      },
      {
        name_ar: "سنكرز",
        name_en: "snickers",
        name_he: "",
        images: [{ url: snickers }],
        price_jod: null,
      },
      {
        name_ar: "كتكات",
        name_en: "kitkat",
        name_he: "",
        images: [{ url: kitkat }],
        price_jod: 3,
      },
      {
        name_ar: "اوريو",
        name_en: "snickers",
        name_he: "",
        images: [{ url: oreo }],
        price_jod: 3,
      },
      {
        name_ar: "سنكرز",
        name_en: "snickers",
        name_he: "",
        images: [{ url: snickers }],
        price_jod: null,
      },
      {
        name_ar: "كتكات",
        name_en: "kitkat",
        name_he: "",
        images: [{ url: kitkat }],
        price_jod: 3,
      },
      {
        name_ar: "اوريو",
        name_en: "snickers",
        name_he: "",
        images: [{ url: oreo }],
        price_jod: 3,
      },
      {
        name_ar: "سنكرز",
        name_en: "snickers",
        name_he: "",
        images: [{ url: snickers }],
        price_jod: null,
      },
      {
        name_ar: "كتكات",
        name_en: "kitkat",
        name_he: "",
        images: [{ url: kitkat }],
        price_jod: 3,
      },
      {
        name_ar: "اوريو",
        name_en: "snickers",
        name_he: "",
        images: [{ url: oreo }],
        price_jod: 3,
      },
    ],
    products: [
      {
        name_ar: "بانكيك",
        name_en: "pancake",
        name_he: "",
        images: [{ url: pancake }],
        price_jod: 3,
        description_ar: "بانكيك مغطى بالشوكولاتة",
        description_en: "Pancake covered with chocolate",
        product_sizes: [
          { size: "1 قطعة", size_price_jod: "3" },
          { size: "2 قطعة", size_price_jod: "3.5" },
          { size: "3 قطعة", size_price_jod: "4" },
        ],
      },
      {
        name_ar: "بانكيك",
        name_en: "pancake",
        name_he: "",
        images: [{ url: pancake }],
        price_jod: 3,
        description_ar: "بانكيك مغطى بالشوكولاتة",
        description_en: "Pancake covered with chocolate",
        product_sizes: [
          { size: "1 قطعة", size_price_jod: "3" },
          { size: "2 قطعة", size_price_jod: "3.5" },
          { size: "3 قطعة", size_price_jod: "4" },
        ],
      },
      {
        name_ar: "بانكيك",
        name_en: "pancake",
        name_he: "",
        images: [{ url: pancake }],
        price_jod: 3,
        description_ar: "بانكيك مغطى بالشوكولاتة",
        description_en: "Pancake covered with chocolate",
        product_sizes: [
          { size: "1 قطعة", size_price_jod: "3" },
          { size: "2 قطعة", size_price_jod: "3.5" },
          { size: "3 قطعة", size_price_jod: "4" },
        ],
      },
      {
        name_ar: "بانكيك",
        name_en: "pancake",
        name_he: "",
        images: [{ url: pancake }],
        price_jod: 3,
        description_ar: "بانكيك مغطى بالشوكولاتة",
        description_en: "Pancake covered with chocolate",
        product_sizes: [
          { size: "1 قطعة", size_price_jod: "3" },
          { size: "2 قطعة", size_price_jod: "3.5" },
          { size: "3 قطعة", size_price_jod: "4" },
        ],
      },
      {
        name_ar: "بانكيك",
        name_en: "pancake",
        name_he: "",
        images: [{ url: pancake }],
        price_jod: 3,
        description_ar: "بانكيك مغطى بالشوكولاتة",
        description_en: "Pancake covered with chocolate",
        product_sizes: [
          { size: "1 قطعة", size_price_jod: "3" },
          { size: "2 قطعة", size_price_jod: "3.5" },
          { size: "3 قطعة", size_price_jod: "4" },
        ],
      },
      {
        name_ar: "بانكيك",
        name_en: "chocolate classic pancake",
        name_he: "",
        images: [{ url: pancake }],
        price_jod: 3,
        description_ar: "بانكيك مغطى بالشوكولاتة",
        description_en: "Pancake covered with chocolate",
        product_sizes: [
          { size: "1 قطعة", size_price_jod: "3" },
          { size: "2 قطعة", size_price_jod: "3.5" },
          { size: "3 قطعة", size_price_jod: "4" },
        ],
      },
    ],
  },
];
const HomePage = () => {
  const url = "homepage";
  const { data, loading } = useFetchData(url);
  const categoryRefs = useRef({});
  const cart = useSelector((state) => state.cart.value);
  const { t } = useTranslation();
  // console.log(data?.banners?.[2], '');
  const lang = localStorage.getItem("i18nextLng");
  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };
  const sectionRefs = useRef({});

  const handleScrollTo = (id) => {
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <LayoutHomeTwo>
      {loading ? (
        <div style={{ height: "100vh" }}>
          <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-main-color rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-main-color rounded-full animate-bounce [animation-delay:-0.1s]"></div>
            <div className="h-8 w-8 bg-main-color rounded-full animate-bounce"></div>
          </div>{" "}
        </div>
      ) : (
        <div className="pt-1">
          <SectionHeader title={t("look by category")} />
          <CategoriesSection
            categories={data?.categories}
            handleClick={handleScrollTo}
          />
          <SectionHeader title={t("full menu")} />
          {data?.categories?.map((item) => (
            <SingleCategorySection
              key={item.id}
              categoryProducts={item}
              id={item.id}
              ref={setSectionRef(item.id)}
            />
          ))}
        </div>
      )}
    </LayoutHomeTwo>
  );
};

export default HomePage;
