export default function SubsectionHeader({ title }) {
    return (
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-b border-gray-600"></div>
        <span className="px-4 text-md font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
          {title}
        </span>
        <div className="flex-grow border-t border-b border-gray-600"></div>
      </div>
    );
  }
  