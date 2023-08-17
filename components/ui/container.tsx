"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return ( 
        <div className="mx-auto max-w-7xl flex justify-center h-full">
            {children}
        </div>
     );
}
 
export default Container;