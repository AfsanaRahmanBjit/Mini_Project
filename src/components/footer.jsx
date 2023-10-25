import "./footer.style.scss";

const Footer = () => {
  const contactNumber = "01*********";
  const contact = {
    heading: "Contact Number",
    styling: {
      fontWeight: "bold",
      color: "yellow"
    }
  };

  return (
    <>
      <div className="footer-style">
        <div>
          <h1> Partnership </h1>
          <ul style={{ paddingLeft: "30px", textAlign: "left" }}>
            <li>Google</li>
            <li>Facebook</li>
          </ul>
        </div>

        <div>
          <h1> About us</h1>
          <p>We always try our lebel best to provide the quality service.</p>
          <p> By this way our service differenciate us from others.</p>
        </div>
        <div>
          <h1> Contact </h1>
          <p> For any kind of problem feel free to contact with us.</p>
          <p style={contact.styling}>
            {contact.heading}: {contactNumber}
          </p>
        </div>
      </div>
    </>
  );
};
export default Footer;
