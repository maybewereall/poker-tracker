"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return ( 
        <div className="mx-auto pt-10 md:pt-16 px-2 md:px-4 max-w-[1200px] w-full h-full">
            {children}
        </div>
     );
}
 
export default Container;