function AddOnCard({ item, isSelected, onclick, className="" }) {
  const lang = localStorage.getItem("i18nextLng") || "en";

  const getName = () => {
    if (lang === "ar") return item.name_ar;
    if (lang === "he") return item.name_he;
    return item.name_en;
  };

  return (
    <div className="flex flex-col items-center w-18 sm:w-25 text-center" onClick={onclick}>
      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${isSelected ? 'bg-secondary-color' : 'bg-gray-600'} rounded-full p-1 mb-2 shadow`}>
        <div className="w-full h-full bg-[#1a1a1a] rounded-full overflow-hidden">
          <img
            src={item.image}
            alt={getName()}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className={`${className} text-xs sm:text-sm leading-tight mb-1`}>
        {getName()}
      </div>
      <div className="text-secondary-color text-xs font-bold">
        {item?.price_jod && item?.price_jod > 0 && <>{item?.price_jod} +</>}
      </div>
    </div>
  );
}

export default AddOnCard;
