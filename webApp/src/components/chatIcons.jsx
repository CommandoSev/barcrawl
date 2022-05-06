import { useEffect, useState } from 'react';


const chatIcons = (props) => {
    const { fname, lname } = props;
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(`https://ui-avatars.com/api/${fname}+${lname}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <>
        <img src={img} alt="icons" />
        </>
    );
    
};

export default chatIcons;