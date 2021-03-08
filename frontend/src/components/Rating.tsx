import React from 'react'

interface Props {
    rating?: number
    numReviews?: number
    caption?: string
}

export default function Rating(props: Props) {
    const { rating, numReviews, caption } = props

    return (
        <div className="rating">
            <span>
                <i
                    className={
                        rating && rating >= 1
                            ? 'fa fa-star'
                            : rating && rating >= 0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                    }
                />
            </span>
            <span>
                <i
                    className={
                        rating && rating >= 2
                            ? 'fa fa-star'
                            : rating && rating >= 1.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                    }
                />
            </span>
            <span>
                <i
                    className={
                        rating && rating >= 3
                            ? 'fa fa-star'
                            : rating && rating >= 2.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                    }
                />
            </span>
            <span>
                <i
                    className={
                        rating && rating >= 4
                            ? 'fa fa-star'
                            : rating && rating >= 3.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                    }
                />
            </span>
            <span>
                <i
                    className={
                        rating && rating >= 5
                            ? 'fa fa-star'
                            : rating && rating >= 4.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                    }
                />
            </span>
            {caption ? (
                <span>{caption}</span>
            ) : (
                <span>{numReviews + ' reviews'}</span>
            )}
        </div>
    )
}
