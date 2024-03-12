import { Title } from "../components/Title";
import About from "../components/About";

export default function AboutPage() {

    return (
        <>
            <section className="container max-w-5xl mx-auto mt-6 mb-6 p-4 gap-8 h-full md:h-screen">
                <div className="w-[50%]">
                    <h1 className="pl-6 pt-6 uppercase section-about--title">About Us</h1>
                    <h2 className="pl-6 pt-2 text-4xl font-bold section-about--subtitle">The Beginning Of Your Healthy Lifestyle</h2>
                </div>
                <About />
                {/* <img src={coverAbout} alt="Girl and boy cooking." className="rounded-lg" /> */}
            </section>
        </>
    )
}