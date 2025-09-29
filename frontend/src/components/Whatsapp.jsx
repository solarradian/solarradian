import { useState } from "react";
import { FaWhatsapp } from 'react-icons/fa'
const Whatsapp = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Box */}
            {open && (
                <div className="w-72 bg-white shadow-xl rounded-xl p-4 border border-gray-200 mb-3">
                    <div className="flex items-center mb-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            alt="WhatsApp"
                            className="w-6 h-6 mr-2"
                        />
                        <span className="font-semibold text-gray-800">
                            Chat with us on WhatsApp
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                        Hi there! How can we help you today?
                    </p>
                    <a
                        href="https://wa.me/919220337642?text=Hi%2C%20I%20need%20some%20help"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Start Chat
                    </a>
                </div>
            )}

            {/* Floating WhatsApp Button */}


            <button
                onClick={() => setOpen(!open)}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center"
            >
                <FaWhatsapp  size={35} />
            </button>

        </div>
    );
};

export default Whatsapp;
