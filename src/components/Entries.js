import EntryItem from "./EntryItem";
const Entries = (props)=>{
    // The map function iterates over each movie in 'myMovies' and returns a MovieItem component for each movie
    return props.myEntries.map(
        (entry)=>{
            return <EntryItem myEntry={entry} key={entry.Steps}/>
        }
    );
}
//Exporting the movies component to be used in read.js
export default Entries;