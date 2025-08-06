const Section1 = ({ id }) => {
  return (
    <section className="breadcrumb">
      <div
        className="background-image"
        data-background="img/bg_img/bg_001.jpg"
        data-bg-posx="center"
        data-bg-posy="center"
        data-bg-overlay={4}
      />
      <div className="breadcrumb-content" style={{ backgroundColor: "#000" }}>
  <div className="container" style={{ maxWidth: "960px", margin: "0 auto" }}>
    <div className="row">
      <div className="col-12 text-center py-4">
        <h2 className="breadcrumb-title text-white">
          <b>{id ? id : "New Arrivals"}</b>
        </h2>

        <nav className="breadcrumb-link mt-2" aria-label="breadcrumb">
          <span className="mx-2">
            <a href="/Home" className="text-white text-decoration-none">Home</a>
          </span>
          {/* <span className="mx-2 text-white">/</span> */}
          <span className="mx-2">
            <a href={`/Home/${id ? id.toLowerCase() : "new-arrivals"}`} className="text-white text-decoration-none">
              {id ? id : "New Arrivals"}
            </a>
          </span>
        </nav>
      </div>
    </div>
  </div>
</div>

    </section>
  );
};

export default Section1;
