interface Props {
  src: string | ArrayBufferLike;
  size: {
    width: number;
    height: number;
  };
  title?: string;
}

export const OgpImage = ({
  src,
  size,
  title = "Azuma-ya's Portfolio",
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: size.width,
        height: size.height,
      }}
    >
      <img
        src={src as unknown as string}
        alt="ogp"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "10%",
          right: "10%",
          margin: "auto",
          transform: "translateY(-50%)",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "48px",
            color: "white",
            whiteSpace: "pre-wrap",
            textAlign: "center",
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};
