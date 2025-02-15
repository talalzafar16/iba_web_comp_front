// @ts-expect-error hj jh
export default function TimelineEvent({ year, title, text }) {
    return (
      <div className="border-l-4 border-red-500 pl-6 py-4">
        <h3 className="text-xl font-semibold text-red-400">{year} - {title}</h3>
        <p className="text-gray-400">{text}</p>
      </div>
    );
  }