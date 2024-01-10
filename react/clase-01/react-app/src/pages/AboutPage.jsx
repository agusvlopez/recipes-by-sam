import { Title } from "../components/Title";
import coverAbout from '../covers/about.jpg';

export default function AboutPage() {
    return (
        <>
            <section className="flex container mx-auto mt-8 p-4 pt-6">
                <div>
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
                <div className=''>
                    <img src={coverAbout} alt="" className='' />
                </div>
            </section>
        </>
    )
}