import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component'
import SignInPage from './pages/signin/signin.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

// redux-related imports
import {connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

// using reselect for memoiz selectors
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'

// for exporting SHOP_DATA to firestore
// import {selectCollectionsForPreview} from './redux/shop/shop.selectors'
// import {addCollectionAndDocuments} from './firebase/firebase.utils'

import { checkUserSession } from './redux/user/user.actions'


class App extends React.Component {

  unsubscribeFromAuth = null // function that will be assigned to so that we can loged in and logged out

  componentDidMount() {
    const {checkUserSession} = this.props
    checkUserSession()
    // remember that by default a React Class component or stateful component
    // receives a "this.props" even if you dont explicitly declare the constructor
    // const { setCurrentUser, collectionsArray  } = this.props

    // auth.onAuthStateChanged() receives a CB that has argv1 --> w/c is the userAuthenticated object
    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
    //   // this.setState({currentUser: userAuth})
    //   // createUserProfileDocument(userAuth)
    //   // console.log('user', userAuth)

    //   // if userAuth is NOT null or if user exists
    //   if(userAuth) {
    //     // we will get the  documentRef object of user as implemented on firebase.utils.js
    //     const userRef = await createUserProfileDocument(userAuth)

    //     // we are using userRef to check if our databaes has updated with new data
    //     //    that is very similar with "auth.onAuthStateChanged"
    //     //    saying if the snapShot is changed. Though user data is really not going to be updated in the database as per our implementation
    //     // What we intentded to do is actually get the snapshot of object "representing the data that is currently stored in our database "

    //     userRef.onSnapshot(snapShot => {
    //       console.log('userRef on sanpShot: ', {...snapShot.data(), id: snapShot.id})
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       })  // putting the console log here at the 2nd argument
    //          // because we know that setState is asynchronous right?
    //     })

    //     // first let's try to log the current state of the App component
    //     //    whenever we have changes on the SignUp component
    //     // console.log(this.state)

    //   } else {  // if the userAuth is null
    //     // setCurrentUser({currentUser: userAuth})
    //     setCurrentUser(userAuth)


        /**
         * THIS PART OF THE CODE IS REMOVABLE ONLY FOR BATCH UPLOADING OF SHOP_DATA
         */
        // from the firebase.utils.js
        /**
         * argv1 - collection key
         * argv2 - collections array
         */
        // addCollectionAndDocuments('collections',
        //   // so this mapping will only return us the array of objects
        //   // with just "title" and items inside of it
        //   collectionsArray.map( ({title, items}) => ({title, items}) )
        // )
      // }
    // })
  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth()  // this will unsubscribe only but WILLNOT LOGGED OUT of our app
  }

  render () {

    console.log('render App this.props: ', this.props)

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* the reason we are not putting "exact" for the /shop route is because
              we will have subroutes for /shop like "/shop/hats" , "/shop/jackets", etc.
           */}
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin"
            render={() =>{
                console.log('this.props: ', this.props)
                return this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />)
              }}
          />

        </Switch>
      </div>
    );
  }
}

// argv1 - " state of the whole root reducer" or the root reducer
// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser
// })

// similar to the above code but we just destructure the "user" reducer here
// const mapStateToProps = ({ user}) => ({
//   currentUser: user.currentUser
// })

// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state)
// })

/**
 * I put console.log below because of error I"ve encounterd with user.selector.js
 */
// const mapStateToProps = state => {
//   console.log('App mapstate2props: ', selectCurrentUser(state))
//   return { currentUser: selectCurrentUser(state) }
// }


const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
})


// here we are not going to use mapStateToProps
// we only need to set the initial currentUser state with user data from firebase

// const mapDispatchToProps = dispatch => ({
//   // it is the way of redux to know that whatever
//   //  object you are passing me. I'm going to pass to every reducer
//   // so our user action (setCurrentUser) is a function that gets the user and
//   // returns an action object
//   setCurrentUser: (user) => dispatch(setCurrentUser(user))
// })
/**
 * Recreating mapDispatchToProps to use the Redux Saga
 */
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

// export default connect(null, mapDispatchToProps)(App);
// instead of null on argv1 we are going to pass "mapStateToProps"

export default connect(mapStateToProps, mapDispatchToProps)(App);
