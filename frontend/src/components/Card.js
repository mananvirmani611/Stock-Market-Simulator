export default function Card({ bgcolor, heading, value }) {
  return (
    <div
      style={{
        boxShadow: "5px 8px lightgray",
        width: "100%",
        height: "200px",
        backgroundColor: `${bgcolor}`,
        borderRadius: "10px",
      }}
    >
      <div style={{ 'padding': "4%" , 'color' : 'gray', fontFamily : 'Poppins', fontWeight : '100'}}>
        <h1 style={{fontWeight : '500'}}>{heading}</h1>
        <h1 style={{fontWeight : '500'}}>{value}</h1>
      </div>
    </div>
  );
}
