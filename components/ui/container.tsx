"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return ( 
        <div className="mx-auto pt-[64px] max-w-7xl h-full">
            {children}
        </div>
     );
}
 
export default Container;