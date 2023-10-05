import Link from "next/link";

interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return (
    <Link href="/" className="select-none">
        <div className="leading-0 md:tracking-[0.625rem] tracking-[0.5rem] font-bold text-sm md:text-lg">ARIA</div>
        <div className="leading-0 md:tracking-[0.175rem] tracking-[0.075rem] text-xs">Pokerinos</div>
    </Link>
  );
};

export default Logo;
