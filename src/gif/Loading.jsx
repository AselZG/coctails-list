import loader from "../gif/loading.gif";

function Loading() {
  return (
    <div className="loading hide-loading">
      <img src={loader} alt="loading..." />
    </div>
  );
}

export default Loading;
