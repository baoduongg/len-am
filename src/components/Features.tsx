"use client";

import Image from "next/image";

export default function Features() {
  const products = [
    {
      id: "merino",
      tag: "100% Merino",
      title: "Len Merino (Xanh Sage)",
      price: "145.000đ",
      image: "/product-merino.png",
      isActive: false,
    },
    {
      id: "cotton",
      tag: "Premium Cotton",
      title: "Len Cotton (Vàng Mật)",
      price: "95.000đ",
      image: "/product-cotton.png",
      isActive: true, // Hovered state in design
    },
    {
      id: "wool",
      tag: "Lông Cừu Tự Nhiên",
      title: "Len Lông Cừu (Hồng Đất)",
      price: "189.000đ",
      image: "/product-wool.png",
      isActive: false,
    },
  ];

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-transparent">
      {/* Anchor for Yarn Thread curve to flow through the top-left of the section */}
      <div 
        data-yarn-anchor 
        className="absolute top-0 left-[20%] w-5 h-5 pointer-events-none opacity-0" 
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8C3E30] tracking-tight mb-4">
            Sản phẩm nổi bật
          </h2>
          <div className="w-16 h-1 bg-[#A24B3C] rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Anchor for Yarn Thread to cross behind the middle card */}
          <div 
            data-yarn-anchor 
            className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none opacity-0 z-0" 
          />

          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-3xl p-6 border transition-all duration-500 bg-white flex flex-col items-center text-center relative z-10 ${
                product.isActive
                  ? "border-[#A24B3C]/30 shadow-xl shadow-[#A24B3C]/5 scale-103 md:-translate-y-2"
                  : "border-[#F1E3D8] shadow-sm hover:border-[#A24B3C]/20 hover:shadow-md hover:scale-101"
              }`}
            >
              {/* Product Image Container */}
              <div className="relative w-44 h-44 rounded-full overflow-hidden mb-6 border-4 border-[#FCF6F2] shadow-inner bg-[#FCF6F2] group">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-108"
                  sizes="176px"
                />
              </div>

              {/* Tag Badge */}
              <span className="text-xs font-semibold text-[#8C3E30] bg-[#E7B8AC]/25 px-3 py-1 rounded-full mb-4 inline-block tracking-wide">
                {product.tag}
              </span>

              {/* Product Title */}
              <h3 className="text-lg font-bold text-[#3C2E24] tracking-tight mb-2 min-h-12 flex items-center justify-center">
                {product.title}
              </h3>

              {/* Price */}
              <p className="text-base font-semibold text-[#8C3E30] mb-6">
                {product.price}
              </p>

              {/* Action Button */}
              <button
                className={`w-full py-3 rounded-2xl text-sm font-medium transition-all duration-300 active:scale-[0.97] ${
                  product.isActive
                    ? "bg-[#8C3E30] text-white hover:bg-[#733328] shadow-md shadow-[#8C3E30]/10"
                    : "bg-[#F7EFE9] text-[#7A5C4A] hover:bg-[#8C3E30] hover:text-white"
                }`}
              >
                Mua ngay
              </button>
            </div>
          ))}
        </div>
        
        {/* Anchor for Yarn Thread curve to flow to the bottom-left of the section */}
        <div 
          data-yarn-anchor 
          className="w-10 h-10 mt-16 pointer-events-none opacity-0" 
        />

      </div>
    </section>
  );
}
