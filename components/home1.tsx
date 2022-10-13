import Link from 'next/link'
import React from 'react'

const Home1 = () => {
  return (
    <div className="bg">
    <div className="bg-wraper">
      <div className="text-white flex justify-center items-end w-full h-full pb-10">
        <div className="text-center ">
          <p className="headline-1">Track films you’ve watched.</p>
          <p className="headline-1">Save those you want to see.</p>
          <p className="headline-1">Tell your friends what’sgood.</p>

          <div className="mt-5">
            <Link href="/signup">
              <button className="btn py-2 px-6 uppercase">
                Get started — it‘s free!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home1
