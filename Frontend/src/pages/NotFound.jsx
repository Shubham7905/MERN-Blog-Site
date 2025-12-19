import doggy from "../assets/doggy.svg";

export default function NotFound() {
    return (
        <div
            className="h-[calc(100vh-72px)] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x divide-y sm:divide-y-0 divide-gray-400 px-4">

            <div className="text-center sm:text-right sm:pr-6">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-400">
                    404
                </h1>
                <p className="text-base sm:text-xl text-gray-500 mt-2">
                    Page Not Found
                </p>
            </div>

            <div className="sm:pl-6">
                <img
                    src={doggy}
                    alt="Dog illustration"
                    className="w-20 sm:w-28 mx-auto"
                />
            </div>
        </div>
    );
}
