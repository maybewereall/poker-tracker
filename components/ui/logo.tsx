import Link from "next/link";

interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return (
    <Link href="/" className="select-none">
        <div className="leading-0 tracking-[0.625rem] font-bold text-lg">ARIA</div>
        <div className="leading-0 tracking-[0.175rem] text-xs">Pokerinos</div>
    </Link>
    // <div className="select-none">
    //     <span className="tracking-[0.625em] font-bold text-2xl">ARIA</span><br />
    //     <span className="leading-3 tracking-[0.25rem]">Pokerinos</span>
    // </div>
  );
};

export default Logo;
