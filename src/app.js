import React from 'react'
import {
  Route,
  Routes,
  Navigate,
  // useNavigate
} from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Offer } from './pages/Offer'
import { SellDetails } from './pages/SellDetails'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { UploadNFT } from './pages/UploadNFT'
import { MyStery } from './pages/MyStery'
import { Stats } from './pages/Stats'
import { CreateSignup } from './pages/CreateSignup'
import { ListItemForSale } from './pages/ListItemForSale'
import { Collections } from './pages/Collections'
import { Creators } from './pages/Creators'
import { CollectionDetails } from './pages/CollectionDetails'
import { CollectionCreator } from './pages/CollectionCreator'

import ToastListener from './components/Toast'
// import { useAuth } from './contexts/AuthContext'

export const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element={<Navigate to='/explorer' />}></Route>
        <Route exact path='/explorer' element={<Home/>}></Route>
        <Route exact path='/offer' element={<Home/>}></Route>
        <Route exact path='/create-signup' element={<CreateSignup />}></Route>
        <Route exact path='/profile/:address' element={<Profile />}></Route>
        <Route exact path='/settings' element={<Settings />}></Route>
        <Route exact path='/upload' element={<UploadNFT />}></Route>
        <Route exact path='/products/:collection/:tokenId/:saleId/buy' element={<Details category='buy'/>}></Route>
        <Route exact path='/products/:collection/:tokenId/:saleId/bid' element={<Details category='bid'/>}></Route>
        <Route exact path='/products/:collection/:tokenId/offer' element={<Offer/>}></Route>
        <Route exact path='/products/:collection/:tokenId/sell' element={<SellDetails />}></Route>
        <Route exact path='/products/:collection/:tokenId/sale' element={<ListItemForSale />}></Route>
        <Route exact path='/mystery' element={<MyStery />}></Route>
        <Route exact path='/stats' element={<Stats />}></Route>
        <Route exact path='/collections' element={<Collections filter='all'/>}></Route>
        <Route exact path='/creators' element={<Creators />}></Route>
        <Route exact path='/my-collections' element={<Collections filter='owner'/>}></Route>
        <Route exact path='/my-collections/create' element={<CollectionCreator />}></Route>
        <Route exact path='/collections/:contractAddress' element={<CollectionDetails />}></Route>
      </Routes>
      <ToastListener/>
    </>
  )
}
