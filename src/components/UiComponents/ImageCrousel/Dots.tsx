const Dot = ({ active }:{active:Boolean}) => {
    return (
      <span
        style={{
          padding: "0px 9px",
          margin: "0 2px",
          cursor: "pointer",
          borderRadius: "50%",
          backgroundColor: `${active ? "black" : "grey"}`
        }}
      />
    );
  };
  
  const Dots = ({ content, index }:{content:string[],index:number}) => {
    return (
      <div>
        {content.map((item, i) => (
          <Dot key={i} active={index === i} />
        ))}
      </div>
    );
  };
  
  export default Dots;
  