import Slider from "react-slick";
import { Paper } from "@mui/material";

import Carouse1 from "../Images/Carouse1.jpg";
import Carouse2 from "../Images/Carouse2.jpg";
import Carouse3 from "../Images/Carouse3.jpg";
import Carouse4 from "../Images/Carouse4.jpg";
import Carouse5 from "../Images/Carouse5.jpg";
import testimonialPhoto from "../Images/testimonialPhoto.jpg";

//Slider arrow
const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        fontSize: "40px",
        display: "block",
        right: "5%",
        zIndex: "15",
        height: "40px",
        width: "40px",
        opacity: "1",
        color: "White",
      }}
      onClick={onClick}
    />
  );
};
const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        fontSize: "40px",
        display: "block",
        left: "5%",
        zIndex: "15",
        height: "40px",
        width: "40px",
        opacity: "1",
        color: "White",
      }}
      onClick={onClick}
    />
  );
};
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const Items = [
  {
    name: "Gloria Hunt",
    img: Carouse1,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.!",
  },
  {
    name: "Leigh Hopkins",
    img: Carouse2,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.",
  },
  {
    name: "Victoria Barber",
    img: Carouse3,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.",
  },
  {
    name: "Jon Erickson",
    img: Carouse4,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.",
  },
  {
    name: "Pat Walton",
    img: Carouse5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.",
  },
];
function Testimonial() {
  return (
    <div className="w-full pt-20 min-h-screen">
      <div className="bg-silver p-2">
        <p className="text-3xl text-purple text-center pt-3">
          What our clients say
        </p>
        <Slider {...settings}>
          {Items.map((item) => {
            return (
              <div className="">
                <Paper elevation={5} className="p-5 m-3">
                  <img
                    className="Carouselpic m-auto"
                    src={item.img}
                    alt="carouselPic"
                  />
                  <p className="text-lg font-semibold text-center lg:py-5">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray">{item.description}</p>
                </Paper>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="bg-silver">
        <img
          className="w-full"
          style={{
            maxHeight: "650px",
          }}
          src={testimonialPhoto}
          alt="pic"
        />
      </div>
    </div>
  );
}

export default Testimonial;
