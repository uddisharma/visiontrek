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
        imgsrc: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    },
    {
        imgsrc: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    },
    {
        imgsrc: 'https://images.unsplash.com/photo-1565523925028-812f891b0e8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
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
        <div style={{ margin: "30px" }} className="carousel">
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
                        <img src={item.imgsrc} alt="" style={{ width: "100%", height: "70vh" }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Hero;