import NotFoundImage from "../assets/not-found-page.jpg";

const NotFoundPage = () => {
  return (
    <div>
      <img
        src={NotFoundImage}
        alt="Not Found Image"
        style={{
          width: "50%",
          height: "auto",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      />
    </div>
  );
};

export default NotFoundPage;
