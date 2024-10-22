import { useState, useEffect } from 'react';

const App = () => {
    const [file, setFile] = useState();
    const [images, setImages] = useState();

    const postFile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('http://localhost:3000/images', {
            method: 'POST',
            body: formData
        });

        console.log(res);
    };

    const fetchImages = async () => {
        const res = await fetch('http://localhost:3000/images');
        const data = await res.json();

        console.log(data);

        setImages(data);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="app">
            Image Uploader

            <form onSubmit={postFile}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                <button type="submit">Submit</button>
            </form>

            <section>
                {
                    images && images.map(image => (
                        <img src={image.url} alt="" key={image._id} />
                    ))
                }
            </section>
        </div>
    );
};

export default App;