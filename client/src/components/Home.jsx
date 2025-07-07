import {useRef,useEffect,useState} from 'react'
import Navbar from './Navbar'
import AnimateInfo from './AnimateInfo'
import HeroSection from './HeroSection'
import GuidePage from './GuidePage'
import Review from './Review'
import Footer from './Footer'
import EndFoot from './EndFoot'


export default function Home (){
    const guideRef = useRef(null);
    const reviewRef = useRef(null);
    const helpRef = useRef(null);

  const [refsReady, setRefsReady] = useState(false);

  useEffect(() => {
    setRefsReady(true);
  }, []);

    return (
        <div>
            <Navbar
            scrollToGuide={() =>
          refsReady && guideRef.current?.scrollIntoView({ behavior: "smooth" })
        }
            scrollToReview={() =>
          refsReady && reviewRef.current?.scrollIntoView({ behavior: "smooth" })
        }
            scrollToHelp={() =>
          refsReady && helpRef.current?.scrollIntoView({ behavior: "smooth" })
        }
            />

            <AnimateInfo/>
            
            <HeroSection/>

            <div ref={guideRef}>
            <GuidePage />
            </div>

            <div ref={reviewRef}>
            <Review />
            </div>

            <div ref={helpRef}>
            <Footer />
            </div>

            <EndFoot/>
        </div>
    )
}