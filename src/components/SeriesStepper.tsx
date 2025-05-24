import { useRouter } from "next/router";

export default function SeriesStepper(props){
    const { seriesPosts } = props;
    const router = useRouter();
    const handleChange = (event) => {
        const selectedUrl = event.target.value;
        router.push(`/series/${props.seriesUrl}/${selectedUrl}`);
    };
    return (
        <select className= "series-stepper mb-4 p-2 bg-black border border-gray-300 rounded" onChange={handleChange}>
            {seriesPosts.map((post) => (
                <option key={post.url} value={post.url}>
                    {post.seriesOrder}. {post.title}
                </option>
            ))}
        </select>
        
    )
}