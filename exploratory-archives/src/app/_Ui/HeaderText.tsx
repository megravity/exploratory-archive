export default function HeaderText({ className }: { className?: string }) {
    return (
        <header className={`lg:ml-4 ${className}`}>
            <h1 className="lg:mb-8 font-heal font-medium text-8xl">
                explorator<span className="text-ea-red">y</span> archive
            </h1>
            <h2 className="text-[2rem] ">
                an unsorted, unfiltered archive of digital exploration
            </h2>
        </header>
    );
}
