import '../app.css';

const ErrorMessage = ({message}) => {
  if (!message) {
    return null;
  }
  return <div className={'message error'}>
    <p>{message}</p>
  </div>;
};

export default ErrorMessage;