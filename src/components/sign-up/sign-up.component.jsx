import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'
import './sign-up.styles.scss'

// Implementation of Redux Saga for Sign up
import { signUpStart} from '../../redux/user/user.actions'
import { connect } from 'react-redux'

class SignUp extends React.Component {
    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const { signUpStart} = this.props
        const {displayName, email, password, confirmPassword} = this.state

        if (password !== confirmPassword){
            alert('passwords dont match ')
            return
        }

        /**
         * Implementing the SAGA Sign Up Pattern
         */
        signUpStart({displayName, email, password})

        // try {
        //     const { user } = await auth.createUserWithEmailAndPassword(email, password)

        //     console.log('user Sign up: ', user)
        //     // the user that we got back from createUserWithEmailAndPassword method is the one we are sending to the createUserProfileDocument to actually create the user
        //     await createUserProfileDocument(user, { displayName })

        //     // if the createUserProfileDocument is successful without errors
        //     // then we 'clear' our form inputs by setting the state to ff values below
        //     this.setState({
        //         displayName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     })

        // } catch(error) {
        //     console.log(error)
        // }
    }

    // (Note we are using arrow function to bind handleChange to this Class object)
    // handling the input change
    handleChange = event => {
        const { name, value } = event.target

        this.setState({ [name] : value })
    }


    render() {
        const {displayName, email, password, confirmPassword} = this.state

        return (
            <div className='sign'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign Up with your Email and Password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                    ></FormInput>

                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                    ></FormInput>

                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                    ></FormInput>

                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                    ></FormInput>

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials ) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps) (SignUp)