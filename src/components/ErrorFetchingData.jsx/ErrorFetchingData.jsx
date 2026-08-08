import React from 'react'

export default function ErrorFetchingData({error}) {

  const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong.";

  return (
    <div className="w-full py-10 center">
        <p className="text-red-500 text-base">
            {message}
        </p>
    </div>
  )
}
