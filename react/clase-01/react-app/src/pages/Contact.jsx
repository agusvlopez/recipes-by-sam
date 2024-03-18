import { Title } from "../components/Title";

export default function Contact() {
    return (
        <>
            <div className="container mx-auto mt-6 p-4 py-12 mb-6">
                <Title>Contact</Title>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                        <p className="text-gray-700 mb-4">
                            We are delighted to hear from you! You can reach out to us through the following means:
                        </p>

                        <ul className="list-disc ml-4">
                            <li>Email: example@example.com</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Address: 123 Main Street, City</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-2">Send Us a Message</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                                    Message:
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="w-full p-2 border rounded-md"
                                ></textarea>
                            </div>

                            <button
                                className="section-contact--button mt-2 text-white p-2"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}