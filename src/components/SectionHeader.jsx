export default function SectionHeader({ title = 'تصفح بواسطة الأقسام' }) {
    return (
      <div className="w-full text-center my-10">
        <h2 className="text-black text-2xl sm:text-3xl font-bold tracking-wider relative inline-block">
          {title}
          <span className="block w-16 h-[2px] bg-secondary-color mx-auto mt-2"></span>
        </h2>
      </div>
    );
  }
  