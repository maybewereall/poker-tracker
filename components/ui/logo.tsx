interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return (
    <div>
        <span className="kerning-20">ARIA</span><br />
        <span className="">Pokerinos</span>
    </div>
);
};

export default Logo;
