const ProgressBar = (props: any) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: "30%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    justifyContent: "center",
    backgroundColor: bgcolor,
    borderRadius: "inherit",
  };

  const labelStyles = {
    color: "white",
    fontWeight: "bold",
    marginTop: 50,
  };

  return (
    <div style={containerStyles}>
      <div style={{ ...fillerStyles }}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
