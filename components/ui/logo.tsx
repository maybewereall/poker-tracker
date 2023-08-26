interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return (
    <div className="select-none">
        <span className="tracking-[0.625em] font-bold text-2xl">ARIA</span><br />
        <span className="leading-3 tracking-[0.25rem]">Pokerinos</span>
    </div>
);
};

export default Logo;
