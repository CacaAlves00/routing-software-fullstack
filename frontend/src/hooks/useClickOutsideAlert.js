import { useEffect } from 'react';

function useClickOutsideAlert(ref, callback) {

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback()
        }
    }
}

export default useClickOutsideAlert