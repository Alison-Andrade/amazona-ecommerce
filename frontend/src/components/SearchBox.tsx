import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
    history: any
}

const SearchBox: React.FunctionComponent<Props> = (props) => {
    const history = useHistory()
    const [name, setName] = useState('')

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        history.push(`/search/name/${name}`)
    }

    return (
        <form className="search" onSubmit={submitHandler}>
            <div className="row">
                <input
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="primary" type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}

export default SearchBox
