const features = [
  { iconClass: "fa-solid fa-truck", title: "Free Shipping", subtitle: "On orders over 500 EGP", color: "text-blue-500", bg: "bg-blue-50" },
  { iconClass: "fa-solid fa-shield-halved", title: "Secure Payment", subtitle: "100% secure transactions", color: "text-emerald-600", bg: "bg-emerald-50" },
  { iconClass: "fa-solid fa-arrow-rotate-right fa-flip-horizontal", title: "Easy Returns", subtitle: "14 day return policy", color: "text-orange-500", bg: "bg-orange-50" },
  { iconClass: "fa-solid fa-headset", title: "24/7 Support", subtitle: "Dedicated support team", color: "text-purple-500", bg: "bg-purple-50" },
];

export default function FeaturesBanner() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {features.map(({ iconClass, title, subtitle, color, bg }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className={`${bg} ${color} p-3 rounded-full shrink-0`}>
                <i className={`${iconClass} text-base ${color}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
