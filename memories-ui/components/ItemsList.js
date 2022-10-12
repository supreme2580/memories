import Thumbnail from "../components/Thumbnail";

export default function ItemsList({ data }) {
    return(
        <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center mt-20">
              {
                data.memories.map(item => <Thumbnail key={item.id} date={item.imageDate} imageUrl={item.imageUrl} />)
              }
          </div>
    )
}