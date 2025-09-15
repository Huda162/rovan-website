import CategoryHeader from "./CategoryHeader";
import DataIteration from "../Helpers/DataIteration";
import ProductCardStyleThree from "../Helpers/Cards/ProductCardStyleThree";
import SubsectionHeader from "./SubsectionHeader";
import { useTranslation } from "react-i18next";
import AddOnCard from "./AddOnsCard";
import { forwardRef } from "react";

const SingleCategorySection = forwardRef(({ categoryProducts, id }, ref) => {
  const { t, i18n } = useTranslation();
  return (
    <section className="w-full scroll-mt-20" id={id} ref={ref}>
      <CategoryHeader
        title={
          i18n.language === "ar"
            ? categoryProducts?.name_ar
            : categoryProducts?.name_en
        }
        image={categoryProducts?.image}
      />
      <div className="flex items-center justify-center w-full mt-5">
        <div className=" xl:w-[80vw] grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5 px-1">
          <DataIteration
            datas={categoryProducts?.products}
            startLength={0}
            endLength={categoryProducts?.products?.length}
          >
            {({ datas }) => (
              <div data-aos="fade-up" key={datas.id}>
                <ProductCardStyleThree datas={datas} />
              </div>
            )}
          </DataIteration>
        </div>
      </div>
      {categoryProducts?.additions?.length > 0 && (
        <>
          <SubsectionHeader title={t("add-ons")} />
          <div className="flex items-center justify-center w-full">
          <div className="xl:w-[80vw] grid grid-cols-6 gap-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-y-2 sm:gap-5 xl:gap-[30px] px-0">
          <DataIteration
                datas={categoryProducts?.additions}
                startLength={0}
                endLength={categoryProducts?.additions?.length}
              >
                {({ datas }) => (
                  <div data-aos="fade-up" key={datas.id}>
                    <AddOnCard item={datas} isSelected={true}  className="text-gray-600 font-semibold"/>
                  </div>
                )}
              </DataIteration>
            </div>
          </div>
        </>
      )}
      {categoryProducts?.flavors?.length > 0 && (
        <>
          <SubsectionHeader title={t("flavors")} />
          <div className="flex items-center justify-center w-full">
          <div className="xl:w-[80vw] grid grid-cols-6 gap-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-y-2 sm:gap-5 xl:gap-[30px] px-0">
          <DataIteration
                datas={categoryProducts?.flavors}
                startLength={0}
                endLength={categoryProducts?.flavors?.length}
              >
                {({ datas }) => (
                  <div data-aos="fade-up" key={datas.id}>
                    <AddOnCard item={datas} isSelected={true} className="text-gray-600 font-semibold"/>
                  </div>
                )}
              </DataIteration>
            </div>
          </div>
        </>
      )}
      <br />
      <br />
    </section>
  );
});

export default SingleCategorySection;
