import {MainHeroHeader} from "../components/HeroHeaders/MainHeroHeader/MainHeroHeader.tsx";
import MainHeroDescription from "../components/HeroHeaders/MainHeroDescription/MainHeroDescription.tsx";
import Gallary from "../components/Gallary/Gallary.tsx";
import {Carousel} from "@mantine/carousel";


const Home = () => {
    return (
        <div style={{marginLeft:'5rem', }}>
            <Carousel
                controlSize={40}
                withIndicators
                breakpoints={[{ maxWidth: 'sm', slideSize: '100%'}]}
                slideGap="xl"
                align="start"
                loop
            >
                <Carousel.Slide>
                    <MainHeroHeader/>
                </Carousel.Slide>
                <Carousel.Slide>
                    <MainHeroDescription/>
                </Carousel.Slide>
                <Carousel.Slide>
                    <Gallary/>
                </Carousel.Slide>
            </Carousel>


        </div>
    );
};

export default Home;