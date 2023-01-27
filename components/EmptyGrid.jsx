
const EmptyGrid = ({iteration}) => {
    const emptyArray = []
    for (let i = 1; i <= iteration; i++) {
        emptyArray.push(i)
    }
  return (
    <>
    {emptyArray.map(i => {
        return <div key={i} className=" flex flex-col w-56 h-[282px] px-3 pt-2 h-full border  bg-white ">
                    <div className="w-[100px]"></div>
                </div>
    })}
    </>
  )
}

export default EmptyGrid