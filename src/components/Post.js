
import React, { useEffect, useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';



const Post = (props) => {
    const { id } = props;
    const [posts, setPosts] = useState({});
    const [comments, setComments] = useState([]);
    const [currentPost, setCurrentPost] = useState({ id: "", title: "", body: "" })
    const fetchData = async () => {
        try {
            let url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setPosts(parsedData);



        } catch (error) {
            console.log("error", error);
        }

    }

    const handleDeletePost = (id) => {

        const newPosts = posts.filter((post) => { return post.id !== id });
        setPosts(newPosts)

    }
    const editPost = async (id, title, body) => {
        console.log(id)
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body })
        });
        const json = response.json();
        let newPosts = JSON.parse(JSON.stringify(posts))
        for (let index = 0; index < newPosts.length; index++) {
            const element = newPosts[index];
            if (element.id === id) {
                newPosts[index].title = title;
                newPosts[index].body = body;
                break;
            }


        }
        setPosts(newPosts)
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    const refComments = useRef(null);
    const handleUpdatePost = (currentPost) => {
        ref.current.click();
        setCurrentPost({ id: currentPost.id, title: currentPost.title, body: currentPost.body });
    }
    const onChange = (e) => {
        setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
        console.log(currentPost.id)
    }

    const handleClick = (e) => {

        editPost(currentPost.id, currentPost.title, currentPost.body)
        refClose.current.click();
    }
    const handlebodyclick = async (id) => {
        refComments.current.click();
        try {
            let url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setComments(parsedData);
        } catch (error) {
            console.log("error", error);
        }
    }


    useEffect(() => {
        fetchData();

    }, []);
    const handleChange = (e) => {
        let temp = e.target.value;
        if (temp) {
            var newComments = comments.filter((element) => element.name.includes(temp) || element.body.includes(temp));
            setComments(newComments);
        }
        if(temp===''){
            setComments(comments);
        }
    
    }


const handleSubmit = (e) => {
    e.preventDefault();
}

return (
    <>
        <div className="post-container">
            <button ref={ref} type="button" className="btn btn-dark d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" name="title" value={currentPost.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Body</label>
                                    <input className="form-control" id="exampleFormControlTextarea1" rows="3" name="body" value={currentPost.body} onChange={onChange}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark" onClick={handleClick}>Update Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <button ref={refComments} type="button" className="btn btn-dark d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content comment-container">
                        <div className="modal-body">
                            
                            <div className='searchbar'>
                                <form className="d-flex my-2" role="search" onSubmit={handleSubmit} style={{ maxWidth: 'content', justifyContent: 'right' }}>
                                    <input className="form-control me-2" type="search" onChange={handleChange} placeholder="Search" id="search" aria-label="Search" />
                                    <div style={{ paddingLeft: '1%' }}><FaSearch /></div>
                                </form>
                            </div>
                            
                           
                                
                            {
                                Object.keys(comments).length !== 0 && comments.map((element) => {
                                    return <tr key={element.id} id={element.id} className="comments"><td className='tdcss'>{element.name}</td><td className='tdcss'>{element.email}</td><td className='tdcss'>{element.body}</td></tr>
                                })}
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='thcss'>Post Title</th><th className='thcss'>Post Body</th><th className='thcss' colSpan='2'>Post Edit</th></tr>
                </thead>
                <tbody>{
                    Object.keys(posts).length !== 0 && posts.map((element) => {
                        return <tr key={element.id} id={element.id}><td className='tdcss'>{element.title}</td><td onClick={() => handlebodyclick(element.id)} className='tdcss'>{element.body}</td><td className='tdcss'><button className="btn btn-dark" onClick={() => handleUpdatePost(element)}>Update</button></td><td className='tdcss'><button className="btn btn-dark" onClick={() => handleDeletePost(element.id, element.title, element.body)}>Delete</button></td></tr>
                    })}
                </tbody>
            </table>




        </div>

    </>
)


}
export default Post;