import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import Login from '../views/Login';
import Register from '../views/Register';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startCheckingAuth } from '../redux/actions/auth';
import { Home } from '../views/Home';
import { Profile } from '../views/Profile';
import { MyPokemons } from '../views/MyPokemons';
import { NewPokemon } from '../views/NewPokemon';

export default function AppRouter() {

  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCheckingAuth())
  }, [dispatch])

  if (loading)
    return <div>Loading...</div>

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          } />
          <Route path="/login" element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          } />
          <Route path="/register" element={
            <PublicRouter>
              <Register />
            </PublicRouter>
          } />
          <Route path="/profile" element={
            <PrivateRouter>
              <Profile />
            </PrivateRouter>
          } />
          <Route path="/new-pokemon" element={
            <PrivateRouter>
              <NewPokemon />
            </PrivateRouter>
          } />
          <Route path="/my-pokemons" element={
            <PrivateRouter>
              <MyPokemons />
            </PrivateRouter>
          }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
