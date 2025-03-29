import { useState, useEffect } from 'react';

/**
 * A custom hook to track the window's size, returning the size inside 
 * of a object with two keys: height and width.
 * 
 * @returns {object.<number>} The window's size.
 */
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return windowSize;
}

export default useWindowSize;
