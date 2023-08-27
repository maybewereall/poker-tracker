import Image from "next/image";
import Icon from "/public/icon/loading.svg";

interface ILoadingIconProps {}

const LoadingIcon: React.FunctionComponent<ILoadingIconProps> = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
        <div>
            <Image src={Icon} width={48} height={48} alt="Loading icon"/>
        </div>
    </div>
  );
};

export default LoadingIcon;
