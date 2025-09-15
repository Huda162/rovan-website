export default function CategoryHeader({ title, image }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full h-[300px] md:h-[500px]  md:w-[80vw] rounded-xl overflow-hidden shadow-md ">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide uppercase drop-shadow-md">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
