import ExplorationCard from "./ExplorationCard";

export default function ExplorationCards() {
    return (
        // Use grid here!
        <div className="w-fit max-w-[85vw] flex flex-row justify-stretch items-start flex-wrap gap-8">
            <ExplorationCard imagePath="/images/example.png" className="" />
            <ExplorationCard imagePath="/images/example.png" className="" />
            <ExplorationCard imagePath="/images/example.png" className="" />
            <ExplorationCard imagePath="/images/example.png" className="" />
            <ExplorationCard imagePath="/images/example.png" className="" />
        </div>
    );
}
