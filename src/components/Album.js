import React, { useEffect, useRef, useState } from 'react';



const Album = (props) => {
    const { id } = props
    const [albums, setAlbums] = useState({});
    const [photos, setPhotos] = useState({});
    const refPhotos = useRef(null)
    const fetchData = async () => {
        try {
            let url = `https://jsonplaceholder.typicode.com/albums?userId=${id}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setAlbums(parsedData);


        } catch (error) {
            console.log("error", error);
        }

    }
    const handletitleclick = async (id) => {
        
        refPhotos.current.click();
        try {
            let url = `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setPhotos(parsedData);
            
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        fetchData();

    }, []);
   

    return (
        <div className="album-container">
            


            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                        <div className='container'>
                        <div className='row'>
                            {
                                Object.keys(photos).length !== 0 && photos.map((element) => {
                                    return <div className='col-12' key={element.id}>
                                                <div className="card">
                                                    <img src={element.url} className="card-img-top" alt="image not found" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{element.title}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                    

                                })}</div></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refPhotos} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            



            <div className='album-container'>
                <div className='album-inner'>
                <table>
                    <thead>
                        <tr>
                            <th>Album Title</th></tr>
                    </thead>
                    <tbody>{
                        Object.keys(albums).length !== 0 && albums.map((element) => {
                            return <tr key={element.id} id={element.id} onClick={() => handletitleclick(element.id)} ref={refPhotos}><td className='tdcss'>{element.title}</td>
                            </tr>
                        })}</tbody>

                </table>
                </div>
                <div>
            <button  type="button" ref={refPhotos} className="btn btn-dark my-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                Launch demo modal
            </button>
            </div>
            </div>
            
        </div>
    )


}
export default Album;