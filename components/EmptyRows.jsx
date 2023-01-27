import React from 'react'

const EmptyRows = ({iteration}) => {
    const emptyArray = []
    for (let i = 1; i <= iteration; i++) {
        emptyArray.push(i)
    }
  return (
    <>
    {emptyArray.map(i => {
        return <div key={i} className="flex gap-3 shadow-md border-x border-t m-1 p-2 min-w-[400px] max-w-[1200px] ">
                    <div className="h-[160px]"></div>
                </div>
    })}
    </>
    
  )
}

export default EmptyRows