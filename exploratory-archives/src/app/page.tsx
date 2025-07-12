import HeaderText from "./_Ui/HeaderText";
import ExplorationCard from "./_Ui/ExplorationCard";
import ExplorationCards from "./_Ui/ExplorationCards";

export default function Home() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <div className="mb">
                <HeaderText className="" />
                <main className="flex justify-center">
                    <ExplorationCards />
                    {/* <ExplorationCard imagePath="/images/example.png" className="" /> */}
                </main>
            </div>
            <footer className="h-8 bg-ea-dark w-full"></footer>
        </div>
    );
}
