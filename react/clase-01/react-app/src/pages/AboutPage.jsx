import { Title } from "../components/Title";
import coverAbout from '../covers/about.jpg';
import coverAbout2 from '../covers/about-2.jpg';
import coverAbout3 from '../covers/about-3.jpg';
export default function AboutPage() {
    return (
        <>
            <section className="container max-w-5xl mx-auto mt-6 mb-6 p-4 pt-6 gap-8 h-full md:h-screen">
                <div id="about" className="p-2 section-about md:flex md:gap-6">
                    <div className="section-about--text">
                        <Title className="text-3xl font-bold mb-4">About Us</Title>

                        <p className="text-gray-700 mb-4">
                            Welcome to our recipe website! We are passionate about cooking and
                            sharing delicious recipes with food enthusiasts like you.
                        </p>

                        <p className="text-gray-700 mb-4">
                            Our goal is to provide a variety of recipes that cater to different
                            tastes and dietary preferences. Whether you're a seasoned chef or just
                            starting in the kitchen, you'll find something inspiring here.
                        </p>

                        <p className="text-gray-700 mb-4">
                            Feel free to explore our collection of recipes, and don't hesitate to
                            reach out if you have any questions or suggestions. Happy cooking!
                        </p>
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
                {/* <img src={coverAbout} alt="Girl and boy cooking." className="rounded-lg" /> */}
            </section>
        </>
    )
}