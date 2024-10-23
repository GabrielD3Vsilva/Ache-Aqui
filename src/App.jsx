import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import IndexToClient from './components/IndexToClient';
import IndexToShop from './components/IndexToShop';
import Repository from './components/Repertory';
import EditItem from './components/EditItem';
import ShopFile from './components/ShopFile';
import Details from './components/Details';
import Vendas from './components/Vendas';
import Client from './components/Client';
import Compras from './components/Compras';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/indexToClient" element={<IndexToClient/>} />
          <Route path="/indexToShop" element={<IndexToShop/>} />
          <Route path="/repository" element={<Repository/>}/>
          <Route path='/edit' element={<EditItem/>}/>
          <Route path='/shopFile' element={<ShopFile/>} />
          <Route path='/details' element={<Details/>} />
          <Route path='/vendas' element={<Vendas/>}/>
          <Route path='/client' element={<Client/>}/>
          <Route path='/compras' element={<Compras/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
