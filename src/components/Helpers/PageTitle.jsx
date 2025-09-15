import BreadcrumbCom from "../BreadcrumbCom";
import eyeliner3 from "../../../public/assets/images/eyeliner3.png";
import eyeliner2 from "../../../public/assets/images/eyeliner2.png";
import eyeliner from "../../../public/assets/images/eyeliner.avif";
import lipstick from "../../../public/assets/images/lipstick.webp";
import foundation from "../../../public/assets/images/foundation3.webp";

export default function PageTitle({ title, breadcrumb = [], solid = false }) {
  return (
    <div className="page-title-wrapper relative w-full h-[150px] py-4 overflow-hidden">
      {!solid && (
        <>
          {/* <img src={eyeliner3} className="absolute md:hidden" style={{ top: -50, left: 165,transform:"rotate(340deg)", width: '16rem'}} /> */}
          <img
            src={lipstick}
            className="absolute"
            style={{ top: -145, left: -60 }}
          />
          {/* <img src={eyeliner} className="absolute md:hidden" style={{ top: -35, right: '-4rem',transform: 'rotateY(180deg)', width: '14rem'  }} /> */}
          {/* <img src={eyeliner2} className="absolute" style={{ top: -105, right: '32%',transform: 'rotate(80deg)', width: '23rem'  }} /> */}
          <img
            src={foundation}
            className="absolute md:w-[12rem] xl:w-[16rem] w-[12rem]"
            style={{ top: -60, right: "3%", transform: "rotate(310deg)" }}
          />
        </>
      )}
      {solid ? (
        <div className="container-x mx-auto relative z-10">
          <div className="mb-4">
            <BreadcrumbCom paths={breadcrumb} />
          </div>
          <div className="flex justify-start items-center">
            <h1 className="text-3xl font-semibold text-qgray mb-2 tracking-wide">
              {title}
            </h1>
          </div>
        </div>
      ) : (
        <div className="container-x mx-auto relative z-10">
          <div className="mb-4">
            <BreadcrumbCom paths={breadcrumb} />
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-semibold text-qblack mb-2 tracking-wide">
              {title}
            </h1>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-white/30 blur-lg"></div>
    </div>
  );
}
