// @ts-ignore
export const Header = (props) => {
  return (
    <header>
      {props.token ? (
        <button
          onClick={() => props.dispatch(props.removeCredentials())}
          type="button"
        >
          Log out
        </button>
      ) : (
        'Welcome'
      )}
    </header>
  );
};
