import { React } from "react";
import ProductCard from "@/components/details/productCard";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const productCarrousel = ({ cards }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-6 relative flex gap-4 flex-wrap">
      {cards.map((card) => (
        <ProductCard
        key={card.id}
        image={card.image?card.image:"/images/coffee.png"}
        Label={card.label}
        quantity={card.quantite}
        />
      ))}
    </div>
  );
};
export default productCarrousel;
