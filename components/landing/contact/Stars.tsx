import React from 'react'

const Stars = ({ rating }: { rating: number }) => {
  return (
    <p className="text-[15px] leading-none tracking-[0.2em]" aria-label={`${rating} out of 5 stars`}>
      <span className="text-ember">{"★".repeat(rating)}</span>
      <span className="text-carbon/25">{"★".repeat(5 - rating)}</span>
    </p>
  )
}

export default Stars