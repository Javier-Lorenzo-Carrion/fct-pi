import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-black text-white p-4 shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center relative">
                <div className="absolute top-4 right-4 flex gap-4">
                    <button>
                        <img
                            src="/images/es.png"
                            alt="Español"
                            className="w-8 h-8 cursor-pointer"
                            title="Español"
                        />
                    </button>
                    <button>
                        <img
                            src="/images/en.png"
                            alt="English"
                            className="w-8 h-8 cursor-pointer"
                            title="English"
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
}