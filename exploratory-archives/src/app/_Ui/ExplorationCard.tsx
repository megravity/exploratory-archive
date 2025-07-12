import Image from "next/image";
import Link from "next/link";
export default function ExplorationCard({
    imagePath,
    className,
    explorationLink,
}: {
    imagePath: string;
    className?: string;
    explorationLink?: string;
}) {
    return (
        <section
            className={`relative flex flex-col items-center outline-1 outline-ea-brown h-64 ${className} ${className}`}
        >
            <Link href={explorationLink || "#"} className="">
                <Image
                    src={imagePath}
                    alt="Exploration Image"
                    height={300}
                    width={500}
                    className="object-cover " // This replaces objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-ea-white text-ea-dark p-2 flex flex-row justify-between border-t-1 border-ea-brown">
                    <p className="text-sm">Test Exploration</p>
                    <p className="text-sm">12.07.2025</p>
                </div>
            </Link>
        </section>
    );
}
