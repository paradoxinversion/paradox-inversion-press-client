import { useRouter } from "next/router";
import { formatSeriesPostPath } from "utils/actions";

export default function SeriesPartSelect(props){
    const { seriesPosts } = props;
    const router = useRouter();
    const handleChange = (event) => {
        const selectedUrl = event.target.value;
        router.push(formatSeriesPostPath(props.series, selectedUrl));
    };
    return (
        <select className= "series-stepper p-2 bg-black border border-gray-300 rounded" onChange={handleChange}>
            {seriesPosts.map((post) => (
                <option key={post.url} value={post.url}>
                    {post.title}
                </option>
            ))}
        </select>
        
    )
}