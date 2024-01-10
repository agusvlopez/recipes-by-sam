import { Title } from "../components/Title";
import coverContact from "../covers/contact.jpg";

export default function Contact() {
    return (
        <>
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold mb-4">Contact</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                        <p className="text-gray-700 mb-4">
                            We are delighted to hear from you! You can reach out to us through the following means:
                        </p>

                        {/* Contact Details */}
                        <ul className="list-disc ml-4">
                            <li>Email: example@example.com</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Address: 123 Main Street, City</li>
                        </ul>
                    </div>

                    {/* Contact Form */}
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
                                type="submit"
                                className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}