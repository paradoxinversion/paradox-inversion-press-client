import Link from "next/link";
import SeriesPartSelect from "./SeriesPartSelect";

type SeriesPartSelectProps = {
    seriesPosts: { title: string; url: string }[];
    series: {
        url: string;
    }
    currentPart?: string;
}

const getNextSeriesPart = (currentPart, seriesPosts) => {
    console.log("currentPart", currentPart);
    
    if (currentPart < seriesPosts.length - 1) {
        return seriesPosts[currentPart + 1];
    }
    return null;
}

const getPreviousSeriesPart = (currentPart, seriesPosts) => {
    if (currentPart === 1) {
        return seriesPosts[currentPart - 1];
    }
    return null;
}

const hasPreviousPart = (currentPart, seriesPosts) => {
    // Logic to determine if there is a next part
    return getPreviousSeriesPart(currentPart, seriesPosts);
}

const hasNextPart = (currentPart, seriesPosts) => {
    return getNextSeriesPart(currentPart, seriesPosts) !== null;
}



export default function SeriesStepper(props: SeriesPartSelectProps){
    const { seriesPosts, series, currentPart } = props;

    const previousSeriesPart = getPreviousSeriesPart(props.currentPart, seriesPosts);
    const nextSeriesPart = getNextSeriesPart(props.currentPart, seriesPosts);

    return (
        <section id="series-stepper">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Series Navigation</h2>
            </div>
            <section className="flex items-center justify-between">
                {previousSeriesPart && hasPreviousPart(currentPart, series) && (
                    <Link href={`/series/${series.url}/${previousSeriesPart.url}`} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
                        Previous
                    </Link>
                )}
                <SeriesPartSelect seriesPosts={seriesPosts} series={series} />
                {nextSeriesPart && hasNextPart(currentPart, series) && (
                    <Link href={`/series/${series.url}/${nextSeriesPart.url}`} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
                        Next
                    </Link>
                )}
            </section>
            
        </section>
    )
}