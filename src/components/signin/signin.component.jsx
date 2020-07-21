import React from 'react'

import './signin.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

// Promise Based Redux Saga- Google Sign in
import { googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import {connect } from 'react-redux'

class SignIn extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        // get the current value of the email and password input tags
        // const {email, password} = this.state
        // try {
        //     await auth.signInWithEmailAndPassword(email, password)
        //     // IF all that Sign IN succeeds then we need to clear the input values
        //     this.setState({ email: '', password: ''})
        // } catch (error) {
        //     console.log("err: ", error)
        // }

        /**
         * Implementing Redux Saga for Email Sign In
         */
        const {email, password} = this.state
        const {emailSignInStart} = this.props

        emailSignInStart(email, password)
    }


    handleChange = (e) => {
        const { value, name } = e.target

        this.setState({ [name]: value })
    }

    render() {
        const {googleSignInStart} = this.props
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name='email'
                        onChange={this.handleChange}
                        value={this.state.email}
                        label="email"
                        required
                    />
                    {/* <label>Email</label> */}
                    <FormInput
                        type="password"
                        name='password'
                        value={this.state.password}
                        required
                        onChange={this.handleChange}
                        label="password"
                     />
                    {/* <label>Password</label> */}

                    <div className='buttons'>
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        {/* added Google SIgn in  */}
                        {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn> */}
                        {/* Also we set "type=button" because it will submit the form
                            since it is wrapped inside a form. so we change it to button
                         */}
                        <CustomButton type='button'onClick={googleSignInStart} isGoogleSignIn>
                            SIGN IN WITH GOOGLE
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)


// const userReducer = (state, action) => {
//     switch(action.type) {
//         case 'SET_CURRENT_USER':
//             return state.currentUser = action.payload
//         default:
//             return state
//     }
// }