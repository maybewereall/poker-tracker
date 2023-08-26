"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return ( 
        <div className="mx-auto pt-[64px] px-2 md:px-4 max-w-7xl h-full">
            {children}
        </div>
     );
}
 
export default Container;