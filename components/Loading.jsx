import React from 'react'

const Loading = () => {
  return (
    <div className="w-full m-10 flex justify-center">
        <div >
            <img src="/loading.svg" className="w-20 h-20 relative loading"/>
            <img src="/loadingBook.svg" className=" loadingBook bottom-[60px] left-[19px] w-10 h-10 relative"/>
        </div>
    </div>
  )
}

export default Loading