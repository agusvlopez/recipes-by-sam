import { Link } from "react-router-dom";
import coverAbout from '../covers/about.jpg';
import coverAbout2 from '../covers/about-2.jpg';
import coverAbout3 from '../covers/about-3.jpg';

export default function About() {
    return (
        <>
            <div id="about" className="p-2 section-about md:flex md:gap-6">
                <div className="section-about--text text-gray-600">
                    <p className="mb-4 pt-2">
                        Welcome to our <strong>recipe website</strong>! We are passionate about cooking and
                        sharing delicious recipes with food enthusiasts like you.
                    </p>

                    <p className="mb-4">
                        Our goal is to provide a <strong>variety of recipes</strong> that cater to different
                        tastes and <strong>dietary</strong> preferences. Whether you're a seasoned <strong>chef</strong> or just
                        <strong> starting in the kitchen</strong>, you'll find something inspiring here.
                    </p>

                    <p className="mb-4">
                        Feel free to explore our <strong>collection of recipes</strong>, and don't hesitate to
                        reach out if you have any questions or suggestions. Happy cooking!
                    </p>
                    <div className="pt-4">
                        <Link to="/contact">
                            <button className="section-about--button">Contact Us</button>
                        </Link>
                    </div>
                </div>
                <div class="section-about--images">
                    <div class="images-container">
                        <img src={coverAbout} alt="A girl and a boy cooking." class="image-3" />
                    </div>
                    <div class="images-container">
                        <img src={coverAbout2} alt="Two girls cooking." class="image-2" />
                    </div>
                    <div class="images-container">
                        <img src={coverAbout3} alt="A woman cooking." class="image-1" />
                    </div>
                </div>
            </div>
        </>
    )
}