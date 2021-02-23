import React, { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsUser, updateUserProfile } from "../actions/userActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant"
import { RootState } from "../store"

export default function ProfileScreen() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [sellerName, setSellerName] = useState("")
    const [sellerLogo, setSellerLogo] = useState("")
    const [sellerDescription, setSellerDescription] = useState("")

    const userSignin = useSelector((state: RootState) => state.userSignin)
    const { userInfo } = userSignin
    const dispatch = useDispatch()
    const userDetails = useSelector((state: RootState) => state.userDetails)
    const { loading, error, userInfo: user } = userDetails
    const userUpdateProfile = useSelector(
        (state: RootState) => state.userUpdateProfile
    )
    const {
        success: successUpdate,
        error: errorUpdade,
        loading: loadingUpdate,
    } = userUpdateProfile

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            userInfo && dispatch(detailsUser(userInfo._id))
        } else {
            setName(user.name)
            setEmail(user.email)
            if (user.seller) {
                setSellerName(user.seller.name)
                setSellerName(user.seller.logo)
                setSellerName(user.seller.description)
            }
        }
    }, [dispatch, userInfo, user])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Password and confirm password do not match")
        } else {
            user &&
                dispatch(
                    updateUserProfile({
                        _id: user._id,
                        name,
                        email,
                        password,
                        seller: {
                            name: sellerName,
                            logo: sellerLogo,
                            description: sellerDescription,
                        },
                    })
                )
        }
    }

    return (
        <div>
            {loading ? (
                <LoadingBox />
            ) : (
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>User Profile</h1>
                    </div>
                    {error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            {errorUpdade && (
                                <MessageBox variant="danger">
                                    {errorUpdade}
                                </MessageBox>
                            )}
                            {successUpdate && (
                                <MessageBox variant="success">
                                    Profile Updated Successfully
                                </MessageBox>
                            )}
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Reenter password"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            {user?.isSeller && (
                                <>
                                    <h2>Selller</h2>
                                    <div>
                                        <label htmlFor="sellerName">
                                            Seller Name
                                        </label>
                                        <input
                                            type="text"
                                            id="sellerName"
                                            placeholder="Enter Seller Name"
                                            onChange={(e) =>
                                                setSellerName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="sellerLogo">
                                            Seller Logo
                                        </label>
                                        <input
                                            type="text"
                                            id="sellerLogo"
                                            placeholder="Enter Seller Logo"
                                            onChange={(e) =>
                                                setSellerLogo(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="sellerDescription">
                                            Seller Description
                                        </label>
                                        <input
                                            type="text"
                                            id="sellerDescription"
                                            placeholder="Enter Seller Description"
                                            onChange={(e) =>
                                                setSellerDescription(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <label />
                                <button className="primary" type="submit">
                                    {loadingUpdate ? <LoadingBox /> : "Update"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            )}
        </div>
    )
}
