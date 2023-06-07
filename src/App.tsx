import { News } from './features/news/News';
import { Auth } from './features/auth/Auth';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  removeCredentials,
  selectError,
  selectToken,
} from './features/auth/authSlice';
import { selectError as selectNewsError } from './features/news/newsSlice';

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
      <header>
        {token ? (
          <button onClick={() => dispatch(removeCredentials())} type="button">
            Log out
          </button>
        ) : (
          'Welcome'
        )}
      </header>
      {token ? <News /> : <Auth />}
      {authError && (
        <div className="error-container">
          <h3>{authError.code}</h3>
          <p>{authError.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
