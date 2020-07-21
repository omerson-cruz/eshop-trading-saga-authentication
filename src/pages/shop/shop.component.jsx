import React from "react";

import { Route } from "react-router-dom"

// using Container Pattern
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from "../collection/collection-page.container";

// levergaging our "firestore" from our firebase.utils.js
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// pushing the SHOP_DATA from Firebase to our Reducer
import { connect } from 'react-redux'
// import { updateCollections, fetchCollectionsStart } from "../../redux/shop/shop.actions";

//implementing Redux-thunk
// import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
// implementing Redux-Saga
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

/** NO NEED for below Import due to the Container Pattern */
// import { createStructuredSelector } from 'reselect'
// import {
//   selectIsCollectionFetching,
//   selectIsCollectionsLoaded
// } from '../../redux/shop/shop.selectors'

// WithSPinner is now used at the Container PATTERN component
// using our HOC Spinner
// import WithSpinner from '../../components/with-spinner/with-spinner.component'


// NO NEED for BELOW code because of CONTAINER PATTERN
/**
 * Below components will be the one to be placed on the "Router" below
 */
// creating the CollectionsOverview Component that will have the WithSpinner HOC
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
// const CollectionPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends React.Component{

  // constructor() {
  //   super()

  //   this.state ={
  //     laoding: true
  //   }
  // }

  // or as a shortcut we can utilize the ES6
  // this will call the constructor and super() implicitly
  // state = {
  //   loading: true
  // }



  // Snapshot will be a representation of our collections array
  // that we are going to get from firestore
  // unsubscribeFromSnapshot = null

  componentDidMount() {

    // implementing Redux-saga
    const { fetchCollectionsStart } = this.props
    fetchCollectionsStart()

    // using the "updateCollection" to push SHOP_DATA from firebaes to Redux store
    // const { updateCollections } = this.props

    // const collectionRef = firestore.collection('collections')

    // so similar to what we did with the "userRef" in our App.js
    // we are going to call the collectionRef here
    // "onSnapshot" will simply informs our App whenever there is an Update
    // or whenever the component is just runs for the first time
    // this collectionRef will send us the snapshot representing the
    // code of our collections objects array at the time this code renders

    /* Using the OBservable Pattern here at the "collectionRef.onSnapshot( )" */
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
    //   console.log("snapshot.docs: ", snapshot.docs)
    //   // calling the converter util from firebase.utils.js
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

    //   console.log("collectionsMap: " , collectionsMap )

    //   // pushing SHOP DATA from firebase to Redux store
    //   updateCollections(collectionsMap)

    //   this.setState({loading: false})
    // })


    /**
     * This is moved to the "REDUCER" because now we utilize the Redux-THunk
     */
    // An alternative to the "observable pattern" above for firebase
    // Here we are going to use the Promise Pattern
    // but as you see it has the same "callback" method
    // collectionRef.get()
    //   .then((snapshot) => {
    //     console.log("snapshot.docs: ", snapshot.docs)
    //     // calling the converter util from firebase.utils.js
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

    //     console.log("collectionsMap: " , collectionsMap )

    //     // pushing SHOP DATA from firebase to Redux store
    //     updateCollections(collectionsMap)

    //     this.setState({loading: false})
    //   })

    /* 3rd method
      Using the "fetch()" method to get the SHOP_DATA
      and hitting the REST API method of the Firebase Database
      But this is for demo purpose only
    */
    // fetch('https://firestore.googleapis.com/v1/projects/eshop-trading/databases/(default)/documents/collections/')
    //   .then(response => response.json())
    //   .then(collections => console.log(collections))

  }

  render () {
    const {
      match,
      // isCollectionFetching,  //==> not needed because of CONTAINER PATTERN
      // selectIsCollectionsLoaded //==> not needed because of CONTAINER PATTERN
    } = this.props

    // "loading" is now moved to Redux - Thunk implementation
    // const { loading } = this.state

    return (
      <div className="shop-page">
        {/* <Route exact path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} /> }
        /> */}
        {/* Now we can switch back to "component instead of "render()" */}
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />

        {/* INstead of doing "path={"/shop/:category"}" */}
        {/* with  `${match.path}/` it wil be very flexible and you can use it anywhere */}
        {/* <Route path={`${match.path}/:collectionId`}
          render={(props) =>
          <CollectionPageWithSpinner
          // we actually need to reverse the value hence the "!selectIsCollectionsLoaded"
          // if Collections is already Loaded then DONT do the "isLoading"
          isLoading={!selectIsCollectionsLoaded} {...props}
          />}
        /> */}
        {/* /** NO NEED for below Import due to the Container Pattern */}

        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

/** No need for this since we are not getting data from Redux Store
 * by implementing the "Redux-Thunk"
 */
// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
// })

/** NO NEED for below Import due to the Container Pattern */
// const mapStateToProps = createStructuredSelector({
//   isCollectionFetching: selectIsCollectionFetching,
//   selectIsCollectionsLoaded: selectIsCollectionsLoaded
// })

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)
