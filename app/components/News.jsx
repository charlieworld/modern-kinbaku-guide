
import newsData from "../utils/NewsData";

export default function News() {
  return (
    <div className="w-full">
      <ul className="space-y-4">
        {newsData.map((news) => (
          <li key={news.id} className="border-b p-4">
            <h3 className="text-xl font-semibold">{news.title}</h3>
            <p className="text-gray-500 text-sm">{news.date}</p>
            <div className="flex space-x-2 mt-4">
              {news.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={news.title ? `${news.title} - ${index + 1}` : `News ${index + 1}`}
                  className="w-1/2 object-contain rounded bg-slate-100"
                />
              ))}
            </div>
            <p  className="mt-4">{news.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}