import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Hero.css';
// import { data } from "./data";
import { BiRightArrow } from 'react-icons/bi'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
// import { ArrowBackIos, ArrowForwardIos } '@mui/icons-material';
var data = [

    {
        imgsrc: 'https://img.freepik.com/free-psd/online-shopping-banner-template_23-2148582752.jpg?size=626&ext=jpg&ga=GA1.2.1184991725.1675923171&semt=ais'
    },
    {
        imgsrc: 'https://img.freepik.com/free-psd/banner-template-with-online-shopping_23-2148545455.jpg?size=626&ext=jpg&ga=GA1.2.1184991725.1675923171&semt=ais'
    },
    {
        imgsrc: 'https://img.freepik.com/free-photo/woman-holding-various-shopping-bags-copy-space_23-2148674122.jpg?size=626&ext=jpg&ga=GA1.1.1184991725.1675923171&semt=ais'
    }
]
const PreviousBtn = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <AiFillCaretLeft style={{ color: "blue", fontSize: "30px" }} />
        </div>
    );
};
const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <AiFillCaretRight style={{ color: "blue", fontSize: "30px" }} />
        </div>
    );
};

const Hero = () => {
    return (
        <div style={{}} className="carousel">
            {/* <h1>Basic carousel</h1> */}
            <Slider
                autoplay
                autoplaySpeed={2000}
                // dots
                initialSlide={2}
                infinite
                prevArrow={<PreviousBtn />}
                nextArrow={<NextBtn />}
                customPaging={(i) => {
                    return (
                        <div>
                            <img
                                src={data.imgsrc[i]}
                                alt=""
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                    );
                }}
                dotsClass="slick-dots custom-indicator"
            >
                {data.map((item) => (
                    <div >
                        <img src={item.imgsrc} alt="" style={{ width: "100%", height: "50vh" }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Hero;