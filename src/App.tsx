import { News } from './features/news/News';
import { Auth } from './features/auth/Auth';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  removeCredentials,
  selectError,
  selectToken,
} from './features/auth/authSlice';
import { selectError as selectNewsError } from './features/news/newsSlice';
import { Header } from './components/Header';

function App() {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectError);
  const newsError = useAppSelector(selectNewsError);
  return (
    <div className="App">
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <Header
        token={token}
        dispatch={dispatch}
        removeCredentials={removeCredentials}
      />
      {token ? <News /> : <Auth />}
      {authError && (
        <div className="error-container">
          <h3>{authError.code}</h3>
          <p>{authError.message}</p>
        </div>
      )}
      {newsError && (
        <div className="error-container">
          <h3>{newsError.code}</h3>
          <p>{newsError.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
